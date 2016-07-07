import {config} from '../imports/config.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Fiber, Future} from 'fibers'
const influx = require('influx');
const elasticsearch = require('elasticsearch');

export var elastic = null;
export var influxdb = null;

// Stuff to initialialize elastic

if (config.elastic) {
  elastic = new elasticsearch.Client({
    host: config.elasticURL,
    log: config.elasticLoglevel
  });
}

// Stuff to initialize influxdb

if (config.influxdb) {
  influxdb = influx(!!config.influxdbURL ? config.influxdbURL : "http://edx:edx@127.0.0.1:8086/edx");
  influxdb.setRequestTimeout(!!config.influxdbRequestTimeout ? config.influxdbRequestTimeout : 1000);
  var sq = Meteor.wrapAsync(influxdb.query,influxdb);

// https://themeteorchef.com/snippets/synchronous-methods/
  
  Meteor.methods({
    'influxdb.query'({query}) {
      new SimpleSchema({
        query: {type: String}
      }).validate({query});
      var res = {};

      res = sq(query, function (err, result) {
        if (err) {
          return err;
          console.log("11");
          throw new Meteor.Error('influx.query.error', err);
        }
        else {
          console.log("1");
          return result;
        }
      });
      console.log("2");
      return res;
    }
  });
}

/*
Test call from browser:

Meteor.call('influxdb.query', {
query: "select value,writeKey from edx_webpages where writeKey != ''"
}, (err, res) => {
if (err) {
console.log("ERROR-ERROR!");
console.log(err);
} else {
console.log(res)
}
});
*/
