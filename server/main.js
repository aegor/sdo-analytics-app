import {Meteor} from 'meteor/meteor';
import {config} from '/server/imports/config';
import {ServiceConfiguration} from 'meteor/service-configuration';
import {WebApp} from 'meteor/webapp';
import {prepareSegmentPoint} from '/server/apps/segment-aggregator/prepareSegmentPoints';
import {debugLog} from '/server/lib/utils';
import {slamDataSecurity} from '/server/apps/quasar-proxy/slamDataSecurity';
import {Metrics} from '/imports/collections';
import {elastic} from './drivers/influxdb';
import {influxdb} from './drivers/elastic';
const Fiber = require('fibers');

const bodyParser = require('body-parser');

const xheader = require('connect-header');
const redirect = require('connect-redirection');
const url = require('url');
const proxy = require('proxy-middleware');
const cookies = require('connect-cookies');
const serveStatic = require('serve-static');
const path = require('path');

/* Stuff to mimicry to classic @connect workflow from meteor-based @connect API */
const app = WebApp.connectHandlers;

Meteor.startup(() => {
  console.log("Started");

  // configure oauth service
  ServiceConfiguration.configurations.upsert(
    {service: "django"},
    {
      $set: {
        clientId: config.oauth_clientId,
        secret: config.oauth_secret,
        tokenUrl: config.oauth_tokenUrl,
        loginUrl: config.oauth_loginUrl,
        identityUrl: config.oauth_identityUrl,
        redirectUri: config.oauth_redirectUri,
        requestPermissions: config.oauth_requestPermissions,
      }
    }
  );

  app.use(redirect());
  app.use(cookies());

  // headers example
  /*  app.use(xheader({
   'X-Name': 'luics',
   'X-Age': '25'
   }));*/

  app.use(slamDataSecurity);

  proxyStart = function (urls) {
    for (var i in urls) {
      console.log(urls[i]);
/*      app.use(urls[i], function (req,res,next){
        console.log("req.url: ", req.url);
        slamDataSecurity(req,res,next);
      });*/
      app.use(urls[i], proxy(url.parse(config.slamDataURL + urls[i])) );
    }
  };

// Proxy to quasar API
  proxyStart([
    '/metadata',
    '/mount',
    '/data',
    '/compile',
    '/query',
    '/server'
  ]);

  // Serve static content (meteor public folder serving is real shit)
  const serve = serveStatic(path.resolve('.') + '/assets/app', {'index': ['index.html']});
  app.use('/vendor', function (req, res, next) {
    var tmp = serve(req, res, next);
    return tmp;
  });


  // body parsers for json and forms
  app.use(bodyParser.json());                       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

  // segment.io endpoint (must be last)
  app.use("/metrics", function (req, res, next) {
    Fiber(function () {
      res.writeHead(200);
      const point = prepareSegmentPoint(req);
      debugLog("----------------------------------------------------------------------------------------------------");
      debugLog('tags', point.tags);
      if (influxdb) {
        influxdb.writePoint(point.seriesName, point.value, point.tags, function (err, response) {
          if (err) {
            console.log("Influxdb: ", err)
          }
        });
      }
      point.tags._id = Meteor.uuid();
      Metrics.insert(point.tags);
      res.end();
    }).run();
  });

/*  Router.map(function() {
    this.route('pageNotFound', {
      path: '/(.*)',
      where: 'server',
      action: function () {
        this.response.writeHead(404);
        this.response.end('404 (Not Found)');
      }
    });
  });*/
});
