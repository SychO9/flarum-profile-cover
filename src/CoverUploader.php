<?php

namespace SychO\ProfileCover;

use Illuminate\Support\Str;
use Intervention\Image\Image;
use League\Flysystem\FilesystemInterface;
use Flarum\User\User;
use Flarum\Settings\SettingsRepositoryInterface;
use SychO\ProfileCover\Helper\Thumbnail;

class CoverUploader
{
    /**
     * @var FilesystemInterface
     */
    protected $uploadDir;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $config;

    /**
     * @param FilesystemInterface $uploadDir
     */
    public function __construct(FilesystemInterface $uploadDir, SettingsRepositoryInterface $config)
    {
        $this->uploadDir = $uploadDir;
        $this->config = $config;
    }

    /**
     * @param User $user
     * @param Image $image
     */
    public function upload(User $user, Image $image)
    {
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

        if ($this->config->get('sycho-profile-cover.thumbnails') == 1) {
            $thumbnail = clone $image;
            $slash = DIRECTORY_SEPARATOR;
            $thumbnailPath = $slash . 'thumbnails' . $slash . $coverPath;

            $thumbnail->resize(500, null, function($constraint) {
                $constraint->aspectRatio();
            });
            $thumbnail->crop(500, 144);
            $encodedThumbnail = $thumbnail->encode('jpg');

            $this->uploadDir->write($thumbnailPath, $encodedThumbnail);
        }

        $this->uploadDir->write($coverPath, $encodedImage);
    }

    /**
     * @param User $user
     */
    public function remove(User $user)
    {
        $coverPath = $user->cover;

        $user->afterSave(function () use ($coverPath) {
            $slash = DIRECTORY_SEPARATOR;
            $thumbnailPath = $slash . 'thumbnails' . $slash . $coverPath;

            if ($this->uploadDir->has($coverPath)) {
                $this->uploadDir->delete($coverPath);
            }

            if ($this->uploadDir->has($thumbnailPath)) {
                $this->uploadDir->delete($thumbnailPath);
            }
        });

        $user->cover = null;
    }
}
