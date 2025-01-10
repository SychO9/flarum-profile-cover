import Extend from 'flarum/common/extenders';
import User from "flarum/common/models/User";

export default [

  new Extend.Model(User)
    .attribute<string|null>('cover')
    .attribute<string|null>('cover_thumbnail')
    .attribute<boolean>('canSetProfileCover'),

];
