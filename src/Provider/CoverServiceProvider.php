<?php

namespace SychO\ProfileCover\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Foundation\Paths;
use League\Flysystem\FilesystemInterface;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local;
use SychO\ProfileCover\CoverUploader;

class CoverServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $coversFileSystem = function() {
            return new Filesystem(new Local(($this->app->make(Paths::class))->public.'/assets/covers'));
        };

        $this->app->when(CoverUploader::class)
            ->needs(FilesystemInterface::class)
            ->give($coversFileSystem);
    }
}
