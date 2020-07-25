<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'setProfileCover' => Group::MEMBER_ID,
]);
