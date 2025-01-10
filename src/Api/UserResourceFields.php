<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace SychO\ProfileCover\Api;

use Flarum\Api\Context;
use Flarum\Api\Schema;
use Flarum\Foundation\Paths;
use Flarum\User\User;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;

class UserResourceFields
{
    protected Filesystem $coversDir;

    public function __construct(protected Paths $paths, Factory $filesystem)
    {
        $this->coversDir = $filesystem->disk('sycho-profile-cover');
    }

    public function __invoke(): array
    {
        return [
            Schema\Str::make('cover')
                ->get(fn (User $user) => $user->cover ? $this->coversDir->url($user->cover) : $user->cover),
            Schema\Str::make('cover_thumbnail')
                ->get(fn (User $user) => $this->thumbnailUrl($user->cover)),
            Schema\Boolean::make('canSetProfileCover')
                ->get(fn (User $user, Context $context) => $context->getActor()->can('setProfileCover', $user)),
        ];
    }

    public function thumbnailUrl(?string $imageName): ?string
    {
        if (empty($imageName)) {
            return null;
        }

        $thumbnailName = 'thumbnails/' . $imageName;
        return $this->coversDir->url($thumbnailName);
    }
}
