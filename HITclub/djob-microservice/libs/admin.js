const config = require("../config");
const jwt = require('jsonwebtoken');

function generateJwt(user) {
    let { email } = user;
    let id = user._id;
    let role = user.role ? user.role : null;
    return jwt.sign({ email, id , role}, config.admin_jwt_secret);
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

function checkIfDateValid(d) {
    try{
        var d = new Date(d);
        return (d.getTime() === d.getTime()); //NAN is the only type which is not equal to itself.
    }catch (e){
        return true;
    }

}

var exports = module.exports = {};
exports.jwt = generateJwt;
exports.randomKey = randomKey;
exports.checkIfDateValid = checkIfDateValid;
