var express = require('express');
var router = express.Router();
var publisher = require('../../../libs/publisher');


/** @api {post} /mobile_api/v1/order/create Создать заказ
 * @apiName OrderCreate
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiParam {String} specialty_id ИД специальности
 * @apiParam {String} comment комментарий
 * @apiParam {Object} address объект адреса
  * @apiParam {String} address.name адрес ( текст)
  * @apiParam {Decimal} address.lat широта
  * @apiParam {Decimal} address.lon долгота
  * @apiParam {String} address.code код домофона
  * @apiParam {String} address.floor этаж
  * * @apiParam {String} address.flat квартира

 * @apiParam {String} payment_type способ оплаты CASH/CARD/BONUS
  * @apiParam {String} departure место проведения работ ADDRESS/OFFICE/ANY (ANY from 23/05/20)
 * @apiParam {Boolean} for_now срочный заказа
 * @apiParam {String} [scheduled_time] запрланированные дата+время выполнения заказа в формате "2019-12-08T14:25:39.180Z"
 * @apiParam {Number} [scheduled_time_minutes] запрланированное время выполнения заказа в МИНУТАХ (Часы*60 + Минуты) 0-1440
 * @apiParam {String} [card_id]  ИД карты ( если payment_type = CARD )

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {
        "order": {
            "id": "5e125439d22b072061db5066",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5e125439d22b072061db5069",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": null,
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": true,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "ADDRESS",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T21:25:13.951Z"
        }
    }
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 400 Input error // отсутствуют необходимые параметры
 *     { status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' }
 *     HTTP/1.1 200 OK // Специальность не найдена
 *    { "status": "ERROR",    "error": "SPECIALTY_NOT_FOUND"}
 *     HTTP/1.1 200 OK // У пользователя ест ьактивный заказ
 *    { "status": "ERROR",    "error": "ALREADY_HAVE_ACTIVE_ORDER"}

 */
router.post('/create', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "CUSTOMER")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;

    publisher.sendTask( 'create_order', req, res, input_data);
});



/** @api {get} /mobile_api/v1/order/find_executors Поиск подходящих исполнителей
 * @apiName FindExecutorsForNow
 * @apiGroup OrderForNow
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5df4270e96a789240b244df2",
            "name": "Фамилия имя отчество12312",
            "distance": 1534933.23925855,
            "departure": "ADDRESS",
            "rate_type": "HOURLY",
            "price": 100
        }
    ]
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/find_executors', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "CUSTOMER")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;

    publisher.sendTask( 'find_executor_for_now', req, res, input_data);
});


/** @api {get} /mobile_api/v1/order/ask_executor/:executor_id Предложить исполнителю выполнение заказа
 * @apiName AskExecutorForNow
 * @apiGroup OrderForNow
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} executor_id ИД исполнителя
  * @apiParam {String} departure ADDRESS or OFFICE
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5df4270e96a789240b244df2",
            "name": "Фамилия имя отчество12312",
            "distance": 1534933.23925855,
            "departure": "ADDRESS",
            "rate_type": "HOURLY",
            "price": 100
        }
    ]
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 // Отсутствует активный заказ
 *     { status:"ERROR", error: 'NO_ANY_ACTIVE_ORDER' }
 *     HTTP/1.1 200 // такой исполнитель не существует
 *     { status:"ERROR", error: 'NO_SUCH_EXECUTOR' }
 *     HTTP/1.1 200 // исполнитель занят другим заказом
 *     { status:"ERROR", error: 'EXECUTOR_IS_BUSY' }
 *     HTTP/1.1 200 // неверный статус заказа
 *     { status:"ERROR", error: 'WRONG_ORDER_STATUS' }


 */
