// Module
const crypto = require('crypto');
const cryptoAction = function(tinyCrypto, text) {

    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), tinyCrypto.stringType);
    let encryptedText = Buffer.from(textParts.join(':'), tinyCrypto.stringType);
    let decipher = crypto.createDecipheriv(tinyCrypto.algorithm, Buffer.from(tinyCrypto.key), iv);
    let decrypted = decipher.update(encryptedText);
   
    decrypted = Buffer.concat([decrypted, decipher.final()]);
   
    return decrypted.toString();

}

// Export
module.exports = function (tinyCrypto, text) {

    // Result
    let result = ''; 
 
 };