var mongoose = require('mongoose');
var api = require('../../models/api');
var qiwi = require('../../libs/qiwi');

async function qiwiWPF(data) {
    return new Promise(async (response, reject) => {

        console.log('---------------------------------------------');
        console.log(JSON.stringify(data));
        console.log('---------------------------------------------');

        if(!data.cf2 || (parseInt(data.txn_status) != 4 && parseInt(data.txn_status) != 3) || !data.card_token)
            return response({
                status: "OK",
                error: null,
                data: {

                }
            });


        if(parseInt(data.txn_type) === 1 && data.cf4 === 'CUSTOMER'){
            let customer = await api.Customer.findById(data.cf2);

            if(!customer)
                return response({
                    status: "OK",
                    error: null,
                    data: {

                    }
                });


            let exist = await api.Card.findOne({
                user_id: customer.id,
                user_type: 'CUSTOMER',
                number: data.pan
            });
            if(!exist){
                let card = {
                    user_id: customer.id,
                    user_type: 'CUSTOMER',
                    number: data.pan,
                    token: data.card_token,
                    token_expire: data.card_token_expire,
                    default_card: 0,
                    active: 1
                };

                await api.Card.create(card);
                let refund = await qiwi.refundWPF(data.txn_id);
            }
        }
        if(parseInt(data.txn_type) === 1 && data.cf4 === 'EXECUTOR'){
            let executor = await api.Executor.findById(data.cf2);

            if(!executor)
                return response({
                    status: "OK",
                    error: null,
                    data: {

                    }
                });


            let exist = await api.Card.findOne({
                user_id: executor.id,
                user_type: 'EXECUTOR',
                number: data.pan
            });
            if(!exist){
                let __cards = await api.Card.find({
                    user_id: executor.id,
                    user_type: 'EXECUTOR',
                });

                if(__cards.length){
                    for(let i=0;i<__cards.length;i++){
                        await api.Card.deleteOne({ _id: __cards[i]._id });
                    }
                }

                let card = {
                    user_id: executor.id,
                    user_type: 'EXECUTOR',
                    number: data.pan,
                    token: data.card_token,
                    token_expire: data.card_token_expire,
                    default_card: 0,
                    active: 1
                };

                let newcard = await api.Card.create(card);
                executor.active_card_id = mongoose.Types.ObjectId(newcard._id);
                await executor.save();
                let refund = await qiwi.refundWPF(data.txn_id);
            }
        }
        response({
            status: "OK",
            error: null,
            data: {

            }
        });
    });
}

async function qiwiRefill(data) {
    return new Promise(async (response, reject) => {

        console.log('-------------------Refill Start Data-------------------------');
        console.log(JSON.stringify(data));
        console.log('--------------------Refill End Data--------------------------');

        if(!data.cf2 || (parseInt(data.txn_status) != 4 && parseInt(data.txn_status) != 3) || !data.card_token)
            return response({
                status: "OK",
                error: null,
                data: {

                }
            });


        if(parseInt(data.txn_type) === 1 && data.cf4 === 'CUSTOMER'){
            let customer = await api.Customer.findById(data.cf2);

            if(!customer)
                return response({
                    status: "OK",
                    error: null,
                    data: {

                    }
                });

            customer.balance = parseFloat(customer.balance) +  parseFloat(data.amount);
            customer.save();

            await api.CustomerFinancialHistory.create({
                customer_id: customer._id,
                type: 'REFILL',
                balance_type: 'BALANCE',
                summ: data.amount,
                info: '',
                date: new Date(),
                after_balance: customer.balance
            });
        }
        if(parseInt(data.txn_type) === 1 && data.cf4 === 'EXECUTOR'){
            let executor = await api.Executor.findById(data.cf2);

            if(!executor)
                return response({
                    status: "OK",
                    error: null,
                    data: {

                    }
                });

            executor.balance = parseFloat(executor.balance) +  parseFloat(data.amount);
            executor.save();

            await api.ExecutorFinancialHistory.create({
                executor_id: executor._id,
                type: 'REFILL',
                balance_type: 'BALANCE',
                summ: data.amount,
                info: '',
                date: new Date(),
                after_balance: executor.balance
            });
        }
        response({
            status: "OK",
            error: null,
            data: {

            }
        });
    });
}

