import {Meteor} from 'meteor/meteor';
import {influxdbCollection, Metrics} from '/imports/collections';
const uuid = require('uuid');

Meteor.publish('metrics', function () {
  return Metrics.find();
});

Meteor.publish('objects', function (obj) {
  const self = this;
  var req =     [
    {"$project": eval('( {' + obj + ': true} )')},
    {"$sort": eval('( {' + obj + ': 1} )')},
    {"$group": {"_id": {"0": "$" + obj}}}
  ];
  var stuff = Metrics.aggregate(req, {"allowDiskUse": true});
  _(stuff).each(function (s) {
        const res = s._id["0"]
        console.log(typeof res, res);
        self.added('objects', Random.id(), {value: res});
  });
  self.ready();
});

// Create influxdb "pseudo-collection",
// Based on proposal from https://gist.github.com/makrem025/35543cd60aa88ca49fa0
Meteor.publish("influxdbCollection", function () {
  var self = this;
  //var id = uuid();
  var handle = influxdbCollection.find().observeChanges({
    added: function (id, fields) {
      console.log("addind: ", id, fields);
      self.added("influxdbCollection", id, fields);
    },
    changed: function (id, fields) {
      console.log("change: ", id, fields);
      self.changed("influxdbCollection", id, fields);
    },
    removed: function (id, fields) {
      console.log("We are removing to influxdbCollection in publish:");
      console.log("remove: ", id, fields);
      self.removed("influxdbCollection", id);
    }
  });

  self.ready();

  self.onStop(function () {
    handle.stop();
  });
});


