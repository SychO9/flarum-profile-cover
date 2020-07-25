import { extend } from 'flarum/extend';
import PermissionGrid from 'flarum/components/PermissionGrid';
import CoverSettingsModal from './components/CoverSettingsModal';

app.initializers.add('sycho-profile-cover', (app) => {
  app.extensionSettings['sycho-profile-cover'] = () => app.modal.show(CoverSettingsModal);

  extend(PermissionGrid.prototype, 'startItems', (items) => {
    items.add('profileCover', {
      icon: 'fas fa-image',
      label: app.translator.trans('sycho-profile-cover.admin.permission.set_cover'),
      permission: 'setProfileCover',
    });

    return items;
  });
});
