const { shortcutCheckVersion } = require('./shortcut-check-version');

module.exports.register = (app) => {
    app.shortcut('shortcut_check_version', shortcutCheckVersion);
}