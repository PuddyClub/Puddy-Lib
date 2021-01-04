// Prepare Module
const firebaseObject = { apps: {} };

// Get App
firebaseObject.get = function (value) {

    // Check
    if ((typeof value === "string" || typeof value === "number") && firebaseObject.apps[value]) {

        // Send Item
        return firebaseObject.apps[value];

    }

    // Nope
    else {
        return null;
    }

};

// Encode
firebaseObject.escape = require('./escape');

// Get Database Async
firebaseObject.getDBAsync = function (data, type = 'value') {

    // The Promise
    return new Promise(function (resolve, reject) {

        // Run Data
        data.once(type, function (snapshot) {

            // Send Result
            resolve(snapshot);

        }, function (errorObject) {

            // Send Error
            reject(errorObject);

        });

    });

};

// Get Database Data
firebaseObject.getDBValue = function (data) {

    let new_data = null;
    if (data && typeof data.val === "function") {
        new_data = data.val();
    }

    return new_data;

};

// Database Escape
firebaseObject.databaseEscape = function (text, keepPath = false) {

    // is String
    if (typeof text === "string" || typeof text === "number") {

        // New Value
        let new_value = text;
        if (typeof new_value === "number") {
            new_value = String(new_value);
        }

        // Normal
        if (!keepPath) {
            new_value = firebaseObject.escape.encode(new_value);
        }

        // Keep Path
        else {

            // Separete Path
            new_value = new_value.split('/');
            for (const item in new_value) {
                new_value[item] = firebaseObject.escape.encode(new_value[item]);
            }

            // Join Path Back
            new_value = new_value.join('/');

        }

        // Complete
        return new_value;

    }

    // Nothing
    else { return null; }

};

// Start Modules App
firebaseObject.startModule = function (value, item) {

    // Check
    if ((typeof value === "string" || typeof value === "number") && firebaseObject.apps[value]) {

        // Confirm Action
        let action_confirmed = false;

        // Database
        if (item.database) {
            firebaseObject.apps[value].db = firebaseObject.apps[value].root.database();
            action_confirmed = true;
        }

        // Auth
        if (item.auth) {
            firebaseObject.apps[value].auth = firebaseObject.apps[value].root.auth();
            action_confirmed = true;
        }

        // Firestore
        if (item.firestore) {
            firebaseObject.apps[value].store = firebaseObject.apps[value].root.firestore();
            action_confirmed = true;
        }

        // Storage
        if (item.storage) {
            firebaseObject.apps[value].storage = firebaseObject.apps[value].root.storage();
            action_confirmed = true;
        }

        // Cloud Messaging
        if (item.messaging) {
            firebaseObject.apps[value].messaging = firebaseObject.apps[value].root.messaging();
            action_confirmed = true;
        }

        // Send positive result
        return action_confirmed;

    }

    // Nope
    else {
        return false;
    }

};

// Start
firebaseObject.start = function (admin, item, data) {

    // Try
    try {

        // Get File Module
        const fs = require('fs');

        // Start Firebase
        const start_firebase = function (json_file = null) {

            // Check Exist
            if (!firebaseObject.apps[item.id]) {

                // Firebase Settings
                const firebase_settings = {};

                // Exist File
                if (json_file) {
                    firebase_settings.credential = admin.credential.cert(json_file);
                }

                // Read Data
                if (data) {
                    for (const data_item in data) {
                        if (data_item !== "credential") {
                            firebase_settings[data_item] = data[data_item];
                        }
                    }
                }

                // Fix Database URL
                if (typeof firebase_settings.databaseURL === "string") {
                    if (!firebase_settings.databaseURL.startsWith('https://') && !firebase_settings.databaseURL.endsWith('.firebaseio.com')) {
                        firebase_settings.databaseURL = `https://${firebase_settings.databaseURL}.firebaseio.com`;
                    }
                }

                // Fix Storage URL
                if (typeof firebase_settings.storageBucket === "string") {
                    if (!firebase_settings.storageBucket.endsWith('.appspot.com')) {
                        firebase_settings.storageBucket = `${firebase_settings.storageBucket}.appspot.com`;
                    }
                }

                // Prepare Base
                firebaseObject.apps[item.id] = {};

                // Initialize App
                firebaseObject.apps[item.id].root = admin.initializeApp(firebase_settings, item.id);

                // Auto Start
                if (item.autoStart) {
                    firebaseObject.startModule(item.id, item.autoStart);
                }

            }

            // Return
            return;

        };

        // Exist ID
        if (item && typeof item.id === "string" && item.id !== "start") {

            // Check Variables
            if (typeof item.appID === "string") {

                // Key File
                let keyFile = null;

                if (item.keysFolder) {
                    keyFile = require('path').join(item.keysFolder, './' + item.appID + '.json');
                }

                // Exist File
                if (keyFile && fs.existsSync(keyFile) && fs.lstatSync(keyFile).isFile()) {
                    start_firebase(require(keyFile));
                }

                // Nope
                else {
                    console.error(new Error('Firebase File Not Found.'));
                }

            }

            // Nope
            else {
                start_firebase();
            }

        }

        // Nope
        else {
            console.error(new Error('You need to insert a ID value!'));
        }

    }

    // Get Error
    catch (err) { console.error(err); }

    // Return
    return;

};


// Send Module
module.exports = firebaseObject;