import withAttr from 'flarum/common/utils/withAttr';
import formatBytes from '../common/formatBytes';

app.initializers.add('sycho-profile-cover', (app) => {
  app.extensionData
    .for('sycho-profile-cover')
    .registerSetting({
      setting: 'sycho-profile-cover.thumbnails',
      type: 'boolean',
      label: app.translator.trans('sycho-profile-cover.admin.thumbnails'),
    })
    .registerSetting(function () {
      const maxSize = this.setting('sycho-profile-cover.max_size', 2048);

      return (
        <div className="Form-group">
          <label>{app.translator.trans('sycho-profile-cover.admin.max_size')}</label>
          <div className="ProfileCover-size-input">
            <input type="number" className="FormControl" value={maxSize()} oninput={withAttr('value', maxSize)} />
            <input className="FormControl" value={formatBytes(maxSize() * Math.pow(2, 10))} disabled />
          </div>
        </div>
      );
    })
    .registerPermission(
      {
        icon: 'fas fa-image',
        label: app.translator.trans('sycho-profile-cover.admin.permission.set_cover'),
        permission: 'setProfileCover',
      },
      'start'
    );
});
