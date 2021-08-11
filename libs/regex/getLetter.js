// https://stackoverflow.com/questions/3617797/regex-to-match-only-letters
module.exports = {

    // Use a character set: [a-zA-Z] matches one letter from A–Z in lowercase and uppercase.
    'oneLetter': function(type = 'g') { return new RegExp('[a-zA-Z]', type); },

    // [a-zA-Z]+ matches one or more letters
    'multiLetters': function(type = 'g') { return new RegExp('[a-zA-Z]+', type); },

    // ^[a-zA-Z]+$ matches only strings that consist of one or more letters only
    'oneLetter': function(type = 'g') { return new RegExp('^[a-zA-Z]+$', type); }

};