var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var history = require('../../libs/history');
var push = require('../../libs/push');
let Timeout = require('await-timeout');
const moment = require('moment');
var check_lib = require('../../libs/check');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});



async function findExecutorForNow(data) {
    let {auth_user} = data;

    let address_list = [];
    let office_list = [];

    return new Promise(async (response, reject) => {
        let user = await api.Customer.findOne({_id: auth_user.id});
        if (!user)
            response({
                status: "ERROR",
                error: "AUTH_ERROR",
                data: {}
            });

        if (!user.active_order_id)
            response({
                status: "ERROR",
                error: 'NO_ACTIVE_ORDER',
                data: null
            });

        let order = await api.Order.findById(user.active_order_id);

        if (!order)
            return response({
                status: "ERROR",
                error: 'NO_ACTIVE_ORDER',
                data: null
            });

        if (!order.for_now)
            response({
                status: "ERROR",
                error: 'WRONG_ORDER_TYPE',
                data: null
            });

        if (order.executor_id)
            response({
                status: "ERROR",
                error: 'ORDER_HAS_EXECUTOR',
                data: null
            });

// Поиск с выездом на адресс по местоположению самого исполнителя
        if (order.departure === "ADDRESS" || order.departure === "ANY") {
            console.log('1001: ', 1);


            let find_query = {
                status: true,
                active_order_id: null,
                specialities: {
                    $elemMatch:
                        {
                            specialty_id: order.specialty_id,
                            on_departure: true
                        }
                }
            };

            if (order.payment_type === "CARD") {
                find_query.active_card_id = {$ne: null};
            }
            else{
                find_query.balance = {
                    $gte: 1
                  };
            }

            console.log("1002 find_query ", find_query);
            let executors = await api.Executor.aggregate([
                {
                    $geoNear: {
                        near: order.address.location,
                        distanceField: "distance",
                        minDistance: 0,
                        maxDistance: 20000000000,
                        query: find_query,
                        spherical: true
                    }
                }
            ]);

            console.log("FOUND USERS FOUND USERS FOUND USERS FOUND USERS FOUND USERS FOUND USERS FOUND USERS FOUND USERS FOUND USERS ", executors);
            // Преобразуем в новую модель для АПИ

            executors.map((item) => {
                let show_item = {
                    id: item._id,
                    name: item.name,
                    distance: item.distance,
                    rate: item.marks_count ? parseFloat(item.summ_mark / item.marks_count).toFixed(2) : "0",
                    photo: item.photo ? item.photo : null,
                    phone: item.phone,
                    lat: item.lat ? parseFloat(item.lat.toString()) : null,
                    lon: item.lon ? parseFloat(item.lon.toString()) : null,
                    departure: "ADDRESS"
                }

                console.log('1003: ', executors.length);

                let speciality = item.specialities.find(spec => {
                    if (spec.specialty_id.toString() === order.specialty_id.toString() && spec.on_departure === true)
                        return true;
                    else
                        return false;
                });

                show_item.rate_type = speciality.rate_type_for_now;

                if (show_item.rate_type === "HOURLY") {
                    show_item.price = speciality.hourly_rate_price;
                    show_item.minimal_hours  = speciality.hourly_rate_minimal_hours;
                }
                else {
                    show_item.price = speciality.fixed_rate_price;
                }

                address_list.push(show_item)
            });

        }

// Поиск по оффису
        if (order.departure === "OFFICE" || order.departure === "ANY") {
            console.log('2001: ', 1);
            let office_id_list = [];


            let find_query = {
                type: "OFFICE"
            };

            

            console.log('2002: ', find_query);
            let office_address_list = await api.Address.aggregate([
                {
                    $geoNear: {
                        near: order.address.location,
                        distanceField: "distance",
                        maxDistance: 20000000000,
                        query: find_query,
                        //  includeLocs: "dist.location",
                        spherical: true
                    }
                }
            ]);

            office_address_list.map((item) => {
                office_id_list.push(item._id)
            })



            find_query = {
                status: true,
                active_order_id: null,
                specialities: {
                    $elemMatch:
                        {
                            specialty_id: order.specialty_id,
                            workplace: true
                        }
                },
                office_id: {$in: office_id_list}
            };


            if (order.payment_type === "CARD") {
                find_query.active_card_id = {$ne: null};
            }
            else{
                find_query.balance = {
                    $gte: 1
                  };
            }

            let executors = await api.Executor.find(find_query);
            console.log('2003: ', executors.length);
            // Преобразуем в новую модель для АПИ

            executors.map((item) => {
                let show_item =
                    {
                        id: item._id,
                        name: item.name,
                        distance: 0,
                        rate: item.marks_count ? parseFloat(item.summ_mark / item.marks_count).toFixed(2) : "0",
                        photo: item.photo ? item.photo : null,
                        phone: item.phone,
                        departure: "OFFICE"
                    };
                let office = office_address_list.find(office => {
                    return office._id.toString() === item.office_id.toString();
                })
                show_item.lat = office.lat ? parseFloat(office.lat.toString()) : null;
                show_item.lon = office.lon ? parseFloat(office.lon.toString()) : null;
                show_item.distance = office.distance;

                console.log("FINDING SPECIALITY " + order.specialty_id)

                let speciality = item.specialities.find(spec => {
                    if (spec.specialty_id.toString() === order.specialty_id.toString() && spec.workplace === true)
                        return true;
                    else
                        return false;
                });

                if (!speciality)
                    console.log("PROBLEM_WITH EXECUTOR SPECIALITY", item)
                show_item.rate_type = speciality.rate_type_for_now;

                if (show_item.rate_type === "HOURLY") {
                    show_item.price = speciality.hourly_rate_price;
                    show_item.minimal_hours  = speciality.hourly_rate_minimal_hours;
                }
                else {
                    show_item.price = speciality.fixed_rate_price;
                }

                console.log('2004: ', show_item);
                office_list.push(show_item)
            });
        }

        Array.prototype.push.apply(address_list, office_list);

        address_list.sort(compare);
        address_list.slice(0, 10);

        return response({
            status: "OK",
            error: null,
            data: address_list
        });

    });

}


