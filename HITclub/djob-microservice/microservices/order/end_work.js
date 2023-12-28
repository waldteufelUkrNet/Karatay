var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
let Timeout = require('await-timeout');
var history = require('../../libs/history');
var map = require('../../libs/map');
var push = require('../../libs/push');
var check_lib = require('../../libs/check');
var qiwi_lib = require('../../libs/qiwi');
const moment = require('moment');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});


async function endWork(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let user, executor, customer;

        let gc = await check_lib.getGlobalConfigs();
        let {system_commission, min_cash_balance, referral_program_commissions } = gc;

        if (auth_user.role === "EXECUTOR"){
          user = await api.Executor.findById(auth_user.id);
          executor = user;
        }
        if (auth_user.role === "CUSTOMER"){
          user = await api.Customer.findById(auth_user.id);
          customer = user;
        }

        if (!user.active_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ACTIVE_ORDER',
                data:null
            });

        let order = await api.Order.findById(user.active_order_id);

        if (!order || !order.executor_id || order.status !== 50)
            return response({
                status: "ERROR",
                error: 'ORDER_STATUS_ERROR',
                data:null
            });

        let order_user;
        if (auth_user.role === "EXECUTOR"){
          order_user = await api.Customer.findById(order.customer_id);
          customer = order_user;
        }
        if (auth_user.role === "CUSTOMER"){
          order_user = await api.Executor.findById(order.executor_id);
          executor = order_user;
        }

        order.summ = await check_lib.getCashSumm(order);
        order.status = 90;
        order.end_work_time= new Date();

        // TODO начисления коммисии рефералам и сохранения в истории
        if(customer.referral_id) {
            let ref_user;
            if(customer.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            let ref_summ = (order.summ * referral_program_commissions) / 100;
            ref_user.bonus_balance = ref_user.bonus_balance + ref_summ;
            ref_user.referral_balance = ref_user.referral_balance + ref_summ;
            await ref_user.save();

            if(customer.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: ref_summ,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: ref_summ,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }
        if(executor.referral_id) {
            let ref_user;
            if(executor.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(executor.referral_id);
                await push.sendPush("CUSTOMER", ref_user._id, "REFERRAL_BALLANCE_ADDED", {order_id: order._id});
            } else {
                ref_user = await api.Executor.findById(executor.referral_id);
                await push.sendPush("EXECUTOR", ref_user._id, "REFERRAL_BALLANCE_ADDED", {order_id: order._id});
            }

            let ref_summ = (order.summ * referral_program_commissions) / 100;
            ref_user.bonus_balance = ref_user.bonus_balance + ref_summ;
            ref_user.referral_balance = ref_user.referral_balance + ref_summ;
            await ref_user.save();

            if(executor.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: ref_summ,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: ref_summ,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }

        await order.save();

        if(order.payment_type === "CASH"){

            await push.sendPush("CUSTOMER", order.customer_id, "WORK_DONE", {
                executor_name: user.name,
                order_id: order._id
            });
            await push.sendPush("EXECUTOR", order.executor_id, "WORK_DONE", {
                order_id: order._id
            });

        }

        amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});

        if (auth_user.role === "EXECUTOR")
            await history.add(order._id, 90, "Исполнитель инициировал окончание работы. Происходит оплата.");
        else
            await history.add(order._id, 90, "Клиент инициировал окончание работы. Происходит оплата.");

        let check = await check_lib.makeCheck(order);

        if(order.payment_type === "CASH"){
          await Timeout.set(1000);
          order.status = 100;
          order.finishedAt = new Date();
          await order.save();

          await history.add(order._id,  100, "Оплата произведена наличным расчетом. Заказ закрыт.");

          amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
          amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});

          let order_executor_commission = Math.round(parseFloat(order.summ.toString())*system_commission/100);

          executor.bonus_balance = parseInt(executor.bonus_balance) - order_executor_commission;
          if(parseInt(executor.bonus_balance)<0){
            executor.balance = parseInt(executor.balance) + parseInt(executor.bonus_balance);
            executor.bonus_balance = 0;
          }
          //executor.balance = executor.balance - order_executor_commission;

          if(!executor.orders_count)
                executor.orders_count = 0;
            executor.orders_count = executor.orders_count +1;

          await executor.save();

          await api.ExecutorFinancialHistory.create({
              executor_id: executor._id,
              type: 'ORDER',
              balance_type: 'BALANCE',
              summ: order_executor_commission,
              order_id: order._id,
              date: moment().format('YYYY-MM-DD HH:mm:ss')
          });

          if(executor.balance < min_cash_balance ){
            executor.status =0;
            await executor.save();
            amqpLib.sendSocketMessage("STATUS_CHANGED", "EXECUTOR", order.executor_id, {status:0});
            await push.sendPush("EXECUTOR", order.executor_id, "CASH_BALANCE_TOO_LOW", {order_id: order._id});
            }




        } else if(order.payment_type === "CARD"){

            //- Начисляем комиссию за реферала клиента (1%): 6,75 руб
            if(customer.referral_id){
                let referal_user = await api.ReferralUser.findOne({where:{id: customer.referral_id }});
                referal_user.balance = referal_user.balance + check.customer_referral_comission;
                await referal_user.save();
            }
            //- Начисляем комиссию за реферала исполнителя (1%): 6,75 руб
            if(executor.referral_id){
                let referal_user = await api.ReferralUser.findOne({where:{id: executor.referral_id }});
                referal_user.balance = referal_user.balance + check.executor_referral_comission;
                await referal_user.save();
            }

            //+ Акцептируем безопасную сделку Киви
            await qiwi_lib.confirm(order.id);

            // + Начислить на бонусный счет за “Бесплатные часы”: 75 руб.
            //+ Начислить на бонусный счет скидку клиента по бонусной программе (5%) 30руб.
            //+ Начислить на бонусный счет дополнительный заработок исполнителя по бонусной программе (5%) 30руб.
            let executor_final_bonus_balance = parseFloat(executor.bonus_balance) +  parseFloat(check.order_check.customer_discount) + parseFloat(check.order_check.executor_extra_payment);

            executor.bonus_balance = executor_final_bonus_balance;
            await executor.save();

            order.status = 100;
            order.finishedAt = new Date();
            await order.save();


            await history.add(order.id, 100, "Оплата произведена безналичным расчетом. Заказ закрыт.");
            // await check_lib.sendOrderSocketMessage(order, "ORDER_CHANGED", {order, message:"STATUS_CHANGED", check});
            amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
            amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});

            await push.sendPush("CUSTOMER", order.customer_id, "ORDER_DONE", {type:order.payment_type, summ:order.summ});
            await push.sendPush("EXECUTOR", order.executor_id, "ORDER_DONE", {type:"Ваш заработок (отправлен на QIWI кошелек)", summ: check.order_check.full_executor_paymen });
            await push.sendPush("EXECUTOR", order.executor_id, "FREE_TEXT", {title:"Заказ закрыт", body: "Заказ закрыт ( Ваш заработок (отправлен на QIWI кошелек): "+check.order_check.full_executor_paymen+"руб)" });
        }
        else if (order.payment_type === "BONUS") {

            await Timeout.set(1000);
            //Списываем с клиента х рублей с бонусного счета.

            customer.bonus_balance = customer.bonus_balance - check.order_check.customer_final_payment_amount;
            customer.save();

            //+ Начислить на бонусный счет скидку клиента по бонусной программе (5%)
            //+ Начислить на бонусный счет дополнительный заработок исполнителя по бонусной программе (5%)
            let executor_final_bonus_balance = parseFloat('' + executor.bonus_balance) + parseFloat('' + check.order_check.customer_discount) + parseFloat('' + check.order_check.executor_extra_payment);
            //-+ Начисляем “Вознаграждение исполнителя” на бонусный счет
            executor_final_bonus_balance = executor_final_bonus_balance + parseFloat('' + check.order_check.full_executor_payment);

            if(!executor.orders_count)
                executor.orders_count = 0;
            executor.orders_count = executor.orders_count +1;

            executor.bonus_balance = executor_final_bonus_balance;
            executor.save();

            order.status = 100;
            order.finishedAt = new Date();
            order.save();

            await history.add(order._id,  100, "Оплата произведена расчетом за бонусы. Заказ закрыт.");


            amqpLib.sendSocketMessage("ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});
            amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});

        }

        push.sendPush("CUSTOMER", order.customer_id, "WORK_DONE", {type:order.payment_type,order_id: order._id, summ:order.summ});
        push.sendPush("EXECUTOR", order.executor_id, "WORK_DONE", {type:order.payment_type,order_id: order._id, summ:order.summ});
     
        return response({
            status: "OK",
            error:null,
            data: {}
        });


    });
}


