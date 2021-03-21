// Check Version
const check_version = {
    v: null,
    t: null
};

// Modules
const latestVersion = require('latest-version');
const compareVersions = require('compare-versions');
const moment = require('moment');

module.exports = async function (package) {

    // Time Now
    const now = moment();

    // Check Version
    if (!check_version.t || now.diff(check_version.t, 'hours') > 0) {
        check_version.t = now.add(1, 'hours');
        check_version.v = await latestVersion(package.name);
    }

    // Insert Version
    const result = { needUpdate: compareVersions.compare(package.version, check_version.v, '<') };

    // Allowed Show Version
    result.now = package.version;
    result.new = check_version.v;

    // Return
    return result;

};