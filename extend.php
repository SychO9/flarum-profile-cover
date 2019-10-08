<?php

use Flarum\Extend;
use Flarum\Foundation\Application;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Contracts\View\Factory;
use SychO\ProfileCover\Controller;
use SychO\ProfileCover\Listener\UserCoverRelationship;
use SychO\ProfileCover\CoverServiceProvider;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Routes('api'))
        ->post('/users/{id}/cover', 'users.cover.upload', Controller\UploadCoverController::class)
        ->delete('/users/{id}/cover', 'users.cover.delete', Controller\DeleteCoverController::class),

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
