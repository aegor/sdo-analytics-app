import {config} from '/imports/config';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {influxdbCollection} from '/imports/collections';
const Future = require( 'fibers/future' );
const influx = require('influx');

export var influxdb = null;

// Stuff to initialize influxdb

if (config.influxdb) {
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
        console.log("process collection");
        influxdbCollection.remove({});
        for (var i in data[0]) {
          var v = data[0][i];
          //v._id = v.value.toString();
          influxdbCollection.upsert(
            {_id: v._id},
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
        //console.log(influxdbCollection.find({}).fetch());
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
