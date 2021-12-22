const moment = require('moment');
const now = moment();
module.exports = function(timeData = 0, durationType = 'asSeconds') {

    // Number
    if (typeof timeData === "number") {

        var duration = moment.duration(now.clone().add(timeData, 'milliseconds').diff(now));
        const result = duration[durationType]();

        // Complete
        return result;

    }

    // Nope
    else { return null; }

};