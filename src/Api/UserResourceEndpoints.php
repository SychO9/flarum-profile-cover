<?php

namespace SychO\ProfileCover\Api;

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Bus\Dispatcher;
use Illuminate\Support\Arr;
use SychO\ProfileCover\Command\DeleteCover;
use SychO\ProfileCover\Command\UploadCover;

class UserResourceEndpoints
{
    public function __construct(
        protected Dispatcher $bus
    ) {
    }

    public function __invoke(): array
    {
        return [
            Endpoint\Endpoint::make('cover.upload')
                ->route('POST', '/{id}/cover')
                ->action(function (Context $context) {
                    $file = Arr::get($context->request->getUploadedFiles(), 'cover');

                    return $this->bus->dispatch(
                        new UploadCover($context->modelId, $file, $context->getActor())
                    );
                }),
            Endpoint\Endpoint::make('cover.delete')
                ->route('DELETE', '/{id}/avatar')
                ->action(function (Context $context) {
                    return $this->bus->dispatch(
                        new DeleteCover(Arr::get($context->request->getQueryParams(), 'id'), $context->getActor())
                    );
                }),
        ];
    }
}
