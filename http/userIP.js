
module.exports = function (req, options) {

    // Prepare IP Value
    let ip = { value: null, type: null };

    // Prepare Config
    const _ = require('lodash');
    const tinyCfg = _.defaultsDeep({}, options, {
        isFirebase: false
    });

    // Detect Headers
    if (req.headers) {

        // Exist Client IP
        if (tinyCfg.isFirebase && req.headers['fastly-client-ip']) {
            ip.value = req.headers['fastly-client-ip'];
            ip.type = 'fastly-client-ip';
        }

        // Forwarded
        else if (req.headers['x-forwarded-for']) {
            ip.value = req.headers['x-forwarded-for'];
            ip.type = 'x-forwarded-for';
        }

    }

    // Connection
    if (!ip.value && req.connection && req.connection.remoteAddress) {
        ip.value = req.connection.remoteAddress;
        ip.type = 'connection.remoteAddress';
    }

    // Return Value
    return ip;

}