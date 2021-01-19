module.exports = function (req, cfg) {

    // Modules
    const checkDomain = require('./check_domain');

    // Start Domain Verification
    let domainStatus = { verified: false, domain: checkDomain.get(req) };

    // Path
    req.urlPath = req.url.split('/');
    req.urlPath.shift();

    // Is Obj
    const objType = require('../get/objType');
    if (objType(cfg, 'object')) {

        // Verify String
        if ((typeof cfg.domain === "string" && cfg.domain === domainStatus.domain) || require('../firebase/isEmulator')()) {
            domainStatus.verified = true;
        }

        // Array Domains
        else if (Array.isArray(cfg.domain)) {
            for (const item in cfg.domain) {
                if (typeof cfg.domain[item] === "string" && cfg.domain[item] === domainStatus.domain) {
                    domainStatus.verified = true;
                    break;
                }
            }
        }

    }

    // Result
    return domainStatus;

};