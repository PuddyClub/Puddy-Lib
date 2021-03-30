// Panel// Module
module.exports = function (io, ioCache) {

    io.set('authorization', function (socket, callback) {

        // Get User IP
        const ip = require('../../http/userIP')(socket.handshake);

        if (!Array.isArray(ioCache.blocklick) || ioCache.blocklick.indexOf(ip) < 0) {
            //allow the socket to connect
            callback(null, true);
        } else {
            //prevent the socket handshake with an error
            callback('socket.io is not accepting connections from this page', false);
        }

    });

};