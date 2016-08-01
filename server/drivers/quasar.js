import {config} from '/server/imports/config';
import {validateReq} from '/server/lib/utils';
import { HTTP } from 'meteor/http';

if (config.quasar) {
  var quasar = function({query, limit, offset}){
    const self = this;
    const req =validateReq({query, limit, offset});
    var res = "";
    try {
      var q = config.slamDataURL + config.quasarPrefix + '?q=' + encodeURIComponent('SELECT ' + req.query + ' LIMIT ' + req.limit + ' OFFSET ' + req.offset);
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

  Meteor.methods({
    'quasar.query'({query,limit,offset}) {
      return quasar({query, limit, offset});
    }
  });

  Meteor.publish('quasar_query', function ({query, limit, offset}) {
    const self = this;
    const stuff = quasar({query, limit, offset});
    _(stuff).each(function (s) {
      console.log("stuff: ", s);
      self.added('quasar_query', Random.id(), s);
    });
    self.ready();
  });
}