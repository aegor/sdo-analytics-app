import { Template } from 'meteor/templating';

Template.login.onRendered(function () {
  Meteor.startup(function () {
    // console.log('login with SDO');
  });
});

Template.login.events({
  'click #enter': function(){
    console.log("login with click");
    Meteor.loginWithSDO();
    console.log(window.location.href);
    window.location.replace(window.location.href);
  },
  'click #exit': function(){
    console.log("logout with click");
    Meteor.logout();
  }
});


