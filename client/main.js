import {Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {influxdbCollection, Metrics} from '/imports/collections';

import './main.html';
const series = Meteor.subscribe('influxdbCollection', {
  onReady: function () {
    console.log("onReady And the Items actually Arrive", arguments);
    influx = influxdbCollection.find().fetch();
  },
  onError: function () { console.log("series Error", arguments); }
});
const metrics = Meteor.subscribe('metrics', {
  onReady: function () {
    console.log("onReady And the Items actually Arrive", arguments);
    mongo = Metrics.find().fetch();
  },
  onError: function () { console.log("metrics Error", arguments); }
});

var influx = {};
var mongo = {};

/*Tracker.autorun(function() {
  mongo = metrics.find().fetch();
  influx = series.find().fetch();
});*/












/*

Template.hello.onCreated(function helloOnCreated() {
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
});
*/
