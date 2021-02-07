module.exports = function (item, failResult = null) {
    let module = null;
    try { module = require(item); } catch (err) { module = failResult; }
    return module;
};