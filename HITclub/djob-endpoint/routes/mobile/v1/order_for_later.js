var express = require('express');
var router = express.Router();
var publisher = require('../../../libs/publisher');


/** @api {post} /mobile_api/v1/order/find_orders_for_later_time Поиск отложенных заказов (E)
 * @apiName FindOrdersForLaterExecutor
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} x-access-token Users access-token.
 * 
 * @apiParam {String} [sort] "TIME", "DISTANCE"
 * @apiParam {ArrayOfString} [specialities] Массив ID специальностей для поиска ( по умолчанию используются все специальности исполнителя)
 * @apiParam {String} [departure] "ANY", "OFFICE", "ADDRESS" (Default: "ANY")
 * @apiParam {String} [date_from] Date in format "2019-12-08T14:25:39.180Z"
 * @apiParam {String} [date_to] Date in format "2019-12-08T14:25:39.180Z"
 * @apiParam {Number} [time_from] Time in minutes 0-1440 (default: 0)
 * @apiParam {Number} [time_to] Time in minutes 0-1440 (default: 1440)
 * 


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5ebdf612174bfa36478b9c5f",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "Грузчик",
                "info": "Специалисты по перемещению грузов в пространстве",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8ba7ed8533e18410ed35c",
                    "name": "123"
                }
            },
            "address": {
                "id": "5ebdf612174bfa36478b9c62",
                "name": "Lybidska Square, Kyiv, Ukraine",
                "lon": 30.5245176,
                "lat": 50.4128723,
                "front": null,
                "code": "",
                "floor": "",
                "flat": null
            },
            "scheduled_time": "2020-05-14T12:23:48.000Z",
            "scheduled_time_minutes": 100,
            "address_distance": 6312444.973459362,
            "office_distance": null,
            "departure": "ANY",
            "payment_type": "CASH",
            "offer_status": "NONE"
        }
    ]
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 */

router.post('/find_orders_for_later_time', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;

    publisher.sendTask( 'find_orders_for_later_time', req, res, input_data);
});

/** @api {post} /mobile_api/v1/order/create_offer Создать предложение (E)
 * @apiName CreateOfferForOrder
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * 
 * @apiParam {String} order_id ИД заказа
 * @apiParam {String} summ_type тип оплаты ( HOURLY, FIXED)
 * @apiParam {Number} summ сумма предложения
 * @apiParam {String} departure место выполнения (ADDRESS, OFFICE)

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {
        "id": "5ecae4b077b8552ad2ec2512",
        "summ": "100",
        "departure": "ADDRESS",
        "summ_type": "FIXED",
        "address": {
            "id": "5ecae1dbfad9ed0ccccb5f22",
            "name": "Podil, Kyiv, Ukraine",
            "lon": 30.51675389999999,
            "lat": 50.4688984,
            "front": null,
            "code": "",
            "floor": "3",
            "flat": null
        },
        "status": "WAITING",
        "createdAt": "2020-05-24T21:18:40.743Z"
    }
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 // ЗАявка уже отправлена
 *     { status:"ERROR", error: 'ALREADY_MADE_OFFER' }
 *     HTTP/1.1 200 // неверный статус заказа
 *     { status:"ERROR", error: 'ORDER_STATUS_ERROR' }
 *     HTTP/1.1 200 // no executor office ( in case where departure = "OFFICE")
 *     { status:"ERROR", error: 'NO_ANY_OFFICE' }
 */
router.post('/create_offer', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    if(!req.body  || !req.body.order_id ) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
      }
    let input_data = req.body;

    publisher.sendTask( 'create_executor_offer', req, res, input_data);
});



/** @api {post} /mobile_api/v1/order/remove_offer Удалить предложение (E)
 * @apiName RemoveOfferForOrder
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} order_id ИД заказа

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {}
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 // Отсутствуют обязательные параметры
 *     { status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' }
 */
router.post('/remove_offer', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    if(!req.body  || !req.body.order_id ) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
      }
    let input_data = req.body;

    publisher.sendTask( 'cancel_executor_offer', req, res, input_data);
});



/** @api {get} /mobile_api/v1/order/planned_list Список запланированных заказов (E)
 * @apiName GetPlannedExecutorOrders
 * @apiGroup OrderForLater
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
            "id": "5ecae1dbfad9ed0ccccb5f1f",
            "specialty": {
                "id": "5eb7f6d00d84d97445361d59",
                "name": "Вольный стрелок",
                "info": "Описание",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8ba7ed8533e18410ed35c",
                    "name": "123"
                }
            },
            "address": {
                "id": "5ecae1dbfad9ed0ccccb5f22",
                "name": "Podil, Kyiv, Ukraine",
                "lon": 30.51675389999999,
                "lat": 50.4688984,
                "front": null,
                "code": "",
                "floor": "3",
                "flat": null
            },
            "scheduled_time": "2021-05-14T12:23:48.000Z",
            "scheduled_time_minutes": 100,
            "address_distance": null,
            "office_distance": null,
            "price": 100,
            "departure": "ADDRESS",
            "payment_type": "CASH",
            "offer_status": "APPROVED",
            "summ_type": "FIXED"
        }
    ]
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 // Отсутствуют обязательные параметры
 *     { status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' }
 */
