import Alert from 'flarum/components/Alert';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import FieldSet from 'flarum/components/FieldSet';
import ItemList from 'flarum/utils/ItemList';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import listItems from 'flarum/helpers/listItems';
import formatBytes from '../../common/formatBytes';

export default class CoverEditorModal extends Modal {
  init() {
    super.init();

    this.maxSize = parseFloat(app.data['sycho-profile-cover.max_size'] || 2048);

    this.alert = Alert.component({
      children: app.translator.trans('sycho-profile-cover.forum.notice', {size: formatBytes(this.maxSize * Math.pow(2, 10))})
    });

    this.loading = false;
    this.cover = this.props.user.cover_thumbnail() || this.props.user.cover();
    this.context = '';
  }

  content() {
    let attrs = {};
    let className = 'Modal-image CoverEditor-cover';

    if (this.cover) {
      attrs.style = {backgroundImage: `url(${app.forum.attribute('baseUrl') + '/assets/covers/' + this.cover})`};
      className += ' CoverEditor-active';
    }

    return [
      <div className={className} {...attrs}>
        {this.loading ? LoadingIndicator.component() : ''}
      </div>,

      <div className="Modal-body">
        <div className="Form">
          {this.fieldsItems().toArray().map(field => (
            <div class="Form-group">
              <label>{field.props.label}</label>
              {field.props.children}
            </div>
          ))}
        </div>
      </div>
    ];
  }

  className() {
    return 'Cover-modal Modal--small';
  }

  title() {
    return app.translator.trans('sycho-profile-cover.forum.edit_cover');
  }

  fieldsItems() {
    const items = new ItemList();

    items.add('actions',
      FieldSet.component({
        label: '',
        className: 'Cover-actions',
        children: this.controlItems().toArray()
      })
    );

    return items;
  }

  controlItems() {
    const items = new ItemList();

    items.add('upload',
      Button.component({
        icon: 'fas fa-upload',
        className: 'Button',
        children: app.translator.trans('core.forum.user.avatar_upload_button'),
        onclick: this.openPicker.bind(this)
      })
    );

    items.add('remove',
      Button.component({
        icon: 'fas fa-times',
        className: 'Button',
        children: app.translator.trans('core.forum.user.avatar_remove_button'),
        onclick: this.remove.bind(this)
      })
    );

    return items;
  }

  openPicker() {
    const input = $('<input type="file">');

    input.appendTo('body').hide().click().on('change', e => {
      this.upload($(e.target)[0].files[0]);
    });
  }

  upload(file) {
    if (this.loading) return;

    const data = new FormData();
    data.append('cover', file);

    this.loading = true;
    this.context = 'added';
    m.redraw();

    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/users/' + this.props.user.id() + '/cover',
      serialize: raw => raw,
      data
    }).then(
      this.success.bind(this),
      this.failure.bind(this)
    );
  }

  remove() {
    this.loading = true;
    this.context = 'removed';
    m.redraw();

    app.request({
      method: 'DELETE',
      url: app.forum.attribute('apiUrl') + '/users/' + this.props.user.id() + '/cover'
    }).then(
      this.success.bind(this),
      this.failure.bind(this)
    );
  }

  success(response) {
    app.store.pushPayload(response);

    this.showAlert('success');
    this.loading = false;
    m.redraw();
    this.hide();
  }

  failure(response) {
    this.showAlert('error');
    this.loading = false;
    m.redraw();
  }

  showAlert(type) {
    this.alert.props.children = app.translator.trans(`sycho-profile-cover.forum.${this.context}.${type}`);
    this.alert.props.type = type;
  }
}
