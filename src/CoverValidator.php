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
use Flarum\User\AvatarValidator;
use Illuminate\Validation\Factory;
use Illuminate\Contracts\Events\Dispatcher;
use Symfony\Component\Translation\TranslatorInterface;

class CoverValidator extends AvatarValidator
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $config;

    /**
     * {@inheritdoc}
     */
    public function __construct(Factory $validator, Dispatcher $events, TranslatorInterface $translator, SettingsRepositoryInterface $config)
    {
        parent::__construct($validator, $events, $translator);

        $this->config = $config;
    }

    /**
     * {@inheritDoc}
     */
    public function assertValid(array $attributes)
    {
        $this->assertFileRequired($attributes['cover']);
        $this->assertFileMimes($attributes['cover']);
        $this->assertFileSize($attributes['cover']);
    }

    /**
     * @return int
     */
    protected function getMaxSize()
    {
        return (int) ($this->config->get('sycho-profile-cover.max_size') ?? 2048);
    }

    /**
     * @return string[]
     */
    protected function getAllowedTypes()
    {
        return ['jpeg', 'jpg', 'png', 'bmp'];
    }
}
