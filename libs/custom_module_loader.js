// The Module
const custom_module_manager = {};

// Validator
custom_module_manager.validator = function (custom_modules, type) {

    // Validate
    if (
        custom_modules &&
        custom_modules[type] &&
        (Array.isArray(custom_modules[type].custom) || Array.isArray(custom_modules[type].default))
    ) {
        return true;
    }

    // Nope
    else {
        return false;
    }

};

// Run
custom_module_manager.run = async function (custom_modules, db_prepare, hookType) {

    // Run Custom Modules
    const run_custom_module = async function (type) {

        // Prepare List
        let module_list = null;

        // Exist Type
        if (type) {
            if (custom_modules[hookType] && custom_modules[hookType][type]) {
                module_list = custom_modules[hookType][type];
            }
        } else {
            module_list = custom_modules;
        }

        // Read Array
        if (Array.isArray(module_list)) {
            for (const item in module_list) {

                // Is String
                if (typeof module_list[item] === "function") {

                    // Try to Read the Module
                    try {

                        // Run Script
                        await module_list[item](db_prepare, hookType);

                    }

                    // Error
                    catch (err) {
                        console.error(err);
                        console.error(err.message);
                    }

                }

                // Nope
                else {

                    // Prepare Error Message
                    const err = new Error(`The Custom Paypal Module value needs to be a Function!\nArray: ${type}\nIndex: ${item}`);

                    console.error(err);
                    console.error(err.message);

                }

            }
        }

        // Complete
        return;

    };

    // Hook Type
    if (hookType) {

        // Custom Modules
        if (Array.isArray(custom_modules[hookType].custom)) {
            await run_custom_module('custom');
        }

        // Default Modules
        if (Array.isArray(custom_modules[hookType].default)) {
            await run_custom_module('default');
        }

    }

    // Nope
    else {

        // Default Modules
        if (Array.isArray(custom_modules)) {
            await run_custom_module();
        }

    }

    // Complete
    return;

};

// Module Export
module.exports = custom_module_manager;