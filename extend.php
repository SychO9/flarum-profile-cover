<?php

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\View\Factory;
use SychO\ProfileCover\Controller;
use SychO\ProfileCover\Listener\UserCoverRelationship;
use SychO\ProfileCover\Provider\CoverServiceProvider;

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

    (new FoF\Extend\Extend\ExtensionSettings())
        ->setPrefix('sycho-profile-cover.')
        ->addKeys(['max_size']),

    function (Factory $view) {
        $view->addNamespace('profile-cover', __DIR__.'/views');
    },

    function(Dispatcher $event) {
        $event->subscribe(UserCoverRelationship::class);
    },

    function (Application $app) {
        $app->register(CoverServiceProvider::class);
    }
];
