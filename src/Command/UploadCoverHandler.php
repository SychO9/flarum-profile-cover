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

use SychO\ProfileCover\CoverUploader;
use SychO\ProfileCover\CoverValidator;
use SychO\ProfileCover\Event\CoverSaving;
use Flarum\Foundation\Application;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\UserRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Intervention\Image\ImageManager;

class UploadCoverHandler
{
    use DispatchEventsTrait;

    /**
     * @var \Flarum\User\UserRepository
     */
    protected $users;

    /**
     * @var CoverUploader
     */
    protected $uploader;

    /**
     * @var CoverValidator
     */
    protected $validator;

    /**
     * @param Dispatcher $events
     * @param UserRepository $users
     * @param Application $app
     * @param CoverUploader $uploader
     * @param CoverValidator $validator
     */
    public function __construct(Dispatcher $events, UserRepository $users, CoverUploader $uploader, CoverValidator $validator)
    {
        $this->events = $events;
        $this->users = $users;
        $this->uploader = $uploader;
        $this->validator = $validator;
    }

    /**
     * @param UploadCover $command
     * @return \Flarum\User\User
     * @throws \Flarum\User\Exception\PermissionDeniedException
     * @throws \Illuminate\Validation\ValidationException
     */
    public function handle(UploadCover $command)
    {
        $actor = $command->actor;

        $user = $this->users->findOrFail($command->userId);

        $actor->assertCan('setProfileCover', $user);

        $this->validator->assertValid(['cover' => $command->file]);

        $image = (new ImageManager)->make($command->file->getStream());

        $this->events->dispatch(
            new CoverSaving($user, $actor, $image)
        );

        $this->uploader->upload($user, $image);

        $user->save();

        $this->dispatchEventsFor($user, $actor);

        return $user;
    }
}
