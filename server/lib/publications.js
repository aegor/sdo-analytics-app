import {Meteor} from 'meteor/meteor';
import {influxdbCollection, Metrics} from '/imports/collections';
const uuid = require('uuid');

Meteor.publish('metrics', function() {
  return Metrics.find();
});

// Create influxdb "pseudo-collection",
// Based on https://gist.github.com/makrem025/35543cd60aa88ca49fa0 proposal
Meteor.publish("influxdbCollection", function () {
  var self = this;
  var id = uuid();
  var handle = influxdbCollection.find({})
    .observeChanges({
      added: function (id, fields) {
        console.log("We are adding to influxdbCollection in publish");
        self.added("influxdbCollection"/*, id, fields.username*/);
      },
      changed: function (id, fields) {
        console.log("We are changing to influxdbCollection in publish");
        self.changed("influxdbCollection"/*, id, fields.username*/);
      },
      removed: function (id) {
        console.log("We are removing to influxdbCollection in publish");
        self.removed("influxdbCollection"/*, id, fields.username*/);
      }
    });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });
});
