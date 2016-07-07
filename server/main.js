import {Meteor} from 'meteor/meteor';
// import { HTTP } from 'meteor/http';
import {WebApp} from 'meteor/webapp';
import {prepareSegmentPoint, debugLog} from './lib/utils';
import {Metrics} from '/imports/collections';
import {elastic} from './drivers/influxdb';
import {influxdb} from './drivers/elastic';

const bodyParser = require('body-parser');
const xheader = require('connect-header');
const Fiber = require('fibers');

/* Stuff to mimicry to classic @connect workflow from meteor-based @connect API */
const app = WebApp.connectHandlers;

Meteor.startup(() => {
  console.log("Started");
  app.use(xheader({
    'X-Name': 'luics',
    'X-Age': '25'
  }));
  app.use(bodyParser.json());                       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies
  app.use("/metrics", function (req, res, next) {
    Fiber(function () {
      res.writeHead(200);
      const point = prepareSegmentPoint(req);
      debugLog('tags', point.tags);
      debugLog('value', point.value);
      if(influxdb) {
        influxdb.writePoint(point.seriesName, point.value, point.tags, function (err, response) {
          if (err) {
            console.log("Influxdb ", err)
          }
        });
      }
      point.tags._id = Meteor.uuid();
      Metrics.insert(point.tags);
      res.end();
    }).run();
  });
});
