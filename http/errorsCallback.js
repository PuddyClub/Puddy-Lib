module.exports = function (app, callback) {
    return function (err, req, res, next) {

        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
                || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next()
        }

        //if request accept html request
        if (req.accepts('html')) {
            callback(req, res, { type: 'html', code: err.status, path: req.url, originalUrl: req.originalUrl, err: err });
        } else {
            callback(req, res, { code: err.status, path: req.url, originalUrl: req.originalUrl, err: err });
        }

        // Complete
        return;

    };
};