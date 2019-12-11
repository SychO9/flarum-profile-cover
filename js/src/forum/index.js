import { extend } from 'flarum/extend';
import User from 'flarum/models/User';
import UserPage from 'flarum/components/UserPage';
import UserCard from 'flarum/components/UserCard';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';
import Model from 'flarum/Model';
import CoverEditorModal from './components/CoverEditorModal';

app.initializers.add('sycho-profile-cover', (app) => {
  User.prototype.cover = Model.attribute('cover');
  User.prototype.cover_thumbnail = Model.attribute('cover_thumbnail');

  extend(UserCard.prototype, 'view', function(view) {
    if (!view.attrs.style) return;

    let cover = this.props.user.cover();
    let thumbnail = this.props.user.cover_thumbnail();

    if (!cover) return;

    if (this.props.controlsButtonClassName.includes('Button--icon') && thumbnail) {
      cover = thumbnail;
    }

    let coverUrl = app.forum.attribute('baseUrl') + '/assets/covers/' + cover;

    view.attrs.style = Object.assign(view.attrs.style, {
      backgroundImage: `url(${coverUrl})`
    });
  });

  extend(UserControls, 'moderationControls', function(items, user) {
    if (!user.canEdit() && app.session.user !== user) return;

    items.add('cover',
      Button.component({
        icon: 'fas fa-image',
        children: app.translator.trans('sycho-profile-cover.forum.cover'),
        onclick: () => app.modal.show(new CoverEditorModal({user}))
      })
    );
  });
});
