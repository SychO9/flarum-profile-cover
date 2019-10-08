import SettingsModal from 'flarum/components/SettingsModal';

export default class CoverSettingsModal extends SettingsModal {
  title() {
    return app.translator.trans('sycho-profile-cover.admin.settings');
  }

  className() {
    return 'CoverSettingsModal Modal--small';
  }

  form() {
    return (
      <div class="Form-group">
        <label className="checkbox">
          <input type="checkbox" bidi={this.setting('sycho-profile-cover.thumbnails')}/>
          {app.translator.trans('sycho-profile-cover.admin.thumbnails')}
        </label>
      </div>
    );
  }
}
