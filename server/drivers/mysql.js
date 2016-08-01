import {config} from '/server/config';
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
 query: 'S.id,S.name as school,M.name as municipality from student_school S INNER JOIN student_municipality M ON M.id = S.municipality_id',
 limit: 20,
 offset: 0
 });
 var objects = new Mongo.Collection('mysql_query');
 var count = objects.findOne({_count: { $exists: true}})._count
 objects.find({municipality: { $exists: true}}).fetch()
 */

if (config.mysql) {

  export const _mysql = function(q){
    const self = this;
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

  export const mysql = function({query,limit,offset}){
    const self = this;
    const req =validateReq({query, limit, offset});
    const q = 'SELECT ' + req.query + ' LIMIT ' + req.offset + ',' + req.limit;
    const qc = 'SELECT COUNT(*) AS count,' + req.query + ' LIMIT ' + req.offset + ',' + req.limit;
    console.log("mysql: ", q);
    console.log("mysql: ", qc);
    var data = _mysql(q);
    var count = _mysql(qc);
    return {values: _mysql(q), count: _mysql(qc)[0].count};
  };

  Meteor.methods({
    'mysql.query'({query,limit,offset}) {
      return mysql({query,limit,offset});
    }
  });

  Meteor.publish('mysql_query', function ({query, limit, offset}) {
    const self = this;
    const stuff = mysql({query, limit, offset});
    self.added('mysql_query', Random.id(), {_count: stuff.count});
    _(stuff.values).each(function (s) {
      self.added('mysql_query', Random.id(), s);
    });
    self.ready();
  });
}
