import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { AccountsCommon } from 'meteor/accounts-base';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/login', function () {
  this.render('login');
});
Router.route('/', function () {
  this.redirect('/login');
});

// we want to be sure that the user is logging in
// for all routes but login
/*Router.onBeforeAction(function () {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    this.redirect('/login');
  } else {
    // required by Iron to process the route handler
    this.next();
  }
}, {
  except: ['login']
});*/

/*
Meteor.startup(() => {
  AccountsCommon.onLogin(function () {
    console.log("logged");
    window.location = window.location.href;
  });
});*/

