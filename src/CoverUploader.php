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
    protected $coversDir;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $config;

    /**
     * @var string
     */
    protected $statsKey = 'sycho-profile-cover.stats';

    /**
     * @var array
     */
    protected $cachedStats = [];

    /**
     * @var array
     */
    protected $defaultStats = [
        'thumbs_size', 'thumbs_count', 'images_size', 'images_count'
    ];

    /**
     * @param FilesystemInterface $coversDir
     */
    public function __construct(FilesystemInterface $coversDir, SettingsRepositoryInterface $config)
    {
        $this->coversDir = $coversDir;
        $this->config = $config;
    }

    /**
     * @param User $user
     * @param Image $image
     */
    public function upload(User $user, Image $image)
    {
        $makeThumb = $this->config->get('sycho-profile-cover.thumbnails') == 1;
        $incrementBy = [];

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

            $this->coversDir->write($thumbnailPath, $encodedThumbnail);

            $incrementBy += [
                'thumbs_count' => 1,
                'thumbs_size' => $this->coversDir->getSize($thumbnailPath)
            ];
        }

        $this->coversDir->write($coverPath, $encodedImage);

        // Log the size of the images and count
        $incrementBy += [
            'images_count' => 1,
            'images_size' => $this->coversDir->getSize($coverPath)
        ];

        $this->setStats('inc', $incrementBy);
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
            $decrementBy = [];
            $thumbnailPath = 'thumbnails/' . $coverPath;

            if ($this->coversDir->has($coverPath)) {
                $decrementBy += [
                    'images_size' => $this->coversDir->getSize($coverPath),
                    'images_count' => 1
                ];

                $this->coversDir->delete($coverPath);
            }

            if ($this->coversDir->has($thumbnailPath)) {
                $decrementBy += [
                    'thumbs_size' => $this->coversDir->getSize($thumbnailPath),
                    'thumbs_count' => 1
                ];

                $this->coversDir->delete($thumbnailPath);
            }

            $this->setStats('dec', $decrementBy);
        });

        $user->cover = null;
    }

    /**
     * @return array
     */
    public function getStats(): array
    {
        $stats = $this->cachedStats;

        if (empty($stats)) {
            $stats = $this->config->get($this->statsKey);

            $stats = json_decode($stats, true);
        }

        if (empty($stats)) {
            $stats = [];

            foreach ($this->defaultStats as $key)
                $stats[$key] = 0;
        }

        return $stats;
    }

    public function getSingleStat(string $key)
    {
        return $this->getStats()[$key] ?? null;
    }

    /**
     * @param
     */
    public function setStats(string $context, array $values)
    {
        $settings = [];
        $this->reloadStats();

        foreach ($this->defaultStats as $key) {
            if ($context == 'inc')
                $newValue = $this->getSingleStat($key) + ((int) ($values[$key] ?? 0));
            else
                $newValue = $this->getSingleStat($key) - ((int) ($values[$key] ?? 0));

            $settings[$key] = $newValue < 0 ? 0 : $newValue;
        }

        $this->config->set($this->statsKey, json_encode($settings));
    }

    /**
     * @return void
     */
    public function reloadStats()
    {
        $this->cachedStats = [];
    }
}
