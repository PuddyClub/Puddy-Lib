module.exports = function (res, next, file, date, timezone) {

    // Is String
    if (typeof file === "string") {

        // Get Module
        const optionalRequire = require('../get/module');

        // Modules
        const moment = optionalRequire('moment-timezone');
        const md5 = optionalRequire('md5');
        const byteLength = optionalRequire('byte-length');

        // File Type
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Access-Control-Allow-Origin', 'same-origin');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('Timing-Allow-Origin', 'same-origin');
        res.removeHeader('Connection');
        res.removeHeader('X-Powered-By');

        // MD5
        if (md5) { res.setHeader('Content-MD5', Buffer.from(md5(file)).toString('base64')); }

        // Time
        if (moment) { res.setHeader('Last-Modified', moment.tz(date, timezone).toString()); }

        // Cache Control
        if (typeof tinyThis.data.fileMaxAge === "number") {
            res.setHeader('Expires', moment.tz('UTC').add(tinyThis.data.fileMaxAge, 'seconds').toString());
            res.set('Cache-Control', `public, max-age=${tinyThis.data.fileMaxAge}`);
        }

        // File Size
        if (byteLength) { res.setHeader('Content-Length', byteLength.byteLength(file)); }

        // Send FIle
        res.send(file);

    }

    // Nope
    else { next(); }

    // Complete
    return;

};