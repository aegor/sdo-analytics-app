import {config} from '/server/config';
import {validateReq} from '/server/lib/utils';
import { HTTP } from 'meteor/http';

// Example method call:
/*
  Meteor.call('quasar.query', {
  query: "DISTINCT (municipality) FROM metrics ORDER BY municipality",
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
 var handle = Meteor.subscribe('quasar_query', {
 query: 'TO_TIMESTAMP(time) as time, email, full_name, municipality, school, user_class FROM metrics as c',
 limit: 20,
 offset: 0
 });
 var qobjects = new Mongo.Collection('quasar_query');
 qobjects.find().fetch()
 */

if (config.quasar) {
  var _quasar = function(req){
    const self = this;
    try {
      var q = config.slamDataURL + config.quasarPrefix + '?q=' + encodeURIComponent(req);
      console.log(q);
      var options = {headers: {'Accept': 'application/json'}};
      var res = HTTP.get(q, options);
      return JSON.parse(res.content);
    }
    catch(e) {
      console.log( "quasar: ", e );
      return {error: e}
    }
  };

  var quasar = function({query, limit, offset}){
    const self = this;
    const req =validateReq({query, limit, offset});
    var q = 'SELECT ' + req.query + ' OFFSET ' + req.offset + ' LIMIT ' + req.limit;
    var qc = 'SELECT COUNT(*) '
      + req.query.substring(req.query.indexOf('FROM') === -1 ? req.query.indexOf('from') : req.query.indexOf('FROM'))
      + ' LIMIT 1';
    console.log("quasar: ", q);
    console.log("quasar: ", qc);
    var count = _quasar(qc);
    if( count.length === 0 ) return {values:[], count: 0}
    var data = _quasar(q);
    return {values:data, count: count[0][0]};
  };
  Meteor.methods({
    'quasar.query'({query,limit,offset}) {
      return quasar({query, limit, offset});
    }
  });

  Meteor.publish('quasar_query', function ({query, limit, offset}) {
    const self = this;
    const stuff = quasar({query, limit, offset});
    console.log("stuff count: ", stuff.count);
    _(stuff.values).each(function (s) {
      console.log("stuff: ", s);
      self.added('quasar_query', Random.id(), s);
    });
    self.ready();
  });
}