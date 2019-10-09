<?php

namespace SychO\ProfileCover\Listener;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\GetModelRelationship;
use Flarum\User\User;
use SychO\ProfileCover\Helper\Thumbnail;

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
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes['cover'] = $event->model->cover;
            $event->attributes['cover_thumbnail'] = $this->thumbnailName($event->model->cover);
        }
    }

    /**
     * @param string $imageName
     * @return string|null
     */
    public function thumbnailName(?string $imageName)
    {
        $thumbnailName = 'thumbnails/' . $imageName;

        if (file_exists(public_path('assets/covers/' . $thumbnailName)) && !empty($imageName)) {
            return $thumbnailName;
        }

        return null;
    }
}
