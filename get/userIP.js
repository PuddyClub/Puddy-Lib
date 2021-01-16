
module.exports = function (req, options = {}) {

    // Prepare IP Value
    let ip = { result: null, type: null };

    // Detect Headers
    if (req.headers) {

        // Exist Client IP
        if (options.isFirebase && req.headers['fastly-client-ip']) {
            ip.result = req.headers['fastly-client-ip'];
            ip.type = 'fastly-client-ip';
        }

        // Forwarded
        else if (req.headers['x-forwarded-for']) {
            ip.result = req.headers['x-forwarded-for'];
            ip.type = 'x-forwarded-for';
        }

    }

    // Connection
    if (!ip.result && req.connection && req.connection.remoteAddress) {
        ip.result = req.connection.remoteAddress;
        ip.type = 'connection.remoteAddress';
    }

    // Return Value
    return ip;

}