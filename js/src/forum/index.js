import { extend } from 'flarum/extend';
import User from 'flarum/models/User';
import UserPage from 'flarum/components/UserPage';
import UserCard from 'flarum/components/UserCard';
import UserControls from 'flarum/utils/UserControls';
import Button from 'flarum/components/Button';
import Model from 'flarum/Model';
import CoverEditorModal from './components/CoverEditorModal';

app.initializers.add('sycho-flarum-profile-cover', (app) => {
  User.prototype.cover = Model.attribute('cover');

  extend(UserCard.prototype, 'view', function(view) {
    if (!view.attrs.style) return;

    let cover = this.props.user.cover();

    if (!cover) return;

    let coverUrl = app.forum.attribute('baseUrl') + '/assets/covers/' + cover;

    view.attrs.style = Object.assign(view.attrs.style, {
      backgroundImage: `url(${coverUrl})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100%'
    });
  });

  extend(UserControls, 'moderationControls', function(items, user) {
    items.add('cover',
      Button.component({
        icon: 'fas fa-image',
        children: 'Cover', // app.translator.trans('sycho-flarum-profile-cover.forum.user.edit_cover'),
        onclick: () => app.modal.show(new CoverEditorModal({user}))
      })
    );
  });
});
