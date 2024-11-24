<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace SychO\ProfileCover\Event;

use Flarum\User\User;
use Intervention\Image\Image;

class CoverSaving
{
    public function __construct(
        public User $user,
        public User $actor,
        public Image $image
    ) {
    }
}
