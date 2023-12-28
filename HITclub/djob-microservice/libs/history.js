var api = require('../models/api');

async function add(order_id, status, text){
    var api = require('../models/api');

    await api.OrderHistory.create({order_id, status, text});
    return;
}

var exports = module.exports = {};
exports.add = add;