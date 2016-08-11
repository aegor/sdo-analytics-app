Template.configureLoginServiceDialogForDjango.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForDjango.fields = function () {
  return [
    { property: 'clientId', label: '' },
    { property: 'secret', label: '' },
    { property: 'tokenUrl', label: '' },
    { property: 'loginUrl', label: '' },
    { property: 'identityUrl', label: '' },
    { property:  'requestPermissions', label: ''}
  ];
};
