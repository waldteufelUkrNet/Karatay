var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var history = require('../../libs/history');
var pushLib = require('../../libs/push');
var amqpLib = require('../../libs/amqp');
var push = require('../../libs/push');

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function getOrdersForOffer(data) {

    let {auth_user, speciality_ids, date_from, date_to, departure} = data;

    return new Promise(async (response, reject) => {

            let order_criteria = {
                executor_id: null,
                for_now: false,
                status: {$lt: 20}
            };

            if (date_from || date_to) {
                if (date_from && date_to) {
                    order_criteria['scheduled_time'] = {$gte: new Date(date_from), $lte: new Date(date_to)}
                } else {
                    if (date_to)
                        order_criteria['scheduled_time'] = {
                            $lte: new Date(date_to)
                        };

                    if (date_from)
                        order_criteria['scheduled_time'] = {
                            $gte: new Date(date_from)
                        }
                }
            }

            if (departure)
                order_criteria.departure = departure;

            speciality_ids = speciality_ids ? speciality_ids.split(",") : [];

            if (speciality_ids && speciality_ids.length) {
                let spids = [];
                for (let i = 0; i < speciality_ids.length; i++) {
                    spids.push(mongoose.Types.ObjectId(speciality_ids[i]))
                }

                order_criteria.specialty_id = {$in: speciality_ids};
            }

            let orders = await api.Order.find(order_criteria).sort({scheduled_time: -1});

            return response({
                status: "OK",
                error: null,
                data: await api.Serialize('ORDER', orders)
            });

        }
    )
}

async function getSchedules(data) {
    let {auth_user, speciality_ids, date_from, date_to, departure} = data;
    // user.organization_id != auth_user.id
    return new Promise(async (response, reject) => {
            let executors = await api.Executor.find({organization_id: auth_user.id});

            let ex_array_id = [];
            for (let i = 0; i < executors.length; i++) {
                ex_array_id.push(executors[i].id);
            }

            let orders = await api.Order.find({
                executor_id: { $in : ex_array_id },
                status: { $gte: 20, $lte: 50 }
            }).sort({scheduled_time: -1});

            return response({
                status: "OK",
                error: null,
                data: await api.Serialize('ORDER', orders)
            });

        }
    )
}

async function getExecutorsForOffer(data) {

    let {auth_user, order_id} = data;

    return new Promise(async (response, reject) => {

            let order = await api.Order.findById(order_id);

            if (order.status >= 20 || order.executor_id || order.for_now)
                return response({
                    status: "ERROR",
                    error: 'ORDER_STATUS_ERROR',
                    data: null
                });

            let elemMuchSubquery = {
                specialty_id: order.specialty_id
            };

            if (order.departure === "OFFICE")
                elemMuchSubquery.workplace = true;
            if (order.departure === "ADDRESS")
                elemMuchSubquery.on_departure = true;

            let find_query = {
                organization_id: mongoose.Types.ObjectId(auth_user.id),
                specialities: {
                    $elemMatch:
                    elemMuchSubquery
                }
            };

            let executors = await api.Executor.find(find_query);
            executors = await api.Serialize('ADMIN_EXECUTOR_INFO', executors);

            return response({
                status: "OK",
                error: null,
                data: executors
            });

        }
    )
}

async function getOrderHistory(data) {
    return new Promise(async (response, reject) => {
        let history = await api.OrderHistory.find({
            order_id: data.id
        });

        response({
            status: "OK",
            error: null,
            data: history
        });
    });
}

async function getHistory(data) {
    let {auth_user} = data;
    return new Promise(async (response, reject) => {
            if (data.range)
                data.range = JSON.parse(data.range);

            let range = {
                start: data.range && data.range.start ? data.range.start : 0,
                limit: data.range && data.range.limit ? data.range.limit : 20,
            };

            let search_cond = {organization_id: mongoose.Types.ObjectId(auth_user.id)};

            if (data.filters)
                data.filters = JSON.parse(data.filters);

            if (data.filters && data.filters.status && data.filters.status.length)
                search_cond.status = {$in: data.filters.status};

            let orderList = await api.ExecutorOffer.aggregate([
                {
                    $lookup:
                        {
                            from: 'orders',
                            localField: "order_id",
                            foreignField: "_id",
                            as: "order",
                        }
                },
                {
                    $lookup:
                        {
                            from: 'executors',
                            localField: "executor_id",
                            foreignField: "_id",
                            as: "executor"
                        }
                },
                {$match: search_cond},
                {$skip: range.start},
                {$limit: range.limit}
            ]);

            orderList = await api.Serialize('ORGANIZATION_ORDER_HISTORY', orderList);

            return response({
                status: "OK",
                error: null,
                data: orderList
            });

        }
    )
}

