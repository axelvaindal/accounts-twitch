Accounts.oauth.registerService("twitch");

if (Meteor.isClient) {
  Meteor.loginWithTwitch = function(options, callback) {
    if (!callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(
      callback
    );
    Twitch.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ["services.twitch"],
    forOtherUsers: [
      "services.twitch.display_name",
      "services.twitch.name",
      "services.twitch.logo",
    ],
  });
}
