var mongoose = require('mongoose');
const config = require('../config');
var api = require('../models/api');
const moment = require('moment');
let Timeout = require('await-timeout');
var historyLib = require('./history');
var pushLib = require('./push');
var qiwiLib = require('./qiwi');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

// Рассылка всем пользователям ( клиент + исполнитель) заказа
async function sendOrderSocketMessage(order, alert, message) {
    amqpLib.sendSocketMessage(alert, "EXECUTOR", order.executor_id, {order: await api.Serialize('ORDER',order)});
    if (order.executor_id)
        amqpLib.sendSocketMessage(alert, 'EXECUTOR', order.executor_id, message);
    amqpLib.sendSocketMessage(alert, 'CUSTOMER', order.customer_id, message);
    return true;
}

async function autocompleteOrderWork(order) {
    console.log('autocompleteOrderWork 001: ', 1);


    let executor = await api.Executor.findById(order.executor_id);
    let customer = await api.Customer.findById(order.customer_id);


    order.summ = await getCashSumm(order);
    order.status = 90;
    order.end_work_time = new Date();


    let duration = moment.duration(moment(order.start_work_time).diff(moment())).asMinutes();
    if (duration < 0)
        duration = -1 * duration;

    order.duration = duration;
    await order.save();

    if (order.payment_type === "CARD") {
        console.log('autocompleteOrderWork 002: ', 2);
        await historyLib.add(order._id, 90, "Сервер инициировал окончание работы из-за недостатка средств на банковском счету клиента для продолжения работы. Происходит оплата.");
    } else
    if (order.payment_type === "BONUS") {
        await historyLib.add(order._id, 90, "Сервер инициировал окончание работы из-за недостатка средств на бонусном счету клиента для продолжения работы. Происходит оплата.");
    }


    let check = await makeCheck(order, true);
    order.check = check;
    await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED"});
    // Через секунду закрываем заказ

//ОПЛАТА
    if (order.payment_type === "CASH") {
        await Timeout.set(1000);

        order.status = 100;
        order.finishedAt = new Date();
        order.save();

        await historyLib.add(order._id, 100, "Оплата произведена наличным расчетом. Заказ закрыт.");
        await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED", check});


        await pushLib.sendPush("CUSTOMER", order.customer_id, "ORDER_DONE", {type: order.payment_type, summ: order.summ});
        await pushLib.sendPush("EXECUTOR", order.executor_id, "ORDER_DONE", {
            type: "Удержано комиссия",
            summ: check.order_check.app_commission
        });
        await pushLib.sendPush("EXECUTOR", order.executor_id, "FREE_TEXT", {
            title: "Заказ закрыт",
            body: "Заказ закрыт (Удержано комиссия: " + check.order_check.app_commission + "руб)"
        });

        // начисления процентов рефералам
        if(customer.referral_id) {
            let ref_user;
            if(customer.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            ref_user.referral_balance = ref_user.referral_balance + check.customer_referral_comission;
            await ref_user.save();

            if(customer.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: check.customer_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: check.customer_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }
        if(executor.referral_id) {
            let ref_user;
            if(executor.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            ref_user.referral_balance = ref_user.referral_balance + check.executor_referral_comission;
            await ref_user.save();

            if(executor.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: check.executor_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: check.executor_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }

        //+ Начислить на бонусный счет скидку клиента по бонусной программе (5%) 30руб.
        //+ Начислить на бонусный счет дополнительный заработок исполнителя по бонусной программе (5%) 30руб.
        let executor_final_bonus_balance = executor.bonus_balance + check.order_check.customer_discount + check.order_check.executor_extra_payment;
        //- Удержать с исполнителя комиссию.
        executor_final_bonus_balance = executor_final_bonus_balance - check.order_check.app_commission;
        //Удержание комиссии должно быть сперва с бонусного счета и остаток с реального.
        if (executor_final_bonus_balance < 0) {
            let new_balance_value = executor.balance + executor_final_bonus_balance;
            executor.bonus_balance = 0;
            executor.balance = new_balance_value;
            await executor.save();
        } else {
            executor.bonus_balance = executor_final_bonus_balance;
            executor.save();
        }

        // переводима исполнителя в статус "не активен" из-за недостатка средств на счете для выполнения следующих заказов
        let {min_cash_balance } = await getGlobalConfigs();

        if (executor.balance < min_cash_balance) {
            executor.status = 0;
            executor.save();

            sendOrderSocketMessage(order, "STATUS_CHANGED", {status: 0});
            await pushLib.sendPush("EXECUTOR", executor.id, "CASH_BALANCE_TOO_LOW", {});
        }
    }

    else if (order.payment_type === "CARD") {
        console.log('autocompleteOrderWork 003: ', 3);
        //- Начисляем комиссию за реферала клиента (1%):
        // начисления процентов рефералам
        if(customer.referral_id) {
            let ref_user;
            if(customer.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            ref_user.referral_balance = ref_user.referral_balance + check.customer_referral_comission;
            await ref_user.save();

            if(customer.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: check.customer_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: check.customer_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }
        if(executor.referral_id) {
            let ref_user;
            if(executor.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            ref_user.referral_balance = ref_user.referral_balance + check.executor_referral_comission;
            await ref_user.save();

            if(executor.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: check.executor_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: check.executor_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }
        //+ Акцептируем безопасную сделку Киви
        await qiwiLib.confirm(order._id);

        // + Начислить на бонусный счет за “Бесплатные часы”: 75 руб.
        //+ Начислить на бонусный счет скидку клиента по бонусной программе (5%) 30руб.
        //+ Начислить на бонусный счет дополнительный заработок исполнителя по бонусной программе (5%) 30руб.
        let executor_final_bonus_balance = executor.bonus_balance + check.order_check.customer_discount + check.order_check.executor_extra_payment;

        executor.bonus_balance = executor_final_bonus_balance;
        await executor.save();

        order.status = 100;
        order.finishedAt = new Date();
        await order.save();

        await historyLib.add(order._id, 100, "Оплата произведена безналичным расчетом. Заказ закрыт.");
        // await sendOrderSocketMessage(order, "ORDER_CHANGED", {order, message: "STATUS_CHANGED", check});
        await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED", check});


        pushLib.sendPush("CUSTOMER", order.customer_id, "ORDER_DONE", {type: order.payment_type, summ: order.summ});
        pushLib.sendPush("EXECUTOR", order.executor_id, "ORDER_DONE", {
            type: "Ваш заработок (отправлен на QIWI кошелек)",
            summ: check.order_check.full_executor_paymen
        });
        pushLib.sendPush("EXECUTOR", order.executor_id, "FREE_TEXT", {
            title: "Заказ закрыт",
            body: "Заказ закрыт ( Ваш заработок (отправлен на QIWI кошелек): " + check.order_check.full_executor_paymen + "руб)"
        });

    }

    else if (order.payment_type === "BONUS") {

        await Timeout.set(1000);
        //Списываем с клиента х рублей с бонусного счета.

        customer.bonus_balance = customer.bonus_balance - check.order_check.customer_final_payment_amount;
        customer.save();

        // начисления процентов рефералам
        if(customer.referral_id) {
            let ref_user;
            if(customer.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            ref_user.referral_balance = ref_user.referral_balance + check.customer_referral_comission;
            await ref_user.save();

            if(customer.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: check.customer_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: customer._id,
                    user_type: 'CUSTOMER',
                    summ: check.customer_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }
        if(executor.referral_id) {
            let ref_user;
            if(executor.referral_type === 'CUSTOMER'){
                ref_user = await api.Customer.findById(customer.referral_id);
            } else {
                ref_user = await api.Executor.findById(customer.referral_id);
            }

            ref_user.referral_balance = ref_user.referral_balance + check.executor_referral_comission;
            await ref_user.save();

            if(executor.referral_type === 'CUSTOMER'){
                await api.CustomerReferralHistory.create({
                    customer_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: check.executor_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            } else {
                await api.ExecutorReferralHistory.create({
                    executor_id: ref_user._id,
                    order_id: order._id,
                    user_id: executor._id,
                    user_type: 'EXECUTOR',
                    summ: check.executor_referral_comission,
                    date: moment().format('YYYY-MM-DD HH:mm:ss')
                });
            }
        }

        //+ Начислить на бонусный счет скидку клиента по бонусной программе (5%)
        //+ Начислить на бонусный счет дополнительный заработок исполнителя по бонусной программе (5%)
        let executor_final_bonus_balance = executor.bonus_balance + check.order_check.customer_discount + check.order_check.executor_extra_payment;
        //-+ Начисляем “Вознаграждение исполнителя” на бонусный счет
        executor_final_bonus_balance = executor_final_bonus_balance + check.order_check.full_executor_payment;

        executor.bonus_balance = executor_final_bonus_balance;
        executor.save();

        order.status = 100;
        order.finishedAt = new Date();
        order.save();

        await historyLib.add(order._id, 100, "Оплата произведена бонусным расчетом. Заказ закрыт.");
        // await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED"});
        await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED", check});


        await pushLib.sendPush("CUSTOMER", order.customer_id, "ORDER_DONE", {type: order.payment_type, summ: order.summ});
        await pushLib.sendPush("EXECUTOR", order.executor_id, "ORDER_DONE", {
            type: "Начислено бонусами",
            summ: check.order_check.full_executor_payment + check.order_check.customer_discount + check.order_check.executor_extra_payment
        });
        await pushLib.sendPush("EXECUTOR", order.executor_id, "FREE_TEXT", {
            title: "Заказ закрыт",
            body: "Заказ закрыт ( Начислено бонусами: " + check.order_check.full_executor_payment + check.order_check.customer_discount + check.order_check.executor_extra_payment + "руб)"
        });

    }

    executor.success_orders_number = executor.success_orders_number + 1;
    executor.save();
}

async function getCashSumm(order){
    let end_work_time_moment;
    if(order.end_work_time)
        end_work_time_moment = moment(order.end_work_time);
    else
        end_work_time_moment = moment();

    var duration = moment.duration(moment(order.start_work_time).diff(end_work_time_moment));
    var minutes = duration.asMinutes();
    if(minutes<0)
        minutes= -1*minutes;

    let price = order.price;

    if(order.summ_type==="HOURLY"){
        let used_hours = order.minimal_hours || 1;
        if( Math.ceil(minutes/60) >= used_hours)
            used_hours = Math.ceil(minutes/60);

        return price * used_hours;
    }
    else {
        return price;
    }

}

//получение АКТУАЛЬНЫХ конфигов
async function getGlobalConfigs() {
    // console.log('!!!!!!!!!!!!!!', api);
let global_configs = await api.Config.find();
let resp = {};
  for (var i = 0; i < global_configs.length; i++){
      resp[global_configs[i].param] = global_configs[i].value;

      if(['referral_program_commissions','for_now_order_find_executor_timeout_seconds',
      'for_later_order_find_executor_timeout_seconds',
       'system_commission', 'executor_find_counter', 'accept_wait_time',
        'min_cash_balance'].indexOf(global_configs[i].param) >= 0)
          resp[global_configs[i].param] = parseInt(resp[global_configs[i].param]);
      else if(['qiwi_commission'].indexOf(global_configs[i].param) >= 0)
          resp[global_configs[i].param] = parseFloat(resp[global_configs[i].param]);
  }

return resp;
}


// создает "чек" для текущего состоняния заказ
async function makeCheck(order, autocomplete = false) {
    let duration;

    // заказ закончен успешно
    if(order.start_work_time && order.end_work_time){
        duration = parseInt(moment.duration(moment(order.start_work_time).diff(moment(order.end_work_time))).asMinutes());
        if(duration<0)
            duration = -1 *duration;
    }

    // заказ в процессе выполнения
    else if(order.start_work_time){
        duration = parseInt(moment.duration(moment(order.start_work_time).diff(moment())).asMinutes());
        if(duration<0)
            duration = -1 *duration;
    }

    // подсчитываем количество полных часов и соответсвующую сумму
    let hours = duration ? Math.floor(duration/60) : 0;
    hours += 1;
        //системная комиссия, комиссия реферальной программы, комиссия киви
        let gc = await getGlobalConfigs();
        console.log("gc ",gc)
    let {system_commission, referral_program_commissions, qiwi_commission } = gc;

    let full_price;

    if(order.summ_type==="HOURLY"){
        if(autocomplete && order.payment_type === "BONUS"){
            hours -= 1;
        }
        full_price = hours * order.price;
    } else {
        full_price = order.price;
        if(autocomplete && order.payment_type === "BONUS"){
            full_price = 0;
        }
    }

    let customer_referral_comission = parseFloat(full_price * referral_program_commissions / 100).toFixed(2);
    let executor_referral_comission = parseFloat(full_price * referral_program_commissions / 100).toFixed(2);

    // полная стоимость заказа ( к выплате )
    let payfor_full_price = full_price;
    //  Начислено за выполнение заказа исполнителю
    let full_executor_payment = parseFloat (payfor_full_price * (100-system_commission)/100);

    let customer_discount_percent = 0;

    let bonus = await api.CustomerDiscount.find({
        customer_id: order.customer_id,
        expiration: {"$gte": moment().add(1, 'hours').toDate()}
    });


    if (bonus && bonus.length) {
        customer_discount_percent = parseFloat(bonus[0].discount);
        for(let i=0;i<bonus.length;i++){
            if(parseFloat(bonus[i].discount) > customer_discount_percent){
                customer_discount_percent = parseFloat(bonus[i].discount);
            }
        }
    }
    // скидка (дисконт) заказчика
    let customer_discount = parseFloat(payfor_full_price * customer_discount_percent / 100).toFixed(2);

    // доп. оплата (дисконт) исполнителя
    let executor_extra_payment_percent = 0;
    bonus = await api.ExecutorDiscount.find({
        executor_id: order.executor_id,
        expiration: {"$gte": moment().add(1, 'hours').toDate()}
    });

    if (bonus && bonus.length) {
        executor_extra_payment_percent = parseFloat(bonus[0].discount);
        for(let i=0;i<bonus.length;i++){
            if(parseFloat(bonus[i].discount) > executor_extra_payment_percent){
                executor_extra_payment_percent = parseFloat(bonus[i].discount);
            }
        }
    }


    let executor_extra_payment = parseFloat(payfor_full_price * executor_extra_payment_percent / 100).toFixed(2);

    // полная стоимость заказа ( к выплате )
    payfor_full_price = parseFloat(parseFloat(full_price.toString()) - customer_discount);
    let customer_final_payment_amount = parseFloat(full_price - customer_discount);
    let qiwi_comission_amount = parseFloat(qiwi_commission * customer_final_payment_amount / 100 ).toFixed(2);
    let app_commission = parseFloat(customer_final_payment_amount - full_executor_payment).toFixed(2);

    app_commission = parseFloat(app_commission);
    customer_referral_comission = parseFloat(customer_referral_comission);
    executor_referral_comission = parseFloat(executor_referral_comission);
    customer_discount = parseFloat(customer_discount);
    executor_extra_payment = parseFloat(executor_extra_payment);
    qiwi_comission_amount = parseFloat(qiwi_comission_amount);


    return {
        order_check:{
            full_price: parseFloat(full_price.toString()), //Общая стоимость // Общая стоимость
            app_commission,//Комиссия системы  // Комиссия системы %
            customer_referral_comission, //Комиссия за реферала за клиента // Комиссия реферала (клиент)
            executor_referral_comission,//Комиссия за реферала за исполнителя // Комиссия реферала (исполнитель)
            payfor_full_price,//Стоимость заказа (из первого расчета) // Общая стоимость
            full_executor_payment,//Вознаграждение исполнителя // Вознаграждение исполнителя деньгами
            customer_discount,//Скидка клиента по бонусной программе
            executor_extra_payment,//Дополнительный заработок исполнителя по бонусной программе
            customer_final_payment_amount,//Удержано с пользователя (как в чеке для клиента)// К ОПЛАТЕ
            qiwi_comission_amount,//Комиссия которую удержит Киви (рассчитываем из фактически оплаченных денег клиентом)
        },
        order_configs: {
            system_commission,
            referral_program_commissions,
            qiwi_commission,
            customer_discount_percent,
            executor_extra_payment_percent
        },
        customer_check: {
            full_price: parseFloat(full_price.toString()),
            customer_discount,
            customer_final_payment_amount
        },
        executor_check: {
            full_price: parseFloat(full_price.toString()),
            customer_discount,
            customer_final_payment_amount,
            executor_extra_payment
        }
    };
}

async function updateCheck(order_id, first_update = false) {
    let order = await api.Order.findOne({
        _id: order_id,
        status: { $gte: 50, $lte: 89 }
    });

    console.log('updateCheck 000: ', order, first_update);

    console.log("updCheck order find");
    // если заказ с таким ИД и статусом "в работе" отсутвтует - значит он закрыт. Так или иначе, мы перетсаем отправлять чеки по соккетам
    if (!order)
        return;

        console.log("updCheck order found");
    let check = await makeCheck(order);
    console.log("updCheck order check ", check);
    // связываем полученный чек с заказом
    order.check = check;
    await order.save();

    // если наличка - просто повторяем проверку чека через час
    if (order.payment_type === "CASH") {
        sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED"});

        console.log("updCheck sending next tick")
        amqpLib.sendMSTask({
              action:"order_update_check",
              user: null,
              worker_pid: 0,
              key: "none",
              data: {
                order_id: order._id,
                start_time: moment().unix()
              }
        })
        return;
        /*amqpLib.sendNextTick({
            order_id: order._id
        })*/
        //TODO call microservice
    }
        // если бонусный счет - проверяем платежеспособность с учетом следующего часа.
        // Если успех - повторяем функцию через час - иначе отменяем заказ в текущем состоянии
    else if (order.payment_type === "BONUS") {
        let customer = await api.Customer.findById(order.customer_id);

        if (parseFloat(customer.bonus_balance) >= parseFloat(check.order_check.full_executor_payment)) {
            sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED"});

            amqpLib.sendMSTask({
                  action:"order_update_check",
                  user: null,
                  worker_pid: 0,
                  key: "none",
                  data: {
                    order_id: order._id,
                    start_time: moment().unix()
                  }
            });

            return;
              /*amqpLib.sendNextTick({
                order_id: order._id
            })*/
            //TODO call microservice
        } else
            return await autocompleteOrderWork(order);
    }
    // если оплата картой - проверяем платежеспособность с учетом следующего часа.
    // Если успех - повторяем функцию через час - иначе отменяем заказ в текущем состоянии
    else if(order.payment_type === "CARD"){
        console.log('updateCheck 001: ', first_update);
        let orderDuration = parseInt(moment.duration(moment(order.start_work_time).diff(moment(order.end_work_time))).asHours());

        if(!order.minimal_hours || orderDuration <= order.minimal_hours || first_update){
            // sendOrderSocketMessage(order, "ORDER_CHANGED", {order, message:"STATUS_CHANGED", check});
            await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED", check});

            amqpLib.sendMSTask({
                action:"order_update_check",
                user: null,
                worker_pid: 0,
                key: "none",
                data: {
                    order_id: order._id,
                    start_time: moment().unix()
                }
            });
            return;
        } else {
            let hold_request = await qiwiLib.holding(order.id, check.order_check.customer_final_payment_amount,  check.order_check.app_commission, order.card_id);

            console.log('updateCheck 002: ', hold_request, hold_request.success);
            if(hold_request && hold_request.success){
                await sendOrderSocketMessage(order, "ORDER_CHANGED", {order:await api.Serialize('ORDER',order), message: "STATUS_CHANGED", check});
                // sendOrderSocketMessage(order, "ORDER_CHANGED", {order, message:"STATUS_CHANGED", check});

                amqpLib.sendMSTask({
                    action:"order_update_check",
                    user: null,
                    worker_pid: 0,
                    key: "none",
                    data: {
                        order_id: order._id,
                        start_time: moment().unix()
                    }
                });
                return;
            } else {
                await autocompleteOrderWork(order);
                return
            }
        }
    }
}

function sendNextTick(data){
    amqpLib.publish("", "MicroservicesQueue",
        new Buffer(
            JSON.stringify(
                {
                    action: 'order_update_check',
                    data,
                    key: null,
                    pid: null
                }
            )
        )
    );
}

var exports = module.exports = {};
exports.makeCheck = makeCheck;
exports.updateCheck = updateCheck;
exports.getCashSumm = getCashSumm;
exports.sendOrderSocketMessage = sendOrderSocketMessage;
exports.getGlobalConfigs = getGlobalConfigs;
