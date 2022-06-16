<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace SychO\ProfileCover;

use Illuminate\Support\Str;
use Intervention\Image\Image;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;
use Flarum\User\User;
use Flarum\Settings\SettingsRepositoryInterface;

class CoverUploader
{
    /**
     * @var Filesystem
     */
    protected $coversDir;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $config;

    /**
     * @param FilesystemInterface $coversDir
     */
    public function __construct(Factory $filesystem, SettingsRepositoryInterface $config)
    {
        $this->coversDir = $filesystem->disk('sycho-profile-cover');
        $this->config = $config;
    }

    /**
     * @param User $user
     * @param Image $image
     */
    public function upload(User $user, Image $image)
    {
        $makeThumb = $this->config->get('sycho-profile-cover.thumbnails', 0) == 1;

        if (extension_loaded('exif')) {
            $image->orientate();
        }

        if ($image->width() > 2500) {
            $image->resize(2500, null, function($constraint) {
                $constraint->aspectRatio();
            });
        }

        $encodedImage = $image->encode('jpg');
        $coverPath = Str::random() . '.jpg';

        $this->remove($user);
        $user->cover = $coverPath;

        if ($makeThumb) {
            $thumbnail = clone $image;
            $thumbnailPath = 'thumbnails/' . $coverPath;

            $thumbnail->resize(500, null, function($constraint) {
                $constraint->aspectRatio();
            });
            $thumbnail->crop(500, 144);
            $encodedThumbnail = $thumbnail->encode('jpg');

            $this->coversDir->put($thumbnailPath, $encodedThumbnail);
        }

        $this->coversDir->put($coverPath, $encodedImage);
    }

    /**
     * @param User $user
     */
    public function remove(User $user)
    {
        $coverPath = $user->cover;

        if (empty($coverPath))
            return;

        $user->afterSave(function () use ($coverPath) {
            $thumbnailPath = 'thumbnails/' . $coverPath;

            if ($this->coversDir->exists($coverPath)) {
                $this->coversDir->delete($coverPath);
            }

            if ($this->coversDir->exists($thumbnailPath)) {
                $this->coversDir->delete($thumbnailPath);
            }
        });

        $user->cover = null;
    }
}
