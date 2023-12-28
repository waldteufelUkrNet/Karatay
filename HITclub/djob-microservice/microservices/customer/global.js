var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});
var moment = require('moment');

async function getCustomerMarks(data) {
    let {customer_id} = data;

    return new Promise(async (response, reject) => {

        let customer = await api.Customer.findById(customer_id);

        let marks = [];

          marks = await api.CustomerMark.find({
            customer_id: mongoose.Types.ObjectId( customer_id )
          }).sort({'createdAt': 'desc'});

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('MARK',marks)
        });
    });
}

var exports = module.exports = {};
exports.getCustomerMarks = getCustomerMarks;
