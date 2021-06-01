// Module
const crypto = require('crypto');
const cryptoAction = function(tinyCrypto, text) {

    let iv = crypto.randomBytes(tinyCrypto.IV_LENGTH);
    let cipher = crypto.createCipheriv(tinyCrypto.algorithm, Buffer.from(tinyCrypto.key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString(tinyCrypto.stringType) + ':' + encrypted.toString(tinyCrypto.stringType);

};

// Export
module.exports = function (tinyCrypto, text) {

   // Result
   let result = ''; 

};