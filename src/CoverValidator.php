<?php

namespace SychO\ProfileCover;

use Flarum\Foundation\AbstractValidator;

class CoverValidator extends AbstractValidator
{
    protected $rules = [
        'cover' => [
            'required',
            'mimes:jpeg,png,bmp,gif',
            'max:2048'
        ]
    ];
}