function compare(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}


async function askExecutor(data) {
    let {auth_user, executor_id, departure} = data;
    //
    console.log("ALEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERT")

    return new Promise(async (response, reject) => {


        if (!executor_id)
            return response({
                status: "ERROR",
                error: 'SERVER_ERROR',
                data: null
            });

        //executor_id = executor_id.split('?')[0];

        if (executor_id.length < 6)
            return response({
                status: "ERROR",
                error: 'SERVER_ERROR',
                data: null
            });

        let customer;
        let executor;

        try {
            customer = await api.Customer.findOne({_id: auth_user.id});
            executor = await api.Executor.findOne({_id: executor_id});
        } catch (e) {
            console.log("error", e);
            return response({
                status: "ERROR",
                error: 'SERVER_ERROR',
                data: null
            });
        }

        if (!customer.active_order_id)
            return response({
                status: "ERROR",
                error: 'NO_ANY_ACTIVE_ORDER',
                data: null
            });

        if (!executor)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_EXECUTOR',
                data: null
            });
        if (executor.requested_order_id || executor.active_order_id || !executor.status)
            return response({
                status: "ERROR",
                error: 'EXECUTOR_IS_BUSY',
                data: null
            });

        let order = await api.Order.findOne({_id: customer.active_order_id});

        if (order.status != 10)
            return response({
                status: "ERROR",
                error: 'WRONG_ORDER_STATUS',
                data: null
            });

        executor.requested_order_id = order._id;
        executor.requested_order_time = new Date();
        executor.requested_order_departure = departure;
        await executor.save();
        order.status = 11;
        await order.save();

        let wait_time = await api.Config.findOne({param: 'accept_wait_time'});
        //wait_time = parseInt(wait_time.value); //time in sec
        wait_time = 60000;

        push.sendPush("EXECUTOR", executor._id, "NEW_ORDER_REQUEST", {
            specialty: order.specialty.name,
            order_id: order._id
        });
        //send SOCKET to Executor


        let tmp_order = await api.Serialize('ORDER', order);
        let user_specialty_criteria = {
            executor_id: executor._id,
            specialty_id: order.specialty_id
        };
        if (departure === "OFFICE")
            user_specialty_criteria.workplace = true;
        else if (departure === "ADDRESS")
            user_specialty_criteria.on_departure = true;


        order.requested_departure = departure;

        let user_specialty = await api.ExecutorSpeciality.findOne(user_specialty_criteria);
        if (user_specialty) {


            user_specialty = await api.Serialize('EXECUTOR_SPECIALITY', user_specialty);
            if (user_specialty.rate_type_for_now === "HOURLY") {
                tmp_order.price = user_specialty.hourly_rate_price;
                order.minimal_hours  = user_specialty.hourly_rate_minimal_hours;
            }

            if (user_specialty.rate_type_for_now === "FIXED") {
                tmp_order.price = user_specialty.fixed_rate_price;
            }
            order.requested_price = tmp_order.price;
            order.requested_summ_type = user_specialty.rate_type_for_now;
        }

        await order.save();

        console.log("SENDING SOCKET REQUEST to EXECUTOR for ASK")
        amqpLib.sendSocketMessage("ORDER_REQUEST", "EXECUTOR", executor._id, {
            order: await api.Serialize('ORDER', order),
            wait_time
        });
        amqpLib.sendSocketMessage("ORDER_CHANGED", "CUSTOMER", order.customer_id, {order: await api.Serialize('ORDER', order)});
        console.log("ASKED EXECUTOR " + executor._id + " BY SOCKET WITH order " +  await api.Serialize('ORDER', order))
        //run timer task

        await history.add(order.id, 11, "Клиент предлагает заказ исполнителю");


        amqpLib.sendMSTask({
            action: "find_executor_for_now_timer",
            user: auth_user,
            worker_pid: 0,
            key: "none",
            data: {
                auth_user,
                wait_time,
                order_id: order._id,
                executor_id: executor._id,
                start_time: moment().unix()
            }
        })
        //moment().add(wait_time, 's')
        // даем овтет что запрос ( предложение отправлено)
        return response({
            status: "OK",
            error: '',
            data: {"status": "REQUEST_SENT"}
        });


    });

}


