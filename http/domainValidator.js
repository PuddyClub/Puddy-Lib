module.exports = function (req, cfg) {

    // Modules
    const checkDomain = require('./check_domain');

    // Start Domain Verification
    let domainStatus = { verified: false, domain: checkDomain.get(req) };

    // Path
    var prepareUrlPath = req.url.split('/');
    req.urlPath = [];
    for (const item in prepareUrlPath) {
        if(item !== 0) {

            // Insert URL Path
            req.urlPath.push(prepareUrlPath[item].split(/[?#]/)[0]);
        
        }
    }

    // Delete Prepare
    delete prepareUrlPath;

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