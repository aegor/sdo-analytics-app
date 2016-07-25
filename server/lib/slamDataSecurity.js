import {config} from '/imports/config';

export const slamDataSecurity = function (req, res, next) {
  console.log("Slamdatasecurity: ", req.url, req.cookies.get('meteor_login_token'));
  if (req.url.startsWith(config.analyticsPrefix + '/index.html') ||
    req.url.startsWith(config.analyticsPrefix + '/workspace.html') ||
    req.url.startsWith('/query') ||
    req.url.startsWith('/data') ||
    req.url.startsWith('/compile') ||
    req.url.startsWith('/mount') ||
    req.url.startsWith('/metadata') ||
    req.url.startsWith('/server')
  ) {
    // Login service stuff

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
    // Login service

    // slamdata protection logic
    if (!isLogged) {
      console.log('not logged');
      res.redirect('/login');
    }
    if (!isStaff) {
      console.log('user is not in staff');
      res.redirect(config.analyticsPermURL);
    }
    if (!isAdmin) {
      console.log('user is not in admin');
      /*       if (req.url.startsWith(config.analyticsPrefix + '/index.html')) {
       console.log('index.html allow only for admins');
       res.redirect(config.analyticsPermURL);
       }*/
      if (req.url.startsWith(config.analyticsPrefix + '/workspace.html' && req.url.indexOf(".slam/edit") !== -1)) {
        var redir = req.url.replace('.slam/edit', '.slam/view');
        console.log('redirect to view');
        res.redirect(redir);
      }
      else if ((req.url.startsWith('/data') ||
        req.url.startsWith('/mount') ||
        req.url.startsWith('/server') ||
        req.url.startsWith('/metadata')) &&
        (req.method !== "GET" && req.url.indexOf(".slam/.tmp") === -1) // .tmp url is a temporary notebook, need for slamdata evaluation
      ) {
        console.log("protection assert");
        res.end('{error: "slamdata protection"}');
        //res.redirect(config.analyticsPermURL);
      }
      else {console.log("next int chain"); next();}
    }
  }
/*
  else {
    console.log("next ext chain");
    next();
  }
*/
};

