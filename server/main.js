import {Meteor} from 'meteor/meteor';
import {config} from '/server/config';
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
      app.use(urls[i], proxy(url.parse(config.slamDataURL + urls[i])) );
      //app.use('/files' + urls[i], proxy(url.parse(config.slamDataURL + urls[i])) );
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
  app.use('/assets', function (req, res, next) {
    var tmp = serve(req, res, next);
    return tmp;
  });

  // body parsers for json and forms
  app.use(bodyParser.json());                       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

  // segment.io endpoint
  app.use("/metrics", function (req, res, next) {
    res.writeHead(200);
    const point = prepareSegmentPoint(req);
    point.tags._id = Meteor.uuid();
    Fiber(function () {
      Metrics.insert(point.tags);
    }).run();
    res.end();
  });

  function test404(req,res,next){
    var isRoute = false;
    for (var i in Router.routes){
      if (Router.routes[i].path)
        Router.routes[i].path() === url.parse(req.url).pathname ? isRoute = true : isRoute = false;
    }
   if (isRoute) {
     next()
   }
   else {
     res.writeHead(404, {"Content-Type": "text/html"});
     console.log("404 error: ", req.url);
     res.end('404 СТРАНИЦА НЕ НАЙДЕНА');
   }
  }
  // (must be last)
  app.use(test404);

});
