<?php

namespace SychO\ProfileCover\Listener;

use Flarum\Foundation\Paths;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;

class UserCoverRelationship
{
    /**
     * @var \Flarum\Foundation\Paths
     */
    protected $paths;

    /**
     * @param \Flarum\Foundation\Paths $paths
     */
    public function __construct(Paths $paths)
    {
        $this->paths = $paths;
    }

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
            $event->attributes['canSetProfileCover'] = $event->actor->can('setProfileCover', $event->model);
        }
    }

    /**
     * @param string $imageName
     * @return string|null
     */
    public function thumbnailName(?string $imageName)
    {
        $thumbnailName = 'thumbnails/' . $imageName;

        if (file_exists("{$this->paths->public}/assets/covers/$thumbnailName") && !empty($imageName)) {
            return $thumbnailName;
        }

        return null;
    }
}
