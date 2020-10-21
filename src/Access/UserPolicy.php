<?php

namespace SychO\ProfileCover\Access;

use Flarum\User\User;
use Flarum\User\AbstractPolicy;

class UserPolicy extends AbstractPolicy
{
    protected $model = User::class;

    public function setProfileCover(User $actor, User $user)
    {
        return $actor->hasPermission('setProfileCover')
            &&
            (
                $actor->id === $user->id
                ||
                (
                    $actor->id !== $user->id && $actor->can('edit', $user)
                )
            );
    }
}
