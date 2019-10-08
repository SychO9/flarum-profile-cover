<?php

namespace SychO\ProfileCover\Command;

use Flarum\Foundation\Application;
use Flarum\Foundation\DispatchEventsTrait;
use Flarum\User\AssertPermissionTrait;
use SychO\ProfileCover\CoverUploader;
use SychO\ProfileCover\CoverValidator;
use Flarum\User\UserRepository;
use Illuminate\Contracts\Events\Dispatcher;
use Intervention\Image\ImageManager;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadCoverHandler
{
    use DispatchEventsTrait;
    use AssertPermissionTrait;

    /**
     * @var \Flarum\User\UserRepository
     */
    protected $users;

    /**
     * @var Application
     */
    protected $app;

    /**
     * @var CoverUploader
     */
    protected $uploader;

    /**
     * @var \Flarum\User\CoverValidator
     */
    protected $validator;

    /**
     * @param Dispatcher $events
     * @param UserRepository $users
     * @param Application $app
     * @param CoverUploader $uploader
     * @param CoverValidator $validator
     */
    public function __construct(Dispatcher $events, UserRepository $users, Application $app, CoverUploader $uploader, CoverValidator $validator)
    {
        $this->events = $events;
        $this->users = $users;
        $this->app = $app;
        $this->uploader = $uploader;
        $this->validator = $validator;
    }

    /**
     * @param UploadCover $command
     * @return \Flarum\User\User
     * @throws \Flarum\User\Exception\PermissionDeniedException
     */
    public function handle(UploadCover $command)
    {
        $actor = $command->actor;

        $user = $this->users->findOrFail($command->userId);

        if ($actor->id !== $user->id) {
            $this->assertCan($actor, 'edit', $user);
        }

        $file = $command->file;

        $tmpFile = tempnam($this->app->storagePath().'/tmp', 'cover');
        $file->moveTo($tmpFile);

        try {
            $file = new UploadedFile(
                $tmpFile,
                $file->getClientFilename(),
                $file->getClientMediaType(),
                $file->getSize(),
                $file->getError(),
                true
            );

            $this->validator->assertValid(['cover' => $file]);

            $image = (new ImageManager)->make($tmpFile);

            $this->uploader->upload($user, $image);

            $user->save();
        } finally {
            @unlink($tmpFile);
        }

        return $user;
    }
}
