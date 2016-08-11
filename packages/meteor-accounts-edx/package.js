Package.describe({
  summary: "Accounts service for SDO Kuban oauth toolkit"
});

Package.on_use(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('meteor-accounts-edx-base', ['client', 'server']);

  // v0.6.5
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.add_files(['django_login_button.css'], 'client');

  api.add_files('django_common.js', ['client', 'server']);
  api.add_files('django_server.js', 'server');
  api.add_files('django_client.js', 'client');
});
