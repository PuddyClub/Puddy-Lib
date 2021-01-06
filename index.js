// Modules
module.exports = {

    // HTTP/1.0 Render
    'HTTP/1.0': require('./http/HTTP-1.0'),

    // Check Domain
    'checkDomain': require('./http/check_domain'),

    // Firebase
    'firebase': require('./firebase'),
    'firebaseEscape': require('./firebase/escape'),

    // Get Obj Type
    'getObjType': require('./get/objType'),

    // Count Obj
    'countObj': require('./get/countObj'),

    // Custom Module Loader
    'customModuleManager': require('./libs/custom_module_loader'),

    // For Await
    'forAwait': require('./functions/forAwait')

};