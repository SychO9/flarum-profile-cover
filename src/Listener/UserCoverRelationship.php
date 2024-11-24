<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace SychO\ProfileCover\Listener;

use Flarum\Foundation\Paths;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;
use Illuminate\Contracts\Filesystem\Factory;
use Illuminate\Contracts\Filesystem\Filesystem;

class UserCoverRelationship
{
    /**
     * @var Filesystem
     */
    protected $coversDir;

    public function __construct(protected Paths $paths, Factory $filesystem)
    {
        $this->coversDir = $filesystem->disk('sycho-profile-cover');
    }

    /**
     * @param UserSerializer $serializer
     * @param User $user
     * @return array
     */
    public function __invoke(UserSerializer $serializer, User $user): array
    {
        return [
            'cover' => $user->cover ? $this->coversDir->url($user->cover) : $user->cover,
            'cover_thumbnail' => $this->thumbnailUrl($user->cover),
            'canSetProfileCover' => $serializer->getActor()->can('setProfileCover', $user),
        ];
    }

    /**
     * @param string|null $imageName
     * @return string|null
     */
    public function thumbnailUrl(?string $imageName)
    {
        if (empty($imageName)) {
            return null;
        }

        $thumbnailName = 'thumbnails/' . $imageName;
        return $this->coversDir->url($thumbnailName);
    }
}
