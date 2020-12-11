<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace SychO\ProfileCover\Access;

use Flarum\User\User;
use Flarum\User\Access\AbstractPolicy;

class UserPolicy extends AbstractPolicy
{
    public function setProfileCover(User $actor, User $user)
    {
        if ($actor->hasPermission('setProfileCover')
            &&
            (
                $actor->id === $user->id
                ||
                (
                    $actor->id !== $user->id && $actor->can('edit', $user)
                )
            )
        )
            return $this->allow();
    }
}
