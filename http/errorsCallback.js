module.exports = function (callback, skipNotFound = false) {
    return function (err, req, res, next) {

        // treat as 404
        if (!skipNotFound && err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next()
        }

        // Complete
        callback(req, res, next, { code: err.status, path: req.url, originalUrl: req.originalUrl, err: err });
        return;

    };
};