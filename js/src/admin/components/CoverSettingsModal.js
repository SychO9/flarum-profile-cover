import SettingsModal from 'flarum/components/SettingsModal';

export default class CoverSettingsModal extends SettingsModal {
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
          <input type="checkbox" bidi={this.setting('sycho-profile-cover.thumbnails')}/>
          {app.translator.trans('sycho-profile-cover.admin.thumbnails')}
        </label>
      </div>,

      <div className="Form-group">
        <div><strong>{app.translator.trans('sycho-profile-cover.admin.cover_size')}:</strong> {this.sizeOf('images')}</div>
        <div><strong>{app.translator.trans('sycho-profile-cover.admin.thumb_size')}:</strong> {this.sizeOf('thumbs')}</div>
      </div>
    ];
  }

  sizeOf(type) {
    const stats = JSON.parse(app.data.settings['sycho-profile-cover.stats']);
    const size = parseFloat(stats[type + '_size']);
    const count = parseInt(stats[type + '_count']);

    return app.translator.trans(`sycho-profile-cover.admin.size_of_${type}`, {
      size: this.formatBytes(parseFloat(size)),
      count: count
    });
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
