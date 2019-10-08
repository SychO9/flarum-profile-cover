<?php

namespace SychO\ProfileCover\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\GetModelRelationship;
use Flarum\User\User;

class UserCoverRelationship
{
    /**
     * @param Dispatcher $event
     */
    public function subscribe(Dispatcher $event)
    {
        $event->listen(Serializing::class, [$this, 'serializing']);
    }

    /**
     * @param Serializing $event
     */
    public function serializing(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class))
            $event->attributes['cover'] = $event->model->cover;
    }
}
