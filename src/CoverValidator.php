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

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Locale\TranslatorInterface;
use Flarum\User\AvatarValidator;
use Illuminate\Validation\Factory;
use Intervention\Image\ImageManager;

class CoverValidator extends AvatarValidator
{
    public function __construct(
        Factory $validator,
        TranslatorInterface $translator,
        ImageManager $imageManager,
        protected SettingsRepositoryInterface $config
    ) {
        parent::__construct($validator, $translator, $imageManager);
    }

    public function assertValid(array $attributes): void
    {
        $this->laravelValidator = $this->makeValidator($attributes);

        $this->assertFileRequired($attributes['cover']);
        $this->assertFileMimes($attributes['cover']);
        $this->assertFileSize($attributes['cover']);
    }

    protected function getMaxSize(): int
    {
        return (int) ($this->config->get('sycho-profile-cover.max_size') ?? 2048);
    }

    protected function getAllowedTypes(): array
    {
        return ['jpeg', 'jpg', 'png', 'bmp'];
    }
}
