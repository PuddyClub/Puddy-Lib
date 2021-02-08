module.exports = function (domain, httpResult = 'https') {

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

        // Normal Domain
        if (!domainSelected.startsWith('localhost:')) { return `${httpResult}://${domainSelected}`; }

        // Localhost
        else { return `http://${domainSelected}`; }

    }

    // Nope
    else { return ''; }

};