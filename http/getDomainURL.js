module.exports = function (domain, httpResult = 'https') {

    // String
    if (typeof domain === "string") {

        // Normal Domain
        if (!domain.startsWith('localhost:')) { return `${httpResult}://${domain}`; }

        // Localhost
        else { return `http://${domain}`; }

    }

    // Nope
    else { return ''; }

};