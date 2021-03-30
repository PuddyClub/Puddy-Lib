// Modules
module.exports = {

    // HTTP/1.0 Render
    'HTTP/1.0': require('./http/HTTP-1.0'),

    // Get Module
    'getModule': require('./get/module'),

    // Check Domain
    'checkDomain': require('./http/check_domain'),

    // Get Obj Type
    'getObjType': require('./get/objType'),

    // Count Obj
    'countObj': require('./get/countObj'),

    // HTTP Auth Generator
    'httpAuth': require('./http/auth'),

    // Replace Async
    'replaceAsync': require('./libs/replaceAsync'),

    // User IP
    'getUserIP': require('./http/userIP'),

    // Super string Filter
    'superStringFilter': require('./get/super_string_filter'),

    // Custom Module Loader
    'customModuleManager': require('./libs/custom_module_loader'),

    // Errors Callback
    'errorsCallback': require('./http/errorsCallback'),

    // Domain Validator
    'domainValidator': require('./http/domainValidator'),

    // Crypto
    'crypto': require('./crypto'),

    // Pagination
    'pagination': require('./get/pagination'),

    // Get Domain URL
    'getDomainURL': require('./http/getDomainURL'),

    // Dice
    'dice': require('./libs/dice'),

    // User Level
    'userLevel': require('./libs/userLevel'),

    // Get URL Parameter 
    'getQueryUrlByName': require('./get/queryUrlByName'),
    'getQueryUrlJSON': require('./get/queryUrlJSON'),

    // Get Decimal Color
    'getDecimalColor': require('./get/decimalColor'),

    // Percentage
    'percentage': require('./libs/percentage'),

    // Version Check
    'versionCheck': require('./get/versionCheck'),

    // Socket IO
    'socketIO': require('./get/socket.io'),
    
    // Fetch
    'fetchJSON': require('./http/fetch/json'),
    'fetchText': require('./http/fetch/text')

};