async function createOrderOffer(data) {
    // only for EXECUTORS
    let {auth_user, executor_id, order_id, summ_type, summ, departure, address} = data;

    return new Promise(async (response, reject) => {
            let user = await api.Executor.findById(executor_id);

            if (!user || !user.organization_id || user.organization_id != auth_user.id)
                return response({
                    status: "ERROR",
                    error: "NO_EXECUTOR",
                    data: {}
                });

            let order = await api.Order.findById(order_id);

            if (!order || order.status >= 20 || order.for_now)
                return response({
                    status: "ERROR",
                    error: 'ORDER_STATUS_ERROR',
                    data: null
                });

            let offer = await api.ExecutorOffer.findOne({
                executor_id: mongoose.Types.ObjectId(executor_id),
                order_id: mongoose.Types.ObjectId(order_id)
            });

            if (offer)
                return response({
                    status: "ERROR",
                    error: 'ALREADY_MADE_OFFER',
                    data: null
                });

            let offer_body = {
                executor_id: mongoose.Types.ObjectId(executor_id),
                organization_id: mongoose.Types.ObjectId(auth_user.id),
                order_id: mongoose.Types.ObjectId(order_id),
                summ_type,
                summ,
                departure
            };


            if (departure === "OFFICE" && !address)
                return response({
                    status: "ERROR",
                    error: 'MISSING_INPUT_PARAMS',
                    data: null
                });

            if (address) {
                offer_body.address = address;
            }

            offer = await api.ExecutorOffer.create(offer_body);

            order.offered_executor_ids.push(executor_id);
            order.save();

            await pushLib.sendPush("EXECUTOR", order.executor_id, "FREE_TEXT", {
                title: "Менеджер юр. лица назначил новый заказ через админку",
                body: "Администратор назначил Вам новый заказ " + order.specialty.name + ". Ознакомьтесь с деталями"
            });

            return response({
                status: "OK",
                error: null,
                data: offer
            });

        }
    )
}

async function getOrderInfo(data) {
    return new Promise(async (response, reject) => {
        let order_id = data.id;
        if (!order_id)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data: null
            });

        let order = await api.Order.aggregate([
            {
                $lookup:
                    {
                        from: 'customers',
                        localField: "customer_id",
                        foreignField: "_id",
                        as: "customer",
                    }
            },
            {
                $lookup:
                    {
                        from: 'executors',
                        localField: "executor_id",
                        foreignField: "_id",
                        as: "executor"
                    }
            },
            {$match: {'_id': mongoose.Types.ObjectId(order_id)}},
            {$limit: 1}
        ]);


        if (!order && !order.length)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data: null
            });

        response({
            status: "OK",
            error: null,
            data: await api.Serialize('ADMIN_ORDER_INFO', order[0])
        });
    });
}

async function adminCancelOrderForLater(data) {
    let {auth_user, order_id} = data;
    return new Promise(async (response, reject) => {
            let user, second_user, close_status, summ = null;
            let order = await api.Order.findById(order_id);

            user = await api.Executor.findById(order.executor_id);

            if(!order || order.status>20 || user.active_order_id === order._id )
                return response({
                    status: "ERROR",
                    error:"ORDER_STATUS_ERROR",
                    data: {}
                });

            if(auth_user.role==="EXECUTOR" && (!order.executor_id || order.executor_id.toString()!== user._id.toString() || order.status!==20) )
                return response({
                    status: "ERROR",
                    error:"ORDER_STATUS_ERROR",
                    data: {}
                });


            second_user = await api.Customer.findById(order.customer_id);
            close_status = 130;

            history.add(order.id, close_status, "Исполнитель отменил запланированный заказ");

            push.sendPush("CUSTOMER", order.customer_id, "PLANNED_ORDER_CANCEL", {
                executor_name: user.name,
                speciality: order.specialty.name,
                order_id: order._id,
                price: parseFloat(order.price.toString()),
                summ_type: order.summ_type
            });

            order.status = close_status;
            order.cancel_reason = {type:"NONE", text:"NONE", initiator:auth_user.role };
            await order.save();

            amqpLib.sendSocketMessage("PLANNED_ORDER_CHANGED", "CUSTOMER", order.customer_id, {order:await api.Serialize('ORDER',order)});
            amqpLib.sendSocketMessage("PLANNED_ORDER_CHANGED", "EXECUTOR", order.executor_id, {order:await api.Serialize('ORDER',order)});

            return response({
                status: "OK",
                error: null,
                data: {}
            });

        }
    );
}

var exports = module.exports = {};
exports.getOrdersForOffer = getOrdersForOffer;
exports.getExecutorsForOffer = getExecutorsForOffer;
exports.createOrderOffer = createOrderOffer;
exports.getHistory = getHistory;
exports.getOrderHistory = getOrderHistory;
exports.getOrderInfo = getOrderInfo;
exports.getSchedules = getSchedules;
exports.adminCancelOrderForLater = adminCancelOrderForLater;
