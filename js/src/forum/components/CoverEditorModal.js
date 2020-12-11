import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import ItemList from 'flarum/utils/ItemList';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import formatBytes from '../../common/formatBytes';

export default class CoverEditorModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);

    this.maxSize = parseFloat(app.forum.attribute('sycho-profile-cover.max_size') || 2048);

    this.alertAttrs = {
      content: app.translator.trans('sycho-profile-cover.forum.notice', { size: formatBytes(this.maxSize * Math.pow(2, 10)) }),
    };

    this.loading = false;
    this.cover = this.attrs.user.cover_thumbnail() || this.attrs.user.cover();
    this.context = '';
  }

  content() {
    let attrs = {};
    let className = 'Modal-image CoverEditor-cover';

    if (this.cover) {
      attrs.style = { backgroundImage: `url(${app.forum.attribute('baseUrl') + '/assets/covers/' + this.cover})` };
      className += ' CoverEditor-active';
    }

    return [
      <div className={className} {...attrs}>
        {this.loading ? <LoadingIndicator /> : ''}
      </div>,

      <div className="Modal-body">
        <div className="Form">{this.fieldsItems().toArray()}</div>
      </div>,
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

    items.add('actions', this.controlItems().toArray());

    return items;
  }

  controlItems() {
    const items = new ItemList();

    items.add(
      'upload',
      <Button icon="fas fa-upload" className="Button" onclick={this.openPicker.bind(this)}>
        {app.translator.trans('core.forum.user.avatar_upload_button')}
      </Button>
    );

    items.add(
      'remove',
      <Button icon="fas fa-times" className="Button" onclick={this.remove.bind(this)}>
        {app.translator.trans('core.forum.user.avatar_remove_button')}
      </Button>
    );

    return items;
  }

  openPicker() {
    const input = $('<input type="file">');

    input
      .appendTo('body')
      .hide()
      .click()
      .on('change', (e) => {
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

    app
      .request({
        method: 'POST',
        url: `${app.forum.attribute('apiUrl')}/users/${this.attrs.user.id()}/cover`,
        serialize: (raw) => raw,
        body: data,
      })
      .then(this.success.bind(this), this.failure.bind(this));
  }

  remove() {
    this.loading = true;
    this.context = 'removed';
    m.redraw();

    app
      .request({
        method: 'DELETE',
        url: `${app.forum.attribute('apiUrl')}/users/${this.attrs.user.id()}/cover`,
      })
      .then(this.success.bind(this), this.failure.bind(this));
  }

  success(response) {
    app.store.pushPayload(response);

    this.showAlert('success');
    this.loading = false;
    m.redraw();
    this.hide();
  }

  failure() {
    this.showAlert('error');
    this.loading = false;
    m.redraw();
  }

  showAlert(type) {
    this.alertAttrs.content = app.translator.trans(`sycho-profile-cover.forum.${this.context}.${type}`);
    this.alertAttrs.type = type;
  }
}
