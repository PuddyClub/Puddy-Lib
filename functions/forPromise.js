module.exports = function (obj, callback) {
    return new Promise(function (resolve, reject) {

        // Prepare Count
        let items = {
            error: false,
            count: 0,
            total: null,
            items: []
        };

        // Error Result
        const error_result = function (err) {

            // Send Error Reject
            items.error = true;
            reject(err);

            // Complete
            return;

        };

        // Prepare Result
        const result = function (isExtra, extraIndex, item) {

            // No Error
            if (!items.error) {

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

                        // Check Extra Exist
                        if (extra.list[extraIndex]) {

                            // Complete Check
                            extra.list[extraIndex].complete = true;

                            // Check List
                            let confirmation_checked = true;

                            // Detect Progress
                            for (const item in extra.list) {
                                if (!extra.list[item].complete) {
                                    confirmation_checked = false;
                                    break;
                                }
                            }

                            // Complete
                            if (confirmation_checked) {

                                // Add Extra Info
                                items.extra = extra.list;

                                // Resolve
                                resolve(items);

                            }

                        }

                        // Nope
                        else {
                            reject(new Error('forAwait Extra Index not found.'));
                        }

                    }

                }

            }

            // Return
            return;

        };

        // Run For
        const runFor = function (callback, isExtra = false, index = null) {

            // Start the For
            for (const item in obj) {

                // No Error
                if (!items.error) {

                    // Try
                    try {
                        callback(item, function () { return result(isExtra, index, item); }, error_result, extra.extra_function);
                    }

                    // Error
                    catch (err) {
                        items.error = true;
                        reject(err);
                        break;
                    }

                }

                // Error
                else {
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
                        if (!items.error) { runFor(callback, true, index); }

                        // Complete
                        return;

                    }

                };

            }

        };

        // Run For
        runFor(callback);

        // Complete
        return;

    });
};