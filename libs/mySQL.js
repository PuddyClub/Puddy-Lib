// Modules
module.exports = function (mysql, databases, cfg, proxyType = false) {
    return new Promise(function (resolve, reject) {

        // Modules
        const util = require('util');
        const clone = require('clone');
        const isEmulator = require('../firebase/isEmulator');
        const objType = require('../get/objType');
        const _ = require('lodash');
        let db = {};
        let databaseList = [];

        // Create Settings
        const tinyCfg = _.defaultsDeep({}, cfg, {
            charset: "utf8mb4"
        });

        // Convert
        if (!Array.isArray(databases)) {
            databaseList = [clone(databases)];
        } else {
            databaseList = clone(databases);
        }

        // Run Array
        for (const item in databaseList) {

            // Exist
            if (objType(databaseList[item], 'object') && objType(databaseList[item].data, 'object')) {

                // Charset
                if (typeof databaseList[item].data.charset !== "string") {
                    databaseList[item].data.charset = tinyCfg.charset;
                }

                // Is Firebase
                if ((proxyType === "firebase" && !isEmulator()) || proxyType === "google_cloud") {
                    databaseList[item].data.socketPath = databaseList[item].firebase.socketPath;
                }

                // Normal Connection
                else {

                    // SSL Files
                    if (objType(databaseList[item].default.ssl, 'object')) { databaseList[item].data.ssl = databaseList[item].default.ssl; }

                    // Host and Port
                    databaseList[item].data.host = databaseList[item].default.host;
                    databaseList[item].data.port = databaseList[item].default.port;

                }

                // Create DB Connection

                // Complete
                try {
                    db[databaseList[item].data.database] = mysql.createPool(databaseList[item].data);
                    db[databaseList[item].data.database].query = util.promisify(db[databaseList[item].data.database].query);
                }

                // Error
                catch (err) {
                    reject(err);
                    return;
                }

            }

            // Nope
            else { reject(new Error('Invalid MySQL Setting!')); return; }

        }

        // Fix
        const dbKets = Object.keys(db);
        if (dbKets.length < 2) {
            db = db[dbKets[0]];
        }

        // Complete
        resolve(db);
        return;

    });
};