async function askExecutorTimer(data) {
    let {auth_user, wait_time, order_id, executor_id, start_time} = data;
    console.log("STARTER FIND EXECUTOR TIMER")
// т.к. pid =0  то response сделает ack сообщения без последующей отправки таска-ответа
    return new Promise(async (response, reject) => {

        console.log("inut data ", {auth_user, wait_time, order_id, executor_id, start_time})
        console.log("started ask executor timer process")

        let difference = moment().unix() - start_time;
        console.log("difference is ", difference)
        if (difference < wait_time)
            await Timeout.set(wait_time - difference);


        console.log("ENDED FIND EXECUTOR TIMER")
        let order = await api.Order.findById(order_id);
        let executor = await api.Executor.findById(executor_id);
        if (!order || !executor) {
            if (!order)
                console.log("NO order")
            if (!executor)
                console.log("NO executor")

            return response({
                status: "ERROR"
            });
        }

        if (order.status !== 11 || !executor.requested_order_id || executor.requested_order_id.toString() !== order_id.toString()
            || executor.active_order_id || order.executor_id) {
            console.log("SOMETHING GONE WRONG")
            return response({
                status: "DO NOTHING"
            });
        }

        else {
            let gc = await check_lib.getGlobalConfigs();
            let {
                for_now_order_find_executor_timeout_seconds
            } = gc;
            //check if ORDER_CREATE_TIMEOUT
            let control_time = moment();
            control_time.subtract(for_now_order_find_executor_timeout_seconds, 'seconds');
            if (moment(order.createdAt).unix() <= control_time.unix()) {
                order.status = 110;
                order.requested_departure = null;
                order.requested_price = null;
                order.requested_summ_type = null;
                await order.save();
                amqpLib.sendSocketMessage("ORDER_REQUEST_TIMEOUT", "EXECUTOR", executor._id, {});
                amqpLib.sendSocketMessage("ORDER_REQUEST_TIMEOUT", "CUSTOMER", order.customer_id, {});
                amqpLib.sendSocketMessage("ORDER_CREATE_TIMEOUT", "CUSTOMER", order.customer_id, {});
            }
            else {
                order.status = 10;
                await order.save();
                amqpLib.sendSocketMessage("ORDER_REQUEST_TIMEOUT", "EXECUTOR", executor._id, {});
                amqpLib.sendSocketMessage("ORDER_REQUEST_TIMEOUT", "CUSTOMER", order.customer_id, {});
            }
            executor.requested_order_id = null;
            executor.requested_order_departure = null;
            executor.requested_order_time = null;
            //order.status=10;
            await executor.save();

            console.log(" TIMEOUTED ask executor script ... ")


            return response({
                status: "OK"
            });
        }

    });
}

var exports = module.exports = {};

exports.findExecutorForNow = findExecutorForNow;
exports.askExecutor = askExecutor;
exports.askExecutorTimer = askExecutorTimer;
