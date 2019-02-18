# accounts-twitch

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![Build Status](https://travis-ci.com/M4dNation/accounts-twitch.svg?branch=master)](https://travis-ci.com/M4dNation/accounts-twitch) ![](https://david-dm.org/M4dNation/accounts-twitch.svg)

## Install

`meteor add m4dnation:accounts-twitch`

## About

A login service for Twitch.

## Usage

Once the package is added to your Meteor project, you need to configure the Twitch integration with the information from your Twitch application.  
More information are available in the [documentation](https://dev.twitch.tv/docs/).  
Here is an exemple of configuration:

```js
// In any file loaded server side prior to any login attempt
ServiceConfiguration.configurations.upsert(
  { service: "twitch" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "my-twitch-client-id",
      redirectUri: "my-redirect-uri",
      secret: "my-twitch-client-secret",
    },
  }
);

// In a client side file
Meteor.loginWithTwitch({ requestPermissions: ["user:read:email"] }, err => {
  // do something here if any error, or after login if no error
});
```

## Authors

`accounts-twitch` is maintained by M4dNation Company.
First version written by [axelvaindal](https://github.com/axelvaindal).

## Contributors

There is actually no other contributors for this project.
If you want to contribute, feel free to make any suggestions or to contact us.

### Contributing to the package

We try to keep `accounts-twitch` as simple as possible.
Before proposing a PR or opening an issue, please keep in mind :

    - This package is meant to be as simple as possible
    - This package tries to respect the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
    - This package tries to use the minimum of dependencies possible

Taking into account the previous points leads us to **NOT** merge proposed pull-request if those :

    - Integrate changes that are too far from the initial purpose of the package
    - Integrate changes that are adding additional dependencies
    - Integrate changes that are not unit tested and motivationated

This being said, we **really** welcome pull-request and bug report, so feel free to start a contribution.
Moreover, Pull Requests should always come with related unit tests, and won't be considered if tests aren't included.

### Testing

`accounts-twitch` uses jest for unit testing.  
If you don't know about jest yet, you can check out their [documentation](https://jestjs.io/en/).

To run the tests, just run :

`yarn test`

Note that we are using [codecov](https://codecov.io) to keep track of code coverage related to our tests and you shouldn't affect negatively the current coverage of the code by removing tests or not covering new features with new unit tests.

## Licence

`accounts-twitch` is available under the terms of the MIT LICENSE.  
Check the licence file for more information.
