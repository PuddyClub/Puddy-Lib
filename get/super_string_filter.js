module.exports = function (list, validator_list) {

    // Get Obj Type
    const objType = require('./objType');

    // Result
    const result = [];

    // The For
    for (const item in list) {
        for (const item2 in validator_list) {

            // Check Types

            // String
            if (typeof validator_list[item2] === "string") {

                if (list[item] === validator_list[item2]) {
                    result.push(validator_list[item2]);
                    break;
                }

            }

            // Object
            if (objType(validator_list[item2], 'object')) {

                // Validator
                const validator_timezone = {};

                // Starts With
                validator_timezone.startsWith = {};
                validator_timezone.startsWith.enabled = (typeof validator_list[item2].startsWith === "string");
                if (validator_timezone.startsWith.enabled) {
                    validator_timezone.startsWith.result = list[item].startsWith(validator_list[item2].startsWith);
                };

                // Ends With
                validator_timezone.endsWith = {};
                validator_timezone.endsWith.enabled = (typeof validator_list[item2].endsWith === "string");
                if (validator_timezone.endsWith.enabled) {
                    validator_timezone.endsWith.result = list[item].endsWith(validator_list[item2].endsWith);
                };

                // RegExp
                validator_timezone.regexp = {};
                validator_timezone.regexp.enabled = objType(validator_list[item2].regexp, 'regexp');
                if (validator_timezone.regexp.enabled) {
                    validator_timezone.regexp.result = list[item].match(validator_list[item2].regexp);
                };

                // Check Validator
                let allowed_timezone = true;
                for (const item3 in validator_timezone) {
                    if (validator_timezone[item3].enabled) {

                        // Invalid Result
                        if (!validator_timezone[item3].result) {
                            allowed_timezone = false;
                        }

                    }
                }

                // Start With
                if (allowed_timezone) {
                    result.push(validator_list[item2]);
                    break;
                }

            }

        }
    }

    // Result
    return result;

};