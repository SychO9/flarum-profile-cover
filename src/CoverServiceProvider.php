<?php

namespace SychO\ProfileCover;

use Flarum\Foundation\AbstractServiceProvider;
use Illuminate\Support\Arr;
use League\Flysystem\FilesystemInterface;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local;
use SychO\ProfileCover\CoverUploader;

class CoverServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $filesystem = function() {
            return new Filesystem(new Local(public_path('assets/covers')));
        };

        $this->app->when(CoverUploader::class)
            ->needs(FilesystemInterface::class)
            ->give($filesystem);
    }
}
