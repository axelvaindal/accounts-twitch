AccountsTwitch = {}; // eslint-disable-line no-global-assign

OAuth.registerService("twitch", 2, null, query => {
  const response = getTokenResponse(query);
  const accessToken = response.access_token;
  const user = getUser(accessToken).data[0];

  const serviceData = _.extend(user, { accessToken });

  return {
    serviceData,
    options: {
      profile: { name: user.display_name },
      services: { twitch: user },
    },
  };
});

const getTokenResponse = function(query) {
  const config = ServiceConfiguration.configurations.findOne({
    service: "twitch",
  });

  if (!config) {
    throw new ServiceConfiguration.ConfigError();
  }

  let response;
  try {
    response = HTTP.post("https://id.twitch.tv/oauth2/token", {
      params: {
        code: query.code,
        client_id: config.clientId, // eslint-disable-line camelcase
        redirect_uri: OAuth._redirectUri("twitch", config), // eslint-disable-line camelcase
        client_secret: OAuth.openSecret(config.secret), // eslint-disable-line camelcase
        grant_type: "authorization_code", // eslint-disable-line camelcase
      },
    });

    if (response.error) {
      // If the http response was an error
      throw response.error;
    }

    if (typeof response.content === "string") {
      response.content = JSON.parse(response.content);
    }

    if (response.content.error) {
      throw response.content;
    }
  } catch (error) {
    throw _.extend(
      new Error(
        "Failed to complete OAuth handshake with Twitch. " + error.message
      ),
      { response: error.response }
    );
  }

  return response.content;
};

const getUser = function(accessToken) {
  try {
    return HTTP.get("https://api.twitch.tv/helix/users", {
      headers: { Authorization: "Bearer " + accessToken },
    }).data;
  } catch (error) {
    throw _.extend(
      new Error("Failed to fetch identity from Twitch. " + error.message),
      { response: error.response }
    );
  }
};

AccountsTwitch.retrieveCredential = function(
  credentialToken,
  credentialSecret
) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
