var amqpClient = require('../libs/amqp');
var api = require('../models/api');
var moment = require('moment');

module.exports.def = (_var) => {
    return (_var === undefined || _var === null || _var === false) ? false : _var;
};

module.exports.checkArray = (_var) => {
    return (def(_var) && Array.isArray(_var) && _var.length);
};

module.exports.randomKey = (len = 7, charSet = null) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
};

module.exports.initGlobalDbConfig = async() => {
    let global_configs = await api.Config.find();

    for (var i = 0; i < global_configs.length; i++){
        global_db_configs[global_configs[i].param] = global_configs[i].value;

        if(['referral_program_commissions', 'system_commission', 'executor_find_counter', 'accept_wait_time', 'min_cash_balance'].indexOf(global_configs[i].param) >= 0)
            global_db_configs[global_configs[i].param] = parseInt(global_db_configs[global_configs[i].param]);
        else if(['qiwi_commission'].indexOf(global_configs[i].param) >= 0)
            global_db_configs[global_configs[i].param] = parseFloat(global_db_configs[global_configs[i].param]);
    }
};

module.exports.runMicroservice = (mcObj, msg) => {
    let msgData = JSON.parse(msg.content.toString());
    let action = msgData.action;
    let data = msgData.data;
    let uniqKey =  data.uniqKey;

    delete data.uniqKey;

    let run_name = 'run';
    if(action){
        run_name += action.charAt(0).toUpperCase() + action.substr(1).toLowerCase();
    }

    mcObj[run_name](data)
        .then(resData => {
            amqpClient.publish("", "Response" + mcObj.mc_name,
                new Buffer(
                    JSON.stringify(
                        {
                            uniqKey: uniqKey,
                            data: resData
                        }
                    )
                )
            );

            mcObj.mc_chanel.ack(msg);
        })
        .catch(reserror => {
            mcObj.mc_chanel.nack(msg);
        });
};

module.exports.formatDate = (input) => {
    return moment(input).format('YYYY-MM-DD HH:mm');
};