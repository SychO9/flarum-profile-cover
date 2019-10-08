<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasColumn('users', 'cover')) {
            return;
        }

        $schema->table('users', function (Blueprint $table) {
            $table->string('cover', 150)->nullable();
        });
    },

    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->removeColumn('cover');
        });
    },
];
