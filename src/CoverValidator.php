<?php

namespace SychO\ProfileCover;

use Flarum\Foundation\AbstractValidator;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Factory;
use Illuminate\Contracts\Events\Dispatcher;
use Symfony\Component\Translation\TranslatorInterface;

class CoverValidator extends AbstractValidator
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
     * {@inheritdoc}
     */
    public function getRules()
    {
        return [
            'cover' => [
                'required',
                'mimes:jpeg,png,bmp',
                'max:' . $this->getMaxSize()
            ]
        ];
    }

    /**
     * @return string
     */
    public function getMaxSize()
    {
        return $this->config->get('sycho-profile-cover.max_size') ?? '2048';
    }
}
