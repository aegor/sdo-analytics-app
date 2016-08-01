import {config} from '/server/imports/config';
import {validateReq} from '/server/lib/utils';
const Future = require( 'fibers/future' );
const m = require('mysql');

// Example method call from client:
/*
Meteor.call('mysql.query', {
  query: "1 + 1",
  limit: 20,
  offset: 0
}, (err, res) => {
  if (err) {
    console.log("ERROR-ERROR!");
    console.log(err.message);
  } else {
    console.log(res)
  }
});
*/
// Example subscription from client:
/*
 var handle = Meteor.subscribe('mysql_query', {
 query: '1 + 1 AS test',
 limit: 20,
 offset: 0
 });
 var objects = new Mongo.Collection('mysql_query');
 objects.find().fetch()
 */

if (config.mysql) {

  export const my = function({query, limit, offset}){
    const self = this;

    const req =validateReq({query, limit, offset});
    const q = 'SELECT ' + req.query + ' LIMIT ' + req.offset + ',' + req.limit;

    const c = m.createConnection(config.mysqlConnection);
    Meteor.wrapAsync(c.query);
    var future = new Future();
    c.connect();
    c.query(q, function (err, rows, fields) {
      if (err) {
        console.log("mysql.query" + err.message);
        future.return(JSON.parse('{"error": "' + err.message + '"}'));
      }
      else {
        future.return(rows);
      }
    });
    var data = future.wait();
    c.end();
    return data;
  };

  Meteor.methods({
    'mysql.query'({query,limit,offset}) {
      return my({query, limit, offset});
    }
  });

  Meteor.publish('mysql_query', function ({query, limit, offset}) {
    const self = this;
    const stuff = my({query, limit, offset});
    _(stuff).each(function (s) {
      self.added('mysql_query', Random.id(), s);
    });
    self.ready();
  });

}
