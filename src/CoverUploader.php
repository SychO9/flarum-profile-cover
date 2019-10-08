<?php

namespace SychO\ProfileCover;

use Illuminate\Support\Str;
use Intervention\Image\Image;
use League\Flysystem\FilesystemInterface;
use Flarum\User\User;

class CoverUploader
{
    /**
     * @var FilesystemInterface
     */
    protected $uploadDir;

    /**
     * @param FilesystemInterface $uploadDir
     */
    public function __construct(FilesystemInterface $uploadDir)
    {
        $this->uploadDir = $uploadDir;
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

        if ($image->extension !== 'jpg')
            $encodedImage = $image->encode('jpg');

        $coverPath = Str::random().'.jpg';

        $this->remove($user);
        $user->cover = $coverPath;

        $this->uploadDir->write($coverPath, $encodedImage);
    }

    /**
     * @param User $user
     */
    public function remove(User $user)
    {
        $coverPath = $user->cover;

        $user->afterSave(function () use ($coverPath) {
            if ($this->uploadDir->has($coverPath)) {
                $this->uploadDir->delete($coverPath);
            }
        });

        $user->cover = null;
    }
}