async function qiwiHolding(data) {
    return new Promise(async (response, reject) => {

        console.log('QIWI HOLDING: ', data);
        if(!data.txn_id)
            return response({
                status: "OK",
                error: null,
                data: {}
            });

        let order = await api.Order.findById(data.cf2);
        if(!order)
            return response({
                status: "OK",
                error: null,
                data: {}
            });

        if(parseInt(data.txn_type) === 4 && parseInt(data.txn_status) === 3){
            let payments = await api.Payments.find({qiwi_order_id: data.order_id});

            console.log('payment to update: ', payments);

            if(payments && payments.length){
                for(let i=0;i<payments.length;i++){
                    payments[i].status = 2;
                    await payments[i].save();
                }
            }
        }

        if(parseInt(data.txn_type) === 2){
            if(parseInt(data.txn_status) === 2){
                let card = await api.Card.findOne({
                    user_id: order.customer_id,
                    user_type: 'CUSTOMER',
                    token: data.card_token
                });

                let payment = {
                    order_id: order.id,
                    user_id: order.customer_id,
                    user_type: 'CUSTOMER',
                    qiwi_txn_id: data.txn_id,
                    qiwi_order_id: data.order_id,
                    amount: data.amount,
                    commission: data.cf3.split(';')[1],
                    type: 'ORDER_PAYMENT',
                    status: 0,
                    card_id: card.id
                };

                await api.Payments.create(payment);
            } else if(parseInt(data.txn_status) === 3){
                let payment = await api.Payments.findOne({qiwi_txn_id: data.txn_id});

                let config = await api.Config.findOne({
                        param: 'referral_program_commissions'
                    });

                let order = await api.Order.aggregate([
                    {$lookup:
                            {
                                from: 'customers',
                                localField: "customer_id",
                                foreignField: "_id",
                                as: "customer"
                            }
                    },
                    {$lookup:
                            {
                                from: 'executors',
                                localField: "executor_id",
                                foreignField: "_id",
                                as: "executor"
                            }
                    },
                    { $match : {_id: payment.order_id} }
                ]);

                order = order[0];

                if(order){
                    let amount_referral = ((parseFloat(payment.amount) * parseInt(config.value)) / 100).toFixed(2);
                    if(order.customer && order.customer.referral_id){
                        await api.ReferralProfit.create({
                            referral_id: order.customer.referral_id,
                            user_id: order.customer.id,
                            user_type: 'CUSTOMER',
                            order_id: order.id,
                            amount: amount_referral,
                        });
                        let refUser = await api.ReferralUser.findOne({id: order.customer.referral_id});
                        await refUser.update({
                            balance: parseFloat(refUser.balance) + parseFloat(amount_referral)
                        });
                    }
                    if(order.executor && order.executor.referral_id){
                        await api.ReferralProfit.create({
                            referral_id: order.executor.referral_id,
                            user_id: order.executor.id,
                            user_type: 'EXECUTOR',
                            order_id: order.id,
                            amount: amount_referral,
                        });
                        let refUser = await api.ReferralUser.findOne({id: order.executor.referral_id});
                        await refUser.update({
                            balance: parseFloat(refUser.balance) + parseFloat(amount_referral)
                        });
                    }

                    payment.status = 1;

                    await payment.save();
                }
            }

        }

        return response({
            status: "OK",
            error: null,
            data: {}
        });
    });
}

async function qiwiPayout(data) {
    return new Promise(async (response, reject) => {

        console.log('QIWI PAYOUT: ', data);

        return response({
            status: "OK",
            error: null,
            data: {}
        });
    });
}

var exports = module.exports = {
    qiwiWPF,
    qiwiHolding,
    qiwiPayout,
    qiwiRefill
};

