module.exports = function () {
    const tinyArgs = arguments;
    return new Promise(function (resolve, reject) {

        // Prepare Module
        const fetch = require('node-fetch');
        fetch.apply(fetch, tinyArgs).then(response => {

            // Get Response
            response.json().then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });

            // Complete
            return;

        }).catch(err => {
            reject(err);
        })

        // Complete
        return;

    });
};