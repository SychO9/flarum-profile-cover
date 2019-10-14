import SettingsModal from 'flarum/components/SettingsModal';
import formatBytes from '../../common/formatBytes';

export default class CoverSettingsModal extends SettingsModal {
  init() {
    super.init();

    this.maxSize = this.setting('sycho-profile-cover.max_size', 2048);
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
          <input type="checkbox" bidi={this.setting('sycho-profile-cover.thumbnails')}/>
          {app.translator.trans('sycho-profile-cover.admin.thumbnails')}
        </label>
      </div>,

      <div className="Form-group">
        <label>{app.translator.trans('sycho-profile-cover.admin.max_size')}</label>
        <div className="ProfileCover-size-input">
          <input type="number" className="FormControl" value={this.maxSize()} oninput={m.withAttr('value', this.maxSize)}/>
          <input className="FormControl" value={formatBytes(this.maxSize() * Math.pow(2, 10))} disabled/>
        </div>
      </div>,

      <div className="Form-group">
        <div><strong>{app.translator.trans('sycho-profile-cover.admin.cover_size')}:</strong> {this.sizeOf('images')}</div>
        <div><strong>{app.translator.trans('sycho-profile-cover.admin.thumb_size')}:</strong> {this.sizeOf('thumbs')}</div>
      </div>
    ];
  }

  sizeOf(type) {
    let stats;

    try {
      stats = JSON.parse(app.data.settings['sycho-profile-cover.stats']);
    } catch (e) {
      stats = {
        thumbs_size: 0,
        thumbs_count: 0,
        images_size: 0,
        images_count: 0
      };
    }

    const size = parseFloat(stats[type + '_size']);
    const count = parseInt(stats[type + '_count']);

    return app.translator.transChoice(`sycho-profile-cover.admin.size_of_${type}`, count, {
      size: formatBytes(size),
      count: count
    });
  }
}