router.get('/ask_executor/:executor_id', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "CUSTOMER")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

        let {executor_id} = req.params;
        let {departure}= req.query;
        if(!departure)
          departure="ADDRESS";
    let input_data = {executor_id, departure};

    publisher.sendTask( 'ask_executor', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/by_id/:order_id Get order by ID
 * @apiName GetOrderById
 * @apiGroup OrderGlobal
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} order_id order_id
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {
            "id": "5e125439d22b072061db5066",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5e125439d22b072061db5069",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": null,
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": true,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "ADDRESS",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T21:25:13.951Z"
    }
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/by_id/:order_id', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

        let {order_id} = req.params;

        console.log("someone called me")
    let input_data = {order_id};
    publisher.sendTask( 'get_order_by_id', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/list/address_only_approved_offers_orders Подтвержденные заявки ( выезд на адрес)
 * @apiName address_only_approved_offers_orders
 * @apiGroup OrderOfferList
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {
        "approved_orders": [
            {
                "price": {
                    "$numberDecimal": "200"
                },
                "specialty_id": "5de8bb8d05158d1b6d10eb6f",
                "specialty": {
                    "name": "GR1",
                    "info": "Info field",
                    "group": {
                        "name": "123",
                        "_id": "5de8bb8d05158d1b6d10eb70"
                    },
                    "group_id": "5de8ba7ed8533e18410ed35c",
                    "enabled": true,
                    "_id": "5de8bb8d05158d1b6d10eb6f",
                    "__v": 0
                },
                "status": 20,
                "comment": "123",
                "address": {
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            23,
                            13
                        ]
                    },
                    "lat": {
                        "$numberDecimal": "13"
                    },
                    "lon": {
                        "$numberDecimal": "23"
                    },
                    "name": "Teatralnaya",
                    "front": null,
                    "code": null,
                    "floor": null,
                    "type": "ADDRESS",
                    "apartment": null,
                    "_id": "5e1267cdf5f10a4e27b05702"
                },
                "executor_id": "5df4270e96a789240b244df2",
                "customer_id": "5df1950fd990683456d28d1c",
                "payment_type": "CASH",
                "for_now": false,
                "departure": "OFFICE",
                "departure_address": null,
                "start_walk_time": null,
                "start_work_time": null,
                "end_work_time": null,
                "finishedAt": null,
                "duration": null,
                "offered_executor_ids": [],
                "summ_type": "HOURLY",
                "summ": null,
                "expected_time": null,
                "card_id": null,
                "_id": "5e1267cdf5f10a4e27b056ff",
                "scheduled_time": "1970-01-19T04:53:34.800Z",
                "createdAt": "2020-01-05T22:48:45.272Z",
                "updatedAt": "2020-01-05T22:48:45.272Z",
                "__v": 4,
                "map": {
                    "expected_time": 600000,
                    "path": "_ienA{|jkC"
                }
            }
        ],
        "unapproved_orders": []
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/address_only_approved_offers_orders', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'address_only_approved_offers_orders', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/list/office_only_approved_offers_orders Подтвержденные заявки ( на оффисе)
 * @apiName office_only_approved_offers_orders
 * @apiGroup OrderOfferList
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {
        "approved_orders": [
            {
                "price": {
                    "$numberDecimal": "200"
                },
                "specialty_id": "5de8bb8d05158d1b6d10eb6f",
                "specialty": {
                    "name": "GR1",
                    "info": "Info field",
                    "group": {
                        "name": "123",
                        "_id": "5de8bb8d05158d1b6d10eb70"
                    },
                    "group_id": "5de8ba7ed8533e18410ed35c",
                    "enabled": true,
                    "_id": "5de8bb8d05158d1b6d10eb6f",
                    "__v": 0
                },
                "status": 20,
                "comment": "123",
                "address": {
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            23,
                            13
                        ]
                    },
                    "lat": {
                        "$numberDecimal": "13"
                    },
                    "lon": {
                        "$numberDecimal": "23"
                    },
                    "name": "Teatralnaya",
                    "front": null,
                    "code": null,
                    "floor": null,
                    "type": "ADDRESS",
                    "apartment": null,
                    "_id": "5e1267cdf5f10a4e27b05702"
                },
                "executor_id": "5df4270e96a789240b244df2",
                "customer_id": "5df1950fd990683456d28d1c",
                "payment_type": "CASH",
                "for_now": false,
                "departure": "OFFICE",
                "departure_address": null,
                "start_walk_time": null,
                "start_work_time": null,
                "end_work_time": null,
                "finishedAt": null,
                "duration": null,
                "offered_executor_ids": [],
                "summ_type": "HOURLY",
                "summ": null,
                "expected_time": null,
                "card_id": null,
                "_id": "5e1267cdf5f10a4e27b056ff",
                "scheduled_time": "1970-01-19T04:53:34.800Z",
                "createdAt": "2020-01-05T22:48:45.272Z",
                "updatedAt": "2020-01-05T22:48:45.272Z",
                "__v": 4,
                "map": {
                    "expected_time": 600000,
                    "path": "_ienA{|jkC"
                }
            }
        ],
        "unapproved_orders": []
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/office_only_approved_offers_orders', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'office_only_approved_offers_orders', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/list/all_approved_offers_orders Подтвержденные заявки ( ВСЕ )
 * @apiName all_approved_offers_orders
 * @apiGroup OrderOfferList
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5e1267cdf5f10a4e27b056ff",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 20,
            "comment": "123",
            "address": {
                "id": "5e1267cdf5f10a4e27b05702",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": "5df4270e96a789240b244df2",
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": false,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "OFFICE",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": {
                "expected_time": 600000,
                "path": "_ienA{|jkC"
            },
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T22:48:45.272Z"
        }
    ]
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/all_approved_offers_orders', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'all_approved_offers_orders', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/list/address_unoffered_orders Заказы без предложенных заявок( Адрес )
 * @apiName address_unoffered_orders
 * @apiGroup OrderOfferList
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5e1267cdf5f10a4e27b056fb",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5e1267cdf5f10a4e27b056fe",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": null,
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": false,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "ADDRESS",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T22:48:45.261Z"
        }
    ]
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/address_unoffered_orders', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'address_unoffered_orders', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/list/office_unoffered_orders Заказы без предложенных заявок( Оффис )
 * @apiName office_unoffered_orders
 * @apiGroup OrderOfferList
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5e1267cdf5f10a4e27b056fb",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5e1267cdf5f10a4e27b056fe",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": null,
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": false,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "ADDRESS",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T22:48:45.261Z"
        }
    ]
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/office_unoffered_orders', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'office_unoffered_orders', req, res, input_data);
});


