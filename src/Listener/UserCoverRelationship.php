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
     * @param UserSerializer $serializer
     * @param User $user
     * @return array
     */
    public function __invoke(UserSerializer $serializer, User $user): array
    {
        return [
            'cover' => $user->cover,
            'cover_thumbnail' => $this->thumbnailName($user->cover),
            'canSetProfileCover' => $serializer->getActor()->can('setProfileCover', $user),
        ];
    }

    /**
     * @param string|null $imageName
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
