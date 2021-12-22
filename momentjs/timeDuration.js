const moment = require('moment');
module.exports = function(timeData = 0, durationType = 'asSeconds', now = null) {

    // Number
    if (typeof timeData === "number") {

        if (!now) { now = moment(); }

        var duration = moment.duration(now.clone().add(timeData, 'milliseconds').diff(now.clone()));
        const result = duration[durationType]();

        // Complete
        return result;

    }

    // Nope
    else { return null; }

};