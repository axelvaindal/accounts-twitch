Package.describe(
{
    name: "m4dnation:accounts-twitch",
        
    version: "0.0.1",
        
    summary: "A login service for Twitch.",
        
    git: "https://github.com/M4dNation/accounts-twitch",
});
        
Package.onUse(function(api)
{
    api.versionsFrom("1.7.0.3");
        
    api.use("ecmascript");
    api.use("accounts-base", ["client", "server"]);
    api.imply("accounts-base");
    api.use("accounts-oauth", ["client", "server"]);

    api.use("oauth", ["client", "server"]);
    api.use("oauth2", ["client", "server"]);
    api.use("http", ["server"]);
    api.use("underscore", "server");
    api.use("random", "client");
    api.use("service-configuration", ["client", "server"]);

    api.addFiles("src/accounts-twitch-client.js", "client");
    api.addFiles("src/accounts-twitch-server.js", "server");
    api.addFiles("src/accounts-twitch.js");

    api.export("Twitch");
});
        