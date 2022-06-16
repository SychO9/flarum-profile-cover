import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import User from 'flarum/models/User';
import UserCard from 'flarum/components/UserCard';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';
import Model from 'flarum/Model';

import CoverEditorModal from './components/CoverEditorModal';

app.initializers.add('sycho-profile-cover', () => {
  User.prototype.cover = Model.attribute('cover');
  User.prototype.cover_thumbnail = Model.attribute('cover_thumbnail');
  User.prototype.canSetProfileCover = Model.attribute('canSetProfileCover');

  extend(UserCard.prototype, 'view', function (view) {
    if (!view.attrs.style || !this.attrs.user.cover()) return;

    let coverUrl = this.attrs.user.cover();
    let thumbnailUrl = this.attrs.user.cover_thumbnail();

    if (!coverUrl) return;

    if (this.attrs.controlsButtonClassName.includes('Button--icon') && thumbnailUrl) {
      coverUrl = thumbnailUrl;
    }

    view.attrs.style = Object.assign(view.attrs.style, {
      '--background-image': `url(${coverUrl})`,
    });
  });

  extend(UserControls, 'moderationControls', function (items, user) {
    if (!user.canSetProfileCover()) return;

    items.add(
      'cover',
      <Button icon="fas fa-image" onclick={() => app.modal.show(CoverEditorModal, { user })}>
        {app.translator.trans('sycho-profile-cover.forum.cover')}
      </Button>
    );

    return items;
  });
});
