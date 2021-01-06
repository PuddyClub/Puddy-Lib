module.exports = function (obj, callback) {
    return new Promise(function (resolve, reject) {

        // Prepare Count
        let items = {
            count: 0,
            total: null,
            items: []
        };

        // Prepare Result
        const result = function (isExtra) {

            // Count
            items.count++;

            // Add Item
            items.items.push(item);

            // Complete
            if (tems.count >= tems.total) {

                // Normal Result
                if (!isExtra) {
                    if (!extra.enabled) { resolve(items); }
                }

                // Extra Result
                else {
                    
                }

            }

            // Return
            return;

        };

        // Run For
        const runFor = function (callback, isExtra) {

            // Start the For
            for (const item in obj) {

                // Try
                try {
                    callback(item, function () { return result(isExtra); }, extra.functions);
                }

                // Error
                catch (err) {
                    reject(err);
                    break;
                }

            }

            return;

        };

        // Detect Object Module
        const countObj = require('../get/countObj');
        items.total = countObj(obj);

        // Prepare Extra
        const extra = {

            // Enabled
            enabled: false,

            // Extra List
            list: [],

            // Functions
            extra_function: function (new_extra) {

                // Prepare Extra
                extra.enabled = true;
                extra.list.push({
                    complete: false,
                    count: 0,
                    total: null,
                    items: []
                });

                // Index
                const index = extra.list.length - 1;

                // Get Total
                extra.list[index] = countObj(new_extra);

                // Callback
                return {

                    // Run Extra
                    run: function (callback) {

                        // Run For
                        runFor(callback, true);

                        // Complete
                        return;

                    }

                };

            }

        };

        // Run For
        runFor(callback, false);

        // Complete
        return;

    });
};