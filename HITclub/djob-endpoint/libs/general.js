function def(_var) {
    return (_var === undefined || _var === null || _var === false) ? false : _var;
}

function checkArray(_var) {
    return (def(_var) && Array.isArray(_var) && _var.length);
}

function randomKey(len = 7, charSet = null) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

var exports = module.exports = {};
exports.def = def;
exports.checkArray = checkArray;
exports.randomKey = randomKey;