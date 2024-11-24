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

use Flarum\User\User;
use SychO\ProfileCover\CoverUploader;
use SychO\ProfileCover\CoverValidator;
use SychO\ProfileCover\Event\CoverSaving;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\UserRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Intervention\Image\ImageManager;

class UploadCoverHandler
{
    use DispatchEventsTrait;

    public function __construct(
        protected Dispatcher $events,
        protected UserRepository $users,
        protected CoverUploader $uploader,
        protected CoverValidator $validator,
        protected ImageManager $imageManager
    ) {
    }

    public function handle(UploadCover $command): User
    {
        $actor = $command->actor;

        $user = $this->users->findOrFail($command->userId);

        $actor->assertCan('setProfileCover', $user);

        $this->validator->assertValid(['cover' => $command->file]);

        $image = $this->imageManager->read($command->file->getStream()->getMetadata('uri'));

        $this->events->dispatch(
            new CoverSaving($user, $actor, $image)
        );

        $this->uploader->upload($user, $image);

        $user->save();

        $this->dispatchEventsFor($user, $actor);

        return $user;
    }
}
