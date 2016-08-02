var md5 = require('js-md5');

Template.header.helpers({
  avatar: function(){
    var email = md5('egor@akulovs.com'.trim().toLowerCase());
    return 'https://www.gravatar.com/avatar/' + email + '?s=50';
  }
});