/** @api {get} /mobile_api/v1/order/offer/by_order_id/:order_id Получить мое предложение по ИД заказа (E)
 * @apiName offer_by_order_id
 * @apiGroup OrderOfferByOrderId
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} order_id order ID
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/offer/by_order_id/:order_id', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
        let {order_id} = req.params;
    
    publisher.sendTask( 'get_executor_offer_by_order', req, res, {order_id});
});

/** @api {get} /mobile_api/v1/order/list/approved_and_offered_orders Отправленные и Подтвержденные
 * @apiName approved_and_offered_orders
 * @apiGroup OrderOfferList
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {
        "approved_orders": [
            {
                "price": {
                    "$numberDecimal": "200"
                },
                "specialty_id": "5de8bb8d05158d1b6d10eb6f",
                "specialty": {
                    "name": "GR1",
                    "info": "Info field",
                    "group": {
                        "name": "123",
                        "_id": "5de8bb8d05158d1b6d10eb70"
                    },
                    "group_id": "5de8ba7ed8533e18410ed35c",
                    "enabled": true,
                    "_id": "5de8bb8d05158d1b6d10eb6f",
                    "__v": 0
                },
                "status": 20,
                "comment": "123",
                "address": {
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            23,
                            13
                        ]
                    },
                    "lat": {
                        "$numberDecimal": "13"
                    },
                    "lon": {
                        "$numberDecimal": "23"
                    },
                    "name": "Teatralnaya",
                    "front": null,
                    "code": null,
                    "floor": null,
                    "type": "ADDRESS",
                    "apartment": null,
                    "_id": "5e1267cdf5f10a4e27b05702"
                },
                "executor_id": "5df4270e96a789240b244df2",
                "customer_id": "5df1950fd990683456d28d1c",
                "payment_type": "CASH",
                "for_now": false,
                "departure": "OFFICE",
                "departure_address": null,
                "start_walk_time": null,
                "start_work_time": null,
                "end_work_time": null,
                "finishedAt": null,
                "duration": null,
                "offered_executor_ids": [],
                "summ_type": "HOURLY",
                "summ": null,
                "expected_time": null,
                "card_id": null,
                "_id": "5e1267cdf5f10a4e27b056ff",
                "scheduled_time": "1970-01-19T04:53:34.800Z",
                "createdAt": "2020-01-05T22:48:45.272Z",
                "updatedAt": "2020-01-05T22:48:45.272Z",
                "__v": 4,
                "map": {
                    "expected_time": 600000,
                    "path": "_ienA{|jkC"
                }
            }
        ],
        "unapproved_orders": []
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/approved_and_offered_orders', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'approved_and_offered_orders', req, res, input_data);
});



/** @api {get} /mobile_api/v1/order/list/for_later Список отложенных заказов
 * @apiName customer_orders_list_for_later
 * @apiGroup OrderCustomer
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/list/for_later', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "CUSTOMER")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
    let input_data = req.body;
    publisher.sendTask( 'customer_order_list_for_later', req, res, input_data);
});




/** @api {get} /mobile_api/v1/order/my Получить мой активный заказ
 * @apiName MyOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "order": {
            "id": "5e125439d22b072061db5066",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5e125439d22b072061db5069",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": null,
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": true,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "ADDRESS",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T21:25:13.951Z"
        }
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { status:"ERROR", error: 'AUTH_ERROR' }
 * HTTP/1.1 200 OK // Отсутсвует текущий активный заказ
 * { "status": "ERROR",    "error": "NO_ANY_ACTIVE_ORDER"}
 */
