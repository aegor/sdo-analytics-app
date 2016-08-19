import {Meteor} from 'meteor/meteor';
/*
 import { Template } from 'meteor/templating';
 import { ReactiveVar } from 'meteor/reactive-var';
 import { AccountsCommon } from 'meteor/accounts-base';
 import { dashboards } from '/imports/dashboards'
 */
Router.configure({
  layoutTemplate: 'layout'
});

if (Meteor.isClient) {
  Router.onBeforeAction(function () {
    $('body').addClass('nav-md');
    $('html').attr("lang", "ru");
    this.next();
  });
}


Router.route('/', function () {
  this.render('dashboardEmptyStat');
});

Router.route('/Common', function () {
  this.render('dashboardCommonStat');
});

Router.route('/Noact', function () {
  this.render('dashboardNoactStat');
});


Router.route('/Courses', function () {
  this.render('dashboardCoursesStat');
});

Router.route('/Teachers', function () {
  this.render('dashboardTeachersStat');
});

/*
 for (var d in dashboards){
 Router.route(dashboards[d].url, function () {
 this.render(dashboards[d].name);
 });
 }
 */
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
