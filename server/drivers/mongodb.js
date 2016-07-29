import {Metrics} from '/imports/collections';

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