router.get('/my', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "CUSTOMER" && req.input_user.user.role !== "EXECUTOR"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;

    publisher.sendTask( 'get_my_active_order', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/history Получить историю моих заказов
 * @apiName MyOrderHistory
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} offset Offset
 * @apiParam {Number} limit Limit

 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": "OK",
    "error": null,
    "data": [{
        "order": {
            "id": "5e125439d22b072061db5066",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "GR1",
                "info": "Info field",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5e125439d22b072061db5069",
                "name": "Teatralnaya",
                "lon": {
                    "$numberDecimal": "23"
                },
                "lat": {
                    "$numberDecimal": "13"
                },
                "front": null,
                "code": null,
                "floor": null
            },
            "executor_id": null,
            "customer_id": "5df1950fd990683456d28d1c",
            "payment_type": "CASH",
            "for_now": true,
            "scheduled_time": "1970-01-19T04:53:34.800Z",
            "departure": "ADDRESS",
            "summ_type": "HOURLY",
            "summ": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2020-01-05T21:25:13.951Z"
        }
    }
    ]
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/history', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "CUSTOMER" && req.input_user.user.role !== "EXECUTOR"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

        let {offset, limit} = req.query;
    if(!offset)
        offset = 0;
    else 
        offset = parseInt(offset);

    if(!limit)
        limit = 10;
    else 
        limit = parseInt(limit);

    let input_data = req.body;
    input_data.limit = limit;
    input_data.offset = offset;
    
    publisher.sendTask( 'get_orders_history', req, res, input_data);
});

/** @api {get} /mobile_api/v1/order/accept Принять текущий заказ
 * @apiName AcceptOrder
 * @apiGroup OrderExecutor
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {status:"OK", error:"SUCCESS", data:{}}

 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { status:"ERROR", error: 'AUTH_ERROR' }
 * HTTP/1.1 200 OK // У вас уже есть текущий заказ
 * { "status": "ERROR",    "error": "ALREADY_BUSY"}
 * HTTP/1.1 200 OK // Вам не предлагали исполнять нкакой заказ
 * { "status": "ERROR",    "error": "NO_ORDER_REQUESTS"}
 * HTTP/1.1 200 OK //Заказ отсутсвует или уже имеет исполнителя
 * { "status": "ERROR",    "error": "ORDER_ERROR"}
 */
router.get('/accept', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "EXECUTOR"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'executor_accept_order', req, res, req.body);
});

/** @api {get} /mobile_api/v1/order/decline Отклонить текущий заказ
 * @apiName DeclineOrder
 * @apiGroup OrderExecutor
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас уже есть текущий заказ
 *    { "status": "ERROR",    "error": "ALREADY_BUSY"}
 *     HTTP/1.1 200 OK // Вам не предлагали исполнять нкакой заказ
 *    { "status": "ERROR",    "error": "NO_ORDER_REQUESTS"}

 */
router.get('/decline', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "EXECUTOR"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'executor_decline_order', req, res, {});
});

/** @api {get} /mobile_api/v1/order/close Закрыть заказ ( до выбора исполнителя )
 * @apiName CloseCustomerOrder
 * @apiGroup OrderCustomer
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас нет кативного заказа
 *    { "status": "ERROR",    "error": "NO_ANY_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "WRONG_ORDER_STATUS"}

 */
router.get('/close', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "CUSTOMER"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'customer_close_order', req, res, {});
});


/** @api {get} /mobile_api/v1/order/cancel_ask_executor Отменить предложение заказа исполнителю ( срочный )
 * @apiName CancelAskExecutorOrder
 * @apiGroup OrderCustomer
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас нет кативного заказа
 *    { "status": "ERROR",    "error": "NO_ANY_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "WRONG_ORDER_STATUS"}

 */
