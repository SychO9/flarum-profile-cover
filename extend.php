<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\User;
use SychO\ProfileCover\Controller;
use SychO\ProfileCover\Listener\UserCoverRelationship;
use SychO\ProfileCover\Provider\CoverServiceProvider;
use SychO\ProfileCover\Access\UserPolicy;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    (new Extend\Routes('api'))
        ->post('/users/{id}/cover', 'users.cover.upload', Controller\UploadCoverController::class)
        ->delete('/users/{id}/cover', 'users.cover.delete', Controller\DeleteCoverController::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\Settings())
        ->serializeToForum('sycho-profile-cover.max_size', 'sycho-profile-cover.max_size'),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->mutate(UserCoverRelationship::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, UserPolicy::class),

    (new Extend\ServiceProvider())
        ->register(CoverServiceProvider::class),
];
