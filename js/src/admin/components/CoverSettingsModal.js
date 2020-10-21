import SettingsModal from 'flarum/components/SettingsModal';
import withAttr from 'flarum/utils/withAttr';
import formatBytes from '../../common/formatBytes';

export default class CoverSettingsModal extends SettingsModal {
  oninit(vnode) {
    super.oninit(vnode);

    this.maxSize = this.setting('sycho-profile-cover.max_size', 2048);
    this.createThumbnails = this.setting('sycho-profile-cover.thumbnails', 0);
  }

  title() {
    return app.translator.trans('sycho-profile-cover.admin.settings');
  }

  className() {
    return 'CoverSettingsModal Modal--small';
  }

  form() {
    return [
      <div className="Form-group">
        <label className="checkbox">
          <input type="checkbox" checked={this.createThumbnails() == 1} oninput={(e) => this.createThumbnails(e.target.checked)} />
          {app.translator.trans('sycho-profile-cover.admin.thumbnails')}
        </label>
      </div>,

      <div className="Form-group">
        <label>{app.translator.trans('sycho-profile-cover.admin.max_size')}</label>
        <div className="ProfileCover-size-input">
          <input type="number" className="FormControl" value={this.maxSize()} oninput={withAttr('value', this.maxSize)} />
          <input className="FormControl" value={formatBytes(this.maxSize() * Math.pow(2, 10))} disabled />
        </div>
      </div>,
    ];
  }
}
