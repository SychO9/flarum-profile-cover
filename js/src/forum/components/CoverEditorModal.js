import Alert from 'flarum/components/Alert';
import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Switch from 'flarum/components/Switch';
import FieldSet from 'flarum/components/FieldSet';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';

export default class CoverEditorModal extends Modal {
  init() {
    super.init();

    this.loading = false;
  }

  content() {
    return (
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
    );
  }

  className() {
    return 'Cover-modal Modal--small';
  }

  title() {
    return 'Cover Settings';
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

    items.add('settings',
      FieldSet.component({
        label: 'Settings',
        className: 'Cover-settings',
        children: this.settingsItems().toArray()
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
        children: app.translator.trans('core.forum.user.avatar_remove_button')
      })
    );

    return items;
  }

  settingsItems() {
    const items = new ItemList();

    items.add('keepColor',
      Switch.component({
        children: 'Keep color effect',
        state: false,
        onchange: (value, component) => {
          // code..
        }
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

  success(response) {
    app.store.pushPayload(response);

    this.showAlert(true);
    this.loading = false;
    m.redraw();
  }

  failure(response) {
    this.showAlert(false);
    this.loading = false;
    m.redraw();
  }

  showAlert(success) {
    let label = success ? 'Profile cover updated.' : 'Image could not be uploaded.';
    let type = success ? 'success' : 'error';

    this.alert = Alert.component({
      children: label,
      type: type
    });
  }
}
