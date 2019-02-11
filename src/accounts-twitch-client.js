Twitch = {}; // eslint-disable-line no-global-assign

Twitch.requestCredential = function(
  options,
  credentialRequestCompleteCallback
) {
  if (!credentialRequestCompleteCallback && typeof options === "function") {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  const config = ServiceConfiguration.configurations.findOne({
    service: "twitch",
  });

  if (!config) {
    if (credentialRequestCompleteCallback) {
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    }

    return;
  }

  const credentialToken = Random.secret();
  const loginStyle = OAuth._loginStyle("twitch", config, options);
  const requiredScope = ["user_read"];
  let scope = (options && options.requestPermissions) || [
    "user_read",
    "channel_read",
  ];
  scope = _.union(scope, requiredScope);
  const flatScope = _.map(scope, encodeURIComponent).join("+");

  const loginUrl =
    "https://id.twitch.tv/oauth2/authorize" +
    "?response_type=code" +
    "&client_id=" +
    config.clientId +
    "&redirect_uri=" +
    OAuth._redirectUri("twitch", config) +
    "&scope=" +
    flatScope +
    "&state=" +
    OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: "twitch",
    loginStyle,
    loginUrl,
    credentialRequestCompleteCallback,
    credentialToken,
  });
};
