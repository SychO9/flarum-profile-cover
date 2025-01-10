import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UserCard from 'flarum/forum/components/UserCard';
import UserControls from 'flarum/forum/utils/UserControls';
import Button from 'flarum/common/components/Button';
import type Mithril from 'mithril';
import CoverEditorModal from './components/CoverEditorModal';

export { default as extend } from './extend';

app.initializers.add('sycho-profile-cover', () => {
  extend(UserCard.prototype, 'view', function (view: Mithril.Vnode) {
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
