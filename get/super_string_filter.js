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
                const tiny_validator = {};

                // Starts With
                tiny_validator.startsWith = {};
                tiny_validator.startsWith.enabled = (typeof validator_list[item2].startsWith === "string");
                if (tiny_validator.startsWith.enabled) {
                    tiny_validator.startsWith.result = list[item].startsWith(validator_list[item2].startsWith);
                };

                // Ends With
                tiny_validator.endsWith = {};
                tiny_validator.endsWith.enabled = (typeof validator_list[item2].endsWith === "string");
                if (tiny_validator.endsWith.enabled) {
                    tiny_validator.endsWith.result = list[item].endsWith(validator_list[item2].endsWith);
                };

                // RegExp
                tiny_validator.regexp = {};
                tiny_validator.regexp.enabled = objType(validator_list[item2].regexp, 'regexp');
                if (tiny_validator.regexp.enabled) {
                    tiny_validator.regexp.result = list[item].match(validator_list[item2].regexp);
                };

                // Check Validator
                let allowed_timezone = true;
                for (const item3 in tiny_validator) {
                    if (tiny_validator[item3].enabled) {

                        // Invalid Result
                        if (!tiny_validator[item3].result) {
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