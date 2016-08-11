Oauth.registerService('django', 2, null, function(query) {
  var response = getTokenResponse(query);
  var identity = getIdentity(response.accessToken);
  //var identity = JSON.parse(json);

  var serviceData = {};
  serviceData.roles = [];
  
  serviceData = {
    id: identity.user_id,
    is_staff: identity.is_staff,
    is_admin: identity.is_admin,
    sessions: identity.sessions,
    accessToken: response.accessToken,
    expiresAt: (+new Date) + (1000 * response.expiresIn)
  }; 

  // var fields = response.user;
  // _.extend(serviceData, fields);

  // XXX:
  // We'll either get some user information passed back at this point
  // or we'll need to make an API call to retrieve user information to store
  return {
    serviceData: serviceData,
    options: {
      profile: {
        name: identity.full_name,
        email: identity.email,
        roles: identity.roles,
        username: identity.username,
        education_model: identity.education_model,
        municipality: identity.municipality,
        full_name: identity.full_name,
        user_class: identity.user_class,
        school: identity.school
      }
    }
  };
});

var getConfiguration = function() {
  var config = ServiceConfiguration.configurations.findOne({service: 'django'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  return config;
};

var getIdentity = function(accessToken) {
  var config = getConfiguration();
  try {
    return HTTP.get(config.identityUrl, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity. " + err.message), {
      response: err.response
    });
  }
};

// Django returns user profile information here along with the access token
var getTokenResponse = function (query) {
  var config = getConfiguration();
  var response;
  try {
    response = HTTP.post(
      config.tokenUrl, {params: {
        client_id: config.clientId,
        client_secret: config.secret,
        code: query.code,
        grant_type: 'authorization_code',
        redirect_uri: encodeURIComponent(config.redirectUri),
      }});
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake. " + err.message),
                   {response: err.response});
  }

  if (response.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake. " + response.data.error);
  } else {
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    };
  }
};

Django.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