async function confirmEndWork(data) {
    let {auth_user, mark, text, report_type, report_text} = data;

    return new Promise(async (response, reject) => {
        let user, executor, customer;

        let gc = await check_lib.getGlobalConfigs();
        let {system_commission, min_cash_balance } = gc;

        if (auth_user.role === "EXECUTOR"){
          user = await api.Executor.findById(auth_user.id);
          //executor = user;
        }
        if (auth_user.role === "CUSTOMER"){
          user = await api.Customer.findById(auth_user.id);
        //  customer = user;
        }

        if (!user.active_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ACTIVE_ORDER',
                data:null
            });

        let order = await api.Order.findById(user.active_order_id);

        if (!order || !order.executor_id || order.status !== 100)
            return response({
                status: "ERROR",
                error: 'ORDER_STATUS_ERROR',
                data:null
            });

        executor = await api.Executor.findById(order.executor_id);
        customer = await api.Customer.findById(order.customer_id);
        
         if (auth_user.role === "CUSTOMER"){
             customer.active_order_id = null;
             await customer.save();

            let ex_mark = await api.ExecutorMark.create({
                text,
                rate: mark,
                order_id:order._id,
                executor_id: executor._id,
                organization_id: executor.organization_id,
                user
            });

                if(mark)
                {
                    executor.summ_mark = executor.summ_mark + parseInt(mark);
                    executor.marks_count = executor.marks_count + 1;
                    await executor.save();
                }
            }
            else{
             executor.active_order_id = null;
             await executor.save();

            let cu_mark = await api.CustomerMark.create({
                text,
                rate: mark,
                order_id:order._id,
                customer_id: customer._id,
                user
            });

                if(mark)
                {
                    customer.summ_mark = customer.summ_mark + parseInt(mark);
                    customer.marks_count = customer.marks_count + 1;
                    await customer.save();
                }
            }
        

            if(report_type){
                order.cancel_reason = {type:report_type, text: report_text, initiator:auth_user.role };
                await order.save();
            }

        if (auth_user.role === "EXECUTOR")
            await history.add(order._id, 100, "Исполнитель подтвердил окончание работы и успешную оплату");
        else
            await history.add(order._id, 100, "Клиент подтвердил окончание работы и успешную оплату");

        return response({
            status: "OK",
            error:null,
            data: {}
        });

    });
}


var exports = module.exports = {};
exports.endWork = endWork;
exports.confirmEndWork = confirmEndWork;