router.get('/planned_list', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
        
    let input_data = req.body;

    publisher.sendTask( 'get_executor_planned_orders_for_later_time', req, res, input_data);
});

/** @api {post} /mobile_api/v1/order/on_my_way Сделать активным отложенный заказ (E)
 * @apiName onMyWayFutureOrder
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
*   @apiParam {String} order_id Order ID

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "id": "5ecae1dbfad9ed0ccccb5f1f",
        "specialty": {
            "id": "5eb7f6d00d84d97445361d59",
            "name": "Вольный стрелок",
            "info": "Описание",
            "group_id": "5de8ba7ed8533e18410ed35c",
            "group": {
                "id": "5de8ba7ed8533e18410ed35c",
                "name": "123"
            }
        },
        "status": 20,
        "comment": "",
        "address": {
            "id": "5ecae1dbfad9ed0ccccb5f22",
            "name": "Podil, Kyiv, Ukraine",
            "lon": 30.51675389999999,
            "lat": 50.4688984,
            "front": null,
            "code": "",
            "floor": "3",
            "flat": null
        },
        "executor_id": "5e9576d8e3c96454aeb99d4b",
        "customer_id": "5e94026bec5ed64458cb210c",
        "payment_type": "CASH",
        "for_now": false,
        "scheduled_time": "2021-05-14T12:23:48.000Z",
        "scheduled_time_minutes": 100,
        "departure": "ADDRESS",
        "summ_type": "FIXED",
        "summ": null,
        "price": "100",
        "departure_address": null,
        "map": null,
        "start_walk_time": null,
        "start_work_time": null,
        "end_work_time": null,
        "finishedAt": null,
        "duration": null,
        "check": {
            "order_check": {
                "full_price": {
                    "$numberDecimal": "100"
                },
                "app_commission": 2,
                "customer_referral_comission": 1,
                "executor_referral_comission": 1,
                "payfor_full_price": 100,
                "full_executor_payment": 98,
                "customer_discount": 0,
                "executor_extra_payment": 0,
                "customer_final_payment_amount": 100,
                "qiwi_comission_amount": null
            },
            "order_configs": {
                "system_commission": 2,
                "referral_program_commissions": 1,
                "customer_discount_percent": 0,
                "executor_extra_payment_percent": 0
            },
            "customer_check": {
                "full_price": {
                    "$numberDecimal": "100"
                },
                "customer_discount": 0,
                "customer_final_payment_amount": 100
            },
            "executor_check": {
                "full_price": {
                    "$numberDecimal": "100"
                },
                "customer_discount": 0,
                "customer_final_payment_amount": 100,
                "executor_extra_payment": 0
            }
        },
        "cancel_reason": null,
        "createdAt": "2020-05-24T21:06:35.707Z",
        "executor": {
            "id": "5e9576d8e3c96454aeb99d4b",
            "name": "String",
            "second_name": "String",
            "surname": "String",
            "phone": "+70001111112",
            "photo": "String",
            "about": "String",
            "sex": null,
            "lat": 0,
            "lon": 0,
            "rate": "0",
            "status": false
        },
        "customer": {
            "id": "5e94026bec5ed64458cb210c",
            "name": null,
            "phone": "+70003331111",
            "rate": "0.00"
        },
        "offers_count": 1,
        "requested_executor": null,
        "requested_summ_type": null,
        "requested_price": null,
        "requested_departure": null
    }
}

 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK // У вас уже есть активный заказ
 *    { "status": "ERROR",    "error": "ALREDY_HAVE_ACTIVE_ORDER"}
 *     HTTP/1.1 200 OK // Заказчик занят в данный момент
 *    { "status": "ERROR",    "error": "CUSTOMER_IS_BUSY"}

 */
router.post('/on_my_way', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

        if(!req.body  || !req.body.order_id ) {
            return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
          }
        let input_data = req.body;

        publisher.sendTask( 'on_my_way', req, res, input_data);


});





/** @api {get} /mobile_api/v1/order/offers/:order_id Список преложений на заказ (C)
 * @apiName GetOffersForOrder
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} order_id ИД заказа

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": "5ecae4b077b8552ad2ec2512",
            "summ": "100",
            "departure": "ADDRESS",
            "summ_type": "FIXED",
            "address": {
                "id": "5ecae1dbfad9ed0ccccb5f22",
                "name": "Podil, Kyiv, Ukraine",
                "lon": 30.51675389999999,
                "lat": 50.4688984,
                "front": null,
                "code": "",
                "floor": "3",
                "flat": null
            },
            "status": "WAITING",
            "createdAt": "2020-05-24T21:18:40.743Z",
            "executor": {
                "id": "5e9576d8e3c96454aeb99d4b",
                "name": "String",
                "second_name": "String",
                "surname": "String",
                "phone": "+70001111112",
                "photo": "String",
                "about": "String",
                "sex": null,
                "lat": 0,
                "lon": 0,
                "rate": "0",
                "status": false
            }
        }
    ]
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 // Отсутствуют обязательные параметры
 *     { status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' }
 */
