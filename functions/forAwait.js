module.exports = function (obj, callback) {
    return new Promise(function (resolve, reject) {

        // Prepare Count
        let items = {
            count: 0,
            total: null,
            items: []
        };

        // Detect Object Module
        const objType = require('../get/objType');

        // Is Array
        if(Array.isArray(obj)){
            items.total = obj.length;
        }

        // Object
        else if (objType(obj, 'object')) {
            items.total = Object.keys(obj).length;
        }

        // Start the For
        for (const item in obj) {

            // Try
            try {

                // Send the Callback
                callback(item, function () {

                    // Count
                    items.count++;

                    // Add Item
                    items.items.push(item);

                    // Complete
                    if(tems.count >= tems.total) {
                        resolve(items);
                    }

                    // Return
                    return;
                
                });

            }

            // Error
            catch (err) {
                reject(err);
                break;
            }

        }

        // Complete
        return;

    });
};