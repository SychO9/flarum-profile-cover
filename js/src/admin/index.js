import CoverSettingsModal from './components/CoverSettingsModal';

app.initializers.add('sycho-profile-cover', (app) => {
  /*
  app.routes['covers'] = {
    path: '/covers',
    component: CoverSettings.component()
  };*/

  app.extensionSettings['sycho-profile-cover'] = () => app.modal.show(new CoverSettingsModal());
});