router.get('/offers/:order_id', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "CUSTOMER")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    if(!req.params  || !req.params.order_id ) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
      }
    let input_data = req.params;

    publisher.sendTask( 'get_executor_offers', req, res, input_data);
});


/** @api {post} /mobile_api/v1/order/approve_offer Утвердить заявку (C)
 * @apiName ApproveOfferForOrder
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} order_id ИД заказа
 * @apiParam {String} executor_id ИД исполнителя

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "status": "OK",
    "error": null,
    "data": {}
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // Ошибка авторизации
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 // Отсутствуют обязательные параметры
 *     { status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' }
 */

router.post('/approve_offer', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "CUSTOMER")
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    if(!req.body  || !req.body.order_id  || !req.body.executor_id ) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
      }
    let input_data = req.body;

    publisher.sendTask( 'approve_executor_offer', req, res, input_data);
});


/** @api {get} /mobile_api/v1/order/list/for_later Список отложенных заказов (C)
 * @apiName customer_orders_list_for_later
 * @apiGroup OrderForLater
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
            "id": "5e1c5e354f585341a827a55d",
            "specialty": {
                "id": "5dfa0fe715ef9103a47aef95",
                "name": "Грузчик",
                "info": "Грузчик",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5ded07e37ad2cc6ecc2665af",
                "name": "Teatralnaya",
                "lon": 37.712012,
                "lat": 55.854117,
                "front": null,
                "code": null,
                "floor": null,
                "flat": null
            },
            "executor_id": null,
            "customer_id": "5e94026bec5ed64458cb210c",
            "payment_type": "CASH",
            "for_now": false,
            "scheduled_time": "2019-12-08T14:25:39.180Z",
            "scheduled_time_minutes": 0,
            "departure": "ANY",
            "summ_type": "HOURLY",
            "summ": null,
            "price": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2021-01-02T14:25:39.000Z",
            "executor": null,
            "customer": {
                "id": "5e94026bec5ed64458cb210c",
                "name": null,
                "phone": "+70003331111",
                "rate": "0.00"
            },
            "offers_count": 3,
            "requested_executor": null,
            "requested_summ_type": null,
            "requested_price": null,
            "requested_departure": null
        },
        {
            "id": "5e1c5e2d4f585341a827a55c",
            "specialty": {
                "id": "5de8bb8d05158d1b6d10eb6f",
                "name": "Грузчик",
                "info": "Грузчик",
                "group_id": "5de8ba7ed8533e18410ed35c",
                "group": {
                    "id": "5de8bb8d05158d1b6d10eb70",
                    "name": "123"
                }
            },
            "status": 10,
            "comment": "123",
            "address": {
                "id": "5ded07e37ad2cc6ecc2665af",
                "name": "Teatralnaya",
                "lon": 37.711012,
                "lat": 55.857117,
                "front": null,
                "code": null,
                "floor": null,
                "flat": null
            },
            "executor_id": null,
            "customer_id": "5e94026bec5ed64458cb210c",
            "payment_type": "CASH",
            "for_now": false,
            "scheduled_time": "2019-12-08T14:25:39.180Z",
            "scheduled_time_minutes": 0,
            "departure": "ANY",
            "summ_type": "HOURLY",
            "summ": null,
            "price": null,
            "departure_address": null,
            "map": null,
            "start_walk_time": null,
            "start_work_time": null,
            "end_work_time": null,
            "finishedAt": null,
            "duration": null,
            "check": null,
            "cancel_reason": null,
            "createdAt": "2021-01-02T14:25:39.000Z",
            "executor": null,
            "customer": {
                "id": "5e94026bec5ed64458cb210c",
                "name": null,
                "phone": "+70003331111",
                "rate": "0.00"
            },
            "offers_count": 2,
            "requested_executor": null,
            "requested_summ_type": null,
            "requested_price": null,
            "requested_departure": null
        }
    ]
}
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


/** @api {post} /mobile_api/v1/order/cancel_for_later Отменить отложенный заказ до начала выполнения (C+E)
 * @apiName CloseConfirmOrder
 * @apiGroup OrderForLater
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * 
*   @apiParam {Number} order_id ID заказа

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
router.post('/cancel_for_later', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
        let {order_id} = req.body;

    publisher.sendTask( 'cancel_order_for_later', req, res, {order_id});
});

module.exports = router;
