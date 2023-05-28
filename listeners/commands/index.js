const { commandCheckVersion } = require('./command-check-version');

module.exports.register = (app) => {
  app.command('/check-version', commandCheckVersion);
};
