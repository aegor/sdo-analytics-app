import {config} from '/server/config';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const uuid = require('uuid');
const Future = require( 'fibers/future' );
const influx = require('influx');

export var influxdb = null;

// EGOR need DO full refactoring as in mysql and quasar drivers

// Stuff to initialize influxdb

if (config.influxdb) {
  const Influxdb = new Mongo.Collection(null);
  influxdb = influx(!!config.influxdbURL ? config.influxdbURL : "http://edx:edx@127.0.0.1:8086/edx");
  influxdb.setRequestTimeout(!!config.influxdbRequestTimeout ? config.influxdbRequestTimeout : 1000);
  var sq = Meteor.wrapAsync(influxdb.query,influxdb);

// https://themeteorchef.com/snippets/synchronous-methods/



  Meteor.methods({
    'influxdb.query'({query, doCollection}) {
      new SimpleSchema({
        query: {type: String}
      }).validate({query});
      var future = new Future();
      influxdb.query(query, function (err, result) {
        if (err) {
          console.log("influxdb.query" + err.message);
          future.return(JSON.parse('{"error": "' + err.message + '"}'));
        }
        else {
          future.return(result);
        }
      });
      var data = future.wait();
      if (!data.error && doCollection){
        //console.log("process collection");
        // Strange behavior - if collection unpublished, we need to remove manually. If published - already removed
        Influxdb.remove({});
        for (var i in data[0]) {
          var v = data[0][i];
          var id = v.value;
          delete(v.value);
          delete(v.time);
          Influxdb.upsert(
            {_id: id},
            {
              $push: v
            },
            function (error, id) {
              if (error) {
                console.log(error);
                throw new Meteor.Error(500, "influxdb.query insert to collection failed, please try again", id);
              }
            }
          );
        }
        //console.log(Influxdb.find({}).fetch());
      }
      return data;
    }
  });
}
/*

 Test call from browser:

 Meteor.call('influxdb.query', {
 query: "select value,label from edx_webpages where label != ''",
 doCollection: 1
 }, (err, res) => {
 if (err) {
 console.log("ERROR-ERROR!");
 console.log(err);
 } else {
 console.log(res)
 }
 });

 */

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
  });});



