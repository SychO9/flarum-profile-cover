<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum\Extend;
use Flarum\Foundation\Paths;
use Flarum\Http\UrlGenerator;
use Flarum\User\User;
use SychO\ProfileCover\Access\UserPolicy;
use SychO\ProfileCover\Api\UserResourceEndpoints;
use SychO\ProfileCover\Api\UserResourceFields;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Model(User::class))
        ->cast('cover', 'string'),

    (new Extend\Settings())
        ->serializeToForum('sycho-profile-cover.max_size', 'sycho-profile-cover.max_size'),

    (new Extend\ApiResource(Flarum\Api\Resource\UserResource::class))
        ->fields(UserResourceFields::class)
        ->endpoints(UserResourceEndpoints::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class),

    (new Extend\Filesystem())
        ->disk('sycho-profile-cover', function (Paths $paths, UrlGenerator $url) {
            return [
                'root'   => "$paths->public/assets/covers",
                'url'    => $url->to('forum')->path('assets/covers')
            ];
        }),
];
