function combineRGB(r, g, b) { return (r << 16) | (g << 8) | b; }
module.exports = function (color, debug = false) {

    // Is String
    if (typeof color === "string") {

        // Module
        const optionalModule = require('./module');
        const tinycolor = optionalModule("tinycolor2");

        // Prepare Color
        try {

            // Get Color Manager
            color = tinycolor(color);

            // Validate
            if (color.isValid()) {

                // Convert
                color = color.toRgb();
                color = combineRGB(color.r, color.g, color.b);

            }

            // Nope
            else {
                color = 0;
            }

        }

        // Error
        catch (err) {

            // Debug
            if (debug) {

                // Logger
                let logger = optionalModule('@tinypudding/firebase-lib/logger');
                if (!logger) { logger = console; }
                logger.log(err);
                
            }

            // Result
            color = 0;

        }

    }

    // Fix Color Number
    if (typeof color !== "number" || isNaN(color) || !isFinite(color) < 0) {
        color = 0;
    }

    // Return the Color Value
    return color;

};