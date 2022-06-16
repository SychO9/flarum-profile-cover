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
     * @var \Flarum\Foundation\Paths
     */
    protected $paths;

    /**
     * @var Filesystem
     */
    protected $coversDir;

    /**
     * @param \Flarum\Foundation\Paths $paths
     */
    public function __construct(Paths $paths, Factory $filesystem)
    {
        $this->paths = $paths;
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
        $thumbnailName = 'thumbnails/' . $imageName;

        if ($this->coversDir->exists($thumbnailName) && !empty($imageName)) {
            return $this->coversDir->url($thumbnailName);
        }

        return null;
    }
}
