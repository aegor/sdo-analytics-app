import {Meteor} from 'meteor/meteor';
import {config} from '/imports/config';
import {ServiceConfiguration} from 'meteor/service-configuration';
// import { HTTP } from 'meteor/http';
import {WebApp} from 'meteor/webapp';
import {prepareSegmentPoint, debugLog} from './lib/utils';
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

  // conbfigure oauth service
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

  // Redirect middleware initialization
  app.use('/', redirect());
  app.use(cookies());
  // Redirect middleware use
  app.use('/', function (req, res, next) {
    console.log(req.url, req.cookies.get('meteor_login_token'));
    var isLogged = false;
    var isAdmin = false;
    var isStaff = false;
    if (req.cookies.get('meteor_login_token')) {
      var user = Meteor.users.findOne({"services.resume.loginTokens.hashedToken": Accounts._hashLoginToken(req.cookies.get('meteor_login_token'))});
      if (user._id) {
        isLogged = true;
        if (user.services.django.is_admin === 1) {
          isAdmin = true;
        }
        if (user.services.django.is_staff === 1) {
          isStaff = true;
        }
      }
    }

    if ((req.url.startsWith(config.analyticsPrefix + '/index.html') || req.url.startsWith(config.analyticsPrefix + '/workspace.html'))) {
      if (!isLogged) {
        console.log('not logged');
        res.redirect('/login');
      }

      if (!isStaff) {
        console.log('user is not in staff');
        res.redirect(config.analyticsPermURL);
      }
      if (!isAdmin) {
        if (req.url.startsWith(config.analyticsPrefix + '/index.html')) {
          console.log('index.html allow only for admins');
          res.redirect(config.analyticsPermURL);
        }
        if (req.url.startsWith(config.analyticsPrefix + '/workspace.html' && req.url.indexOf(".slam/edit") !== -1)) {
          var redir = req.url.replace('.slam/edit', '.slam/view');
          console.log('redirect to view');
          res.redirect(redir);
        }
      }
    }
    next();
  });
  // --- Redirect
  // Proxy meddleware start
  app.use('/metadata', proxy(url.parse(config.slamDataURL + '/metadata')));
  app.use('/mount', proxy(url.parse(config.slamDataURL + '/mount')));
  app.use('/data', proxy(url.parse(config.slamDataURL + '/data')));
  app.use('/compile', proxy(url.parse(config.slamDataURL + '/compile')));
  app.use('/query', proxy(url.parse(config.slamDataURL + '/query')));
  //app.use('/analytics', proxy(url.parse(config.slamDataURL + '/files')));

  // --- Proxy
  // Serve static content (meteor public folder serving is shit)
  const serve = serveStatic(path.resolve('.') + '/../web.browser/app', {'index': ['index.html']});
  app.use(config.analyticsPrefix, function (req, res, next) {
    console.log(config.analyticsPrefix);
    var tmp = serve(req, res, next);
    return tmp;
  });
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
      debugLog("----------------------------------------------------------------------------------------------------");
      debugLog('tags', point.tags);
      if (influxdb) {
        influxdb.writePoint(point.seriesName, point.value, point.tags, function (err, response) {
          if (err) {
            console.log("Influxdb ", err)
          }
        });
      }
      point.tags._id = Meteor.uuid();
      Metrics.insert(point.tags);
      //res.write();
      res.end();
    }).run();
  });
});
