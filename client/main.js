import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {influxdbCollection, Metrics} from '/imports/collections';
import { AccountsCommon } from 'meteor/accounts-base';

//import './main.html';
/*const series = Meteor.subscribe('influxdbCollection', {
  onReady: function () {
    Tracker.autorun(function() {
      console.log(new Date, " Influx onReady", arguments);
      influx = influxdbCollection.find().fetch();
      //console.log(influxdbCollection.find().fetch());
//      debugger;
    });
  },
  onError: function () { console.log("series Error", arguments); }
});
const metrics = Meteor.subscribe('metrics', {
  onReady: function () {
    Tracker.autorun(function() {
      console.log(new Date, "Meteor onReady", arguments);
      //mongo = Metrics.find().fetch();
      //console.log(Metrics.find().fetch());
    });
  },
  onError: function () { console.log("metrics Error", arguments); }
});*/

var influx = {};
var mongo = {};

/*Tracker.autorun(function() {
  mongo = metrics.find().fetch();
  influx = series.find().fetch();
});*/



/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/

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

Router.route('/login', function () {
  this.render('login');
});
/*
Router.route('/', function () {
  this.redirect('/index.html');
});
*/
Meteor.startup(() => {
  AccountsCommon.onLogin(function () {
    console.log("logged");
    window.location = window.location.href;
  });
});