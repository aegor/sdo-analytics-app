Meteor.loginWithDjango = function (options, callback) {
  var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
  Django.requestCredential(options, credentialRequestCompleteCallback);
};
