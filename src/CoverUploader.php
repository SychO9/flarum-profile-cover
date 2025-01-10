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
    protected Filesystem $coversDir;

    public function __construct(Factory $filesystem, protected SettingsRepositoryInterface $config)
    {
        $this->coversDir = $filesystem->disk('sycho-profile-cover');
    }

    public function upload(User $user, Image $image): void
    {
        $makeThumb = $this->config->get('sycho-profile-cover.thumbnails', 0) == 1;

        if ($image->width() > 2500) {
            $image->scale(2500);
        }

        $encodedImage = $image->toJpg();
        $coverPath = Str::random() . '.jpg';

        $this->remove($user);
        $user->cover = $coverPath;

        if ($makeThumb) {
            $thumbnail = clone $image;
            $thumbnailPath = 'thumbnails/' . $coverPath;

            $thumbnail->scale(500)->crop(500, 144);
            $encodedThumbnail = $thumbnail->toJpg();

            $this->coversDir->put($thumbnailPath, $encodedThumbnail);
        }

        $this->coversDir->put($coverPath, $encodedImage);
    }

    public function remove(User $user): void
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
