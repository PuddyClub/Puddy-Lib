module.exports = function (req, cfg) {

    // Modules
    const checkDomain = require('./check_domain');

    // Start Domain Verification
    let domainStatus = { verified: false, domain: checkDomain.get(req), isStaticPath: false };

    // Path
    var prepareUrlPath = req.url.split('/');
    req.url_path = [];
    for (const item in prepareUrlPath) {
        if (Number(item) > 0) {

            // Insert URL Path
            req.url_path.push(prepareUrlPath[item].split(/[?#]/)[0]);

        }
    }

    // Delete Prepare
    delete prepareUrlPath;

    // Is Obj
    const objType = require('../get/objType');
    if (objType(cfg, 'object')) {

        // Firebase Is Emulator
        const isEmulator = require('../get/module')('@tinypudding/firebase-lib/isEmulator');
        let firebaseIsEmulator = false;
        if (isEmulator) { firebaseIsEmulator = isEmulator(); }

        // Verify String
        if ((typeof cfg.domain === "string" && cfg.domain === domainStatus.domain) || firebaseIsEmulator) {
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

        // is Valid
        if (domainStatus.verified) {

            // Validate Static Path
            if (Array.isArray(cfg.staticPath)) {
                for (const item in cfg.staticPath) {
                    if (typeof cfg.staticPath[item] === "string" && req.url.startsWith(cfg.staticPath[item])) {
                        domainStatus.isStaticPath = true;
                        break;
                    }
                }
            }

        }

    }

    // Result
    return domainStatus;

};