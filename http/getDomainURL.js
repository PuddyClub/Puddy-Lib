module.exports = function (domain, port, httpResult = 'https') {

    // Domain Selected
    let domainSelected = null;

    // String
    if (typeof domain === "string") {
        domainSelected = domain;
    }

    // Nope
    else {
        domainSelected = require('./check_domain').get(domain);
    }

    // Domain
    if (typeof domainSelected === "string") {

        // Port
        let finalPort = port;
        let finalURL = '';
        if (typeof finalPort === "number" && finalPort !== 80 && finalPort !== 443) {
            finalPort = ':' + finalPort;
        } else {
            finalPort = '';
        }

        // Normal Domain
        if (!domainSelected.startsWith('localhost:') && !domainSelected === "localhost") { finalURL = `${httpResult}://${domainSelected}`; }

        // Localhost
        else { finalURL = `http://${domainSelected}`; }

        // Exist Port
        if (finalPort && typeof finalURL.split(':')[2] !== "string") {
            finalURL += finalPort;
        }

        // Complete
        return finalURL;

    }

    // Nope
    else { return ''; }

};