router.get('/cancel_ask_executor', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "CUSTOMER"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'cancel_ask_executor_order', req, res, {});
});

/** @api {post} /mobile_api/v1/order/cancel Отменить заказ (во время выполнения)
 * @apiName CloseConfirmOrder
 * @apiGroup OrderCustomer
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * 
*   @apiParam {String} text Текст комментария
*   @apiParam {String} type Тип (причина) отмены

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас нет кативного заказа
 *    { "status": "ERROR",    "error": "NO_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "WRONG_ORDER_STATUS"}

 */
router.post('/cancel', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
        let {text, type} = req.body;
        if(!text)
          text = null;

    publisher.sendTask( 'cancel_order', req, res, {text, type});
});

/** @api {post} /mobile_api/v1/order/cancel_confirm Подтвердить  завершение заказа (заказчик)
 * @apiName CustomerCloseConfirmOrder
 * @apiGroup OrderCustomer
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас нет кативного заказа
 *    { "status": "ERROR",    "error": "NO_ANY_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "WRONG_ORDER_STATUS"}

 */
router.post('/cancel_confirm', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'cancel_order_confirm', req, res, {});
});

/** @api {get} /mobile_api/v1/order/close Закрыть заказ ( до выбора исполнителя )
 * @apiName CloseCustomerOrder
 * @apiGroup OrderCustomer
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас нет кативного заказа
 *    { "status": "ERROR",    "error": "NO_ANY_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "WRONG_ORDER_STATUS"}

 */
router.get('/close', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || (req.input_user.user.role !== "CUSTOMER"))
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'customer_close_order', req, res, {});
});

/** @api {get} /mobile_api/v1/order/start_work Начать работу
 * @apiName StartWorkOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {status:"OK", error:null, data:{}}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас нет активного заказа
 *    { "status": "ERROR",    "error": "NO_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неподходящий статус заказа
 *    { "status": "ERROR",    "error": "ORDER_STATUS_ERROR"}
 *     HTTP/1.1 200 OK // Расстояние до заказа больше 150 метров
 *    {
    "status": "ERROR",
    "error": "TOO_FAR_FOR_START"
}
 */
router.get('/start_work', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'order_start_work', req, res, {});
});


/** @api {get} /mobile_api/v1/order/work_done Работа окончена, переход к оплате
 * @apiName WorkDoneOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {}
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK //Нет активного заказа
 *    { "status": "ERROR",    "error": "NO_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "ORDER_STATUS_ERROR"}

 */
router.get('/work_done', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'order_done', req, res, {});
});

/** @api {post} /mobile_api/v1/order/order_done_confirm Подтвердить завершение заказа
 * @apiName WorkDoneConfirmOrder
 * @apiGroup Order
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
*   @apiParam {Number} mark Оценка (1-5).
*   @apiParam {String} text Текст комментария выполнения заказа.
*   @apiParam {String} [report_text] Текст жалобы
*   @apiParam {String} [report_type] Тип жалобы
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {}
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK //Нет активного заказа
 *    { "status": "ERROR",    "error": "NO_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Неверный статус заказа
 *    { "status": "ERROR",    "error": "ORDER_STATUS_ERROR"}

 */

router.post('/order_done_confirm', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

        let {mark, text, report_type, report_text} = req.body;

    publisher.sendTask( 'order_done_confirm', req, res, {mark, text, report_type, report_text});
});

// TODO call test microservice
router.get('/test', async function (req, res, next) {
    publisher.sendTask( 'test_order_microservice', req, res, {});
});




router.get('/address_only_approved_offers_orders', async function (req, res, next) {
    publisher.sendTask( 'address_only_approved_offers_orders', req, res, {});
});
router.get('/office_only_approved_offers_orders', async function (req, res, next) {
    publisher.sendTask( 'office_only_approved_offers_orders', req, res, {});
});
router.get('/all_approved_offers_orders', async function (req, res, next) {
    publisher.sendTask( 'all_approved_offers_orders', req, res, {});
});
router.get('/address_unoffered_orders', async function (req, res, next) {
    publisher.sendTask( 'address_unoffered_orders', req, res, {});
});
router.get('/office_unoffered_orders', async function (req, res, next) {
    publisher.sendTask( 'office_unoffered_orders', req, res, {});
});
router.get('/approved_and_offered_orders', async function (req, res, next) {
    publisher.sendTask( 'approved_and_offered_orders', req, res, {});
});

module.exports = router;
