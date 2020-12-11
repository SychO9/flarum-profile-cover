<?php

/*
 * This file is part of Flarum Profile Cover.
 *
 * (c) Sami "SychO" Mazouz <sychocouldy@gmail.com>
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace SychO\ProfileCover\Command;

use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\UserRepository;
use Illuminate\Contracts\Events\Dispatcher;
use SychO\ProfileCover\CoverUploader;

class DeleteCoverHandler
{
    use DispatchEventsTrait;

    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var CoverUploader
     */
    protected $uploader;

    /**
     * @param Dispatcher $events
     * @param UserRepository $users
     * @param CoverUploader $uploader
     */
    public function __construct(Dispatcher $events, UserRepository $users, CoverUploader $uploader)
    {
        $this->events = $events;
        $this->users = $users;
        $this->uploader = $uploader;
    }

    /**
     * @param DeleteCover $command
     * @return \Flarum\User\User
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    public function handle(DeleteCover $command)
    {
        $actor = $command->actor;

        $user = $this->users->findOrFail($command->userId);

        $actor->assertCan('setProfileCover', $user);

        $this->uploader->remove($user);

        $user->save();

        $this->dispatchEventsFor($user, $actor);

        return $user;
    }
}
