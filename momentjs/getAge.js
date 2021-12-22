const moment = require('moment');
module.exports = function(timeData = 0, now = null) {

    // Number
    if (typeof timeData !== 'undefined') {

        if (!now) { now = moment(); }

        const birthday = moment(timeData);
        const age = Math.abs(birthday.diff(now, 'years'));
        return age;

    }

    // Nope
    else { return null; }

};