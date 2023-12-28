var express = require('express');
var router = express.Router();
var publisher = require('../../../libs/publisher');
var process = require('process');

/** @api {post} /mobile_api/v1/customer/logout Log out
 * @apiName CustomerLogout
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
* @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {}
}

 */
router.post('/logout', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" )
    return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    
        publisher.sendTask( 'customer_logout', req, res,
        { });

});

/** @api {post} /mobile_api/v1/customer/send_code Отправить смс с кодом
 * @apiName SendCodeCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} phone Телефонный номер в формате +9999999999
 * @Description Для номеров, которые начинаются с +7000 код устанавливается 0000
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "code_resend_available": true,
        "next_login_sms_available_time": "2019-12-27T03:14:26.822Z",
        "sms_sent_count": 1
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Input error // отсутствуют необходимые параметры
 *     {"status":"ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 *     HTTP/1.1 200 OK // Слишком рано для отправки СМС
 *    {"status": "ERROR", "error": "NEXT_SMS_TIME_ERROR", "data": {"next_login_sms_available_time": "2019-05-07T11:52:37+0300"} }
 *     HTTP/1.1 200 OK // Пользователь забанен
 *    {"status":"ERROR", "error":"BANNED" }
 */
router.post('/send_code', async function (req, res) {
    if(!req.body  || !req.body.phone ) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
    }

        publisher.sendTask( 'customer_send_code', req, res,
        {
          phone: req.body.phone
        });

});

/** @api {post} /mobile_api/v1/customer/login Логин
 * @apiName LoginCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} phone Телефонный номер в формате +9999999999
  * @apiParam {String} code  Код из смс
 * @apiParam {String} [referral] Referral code
 * @Description Для номеров, которые начинаются с +7000 код устанавливается 0000
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "user": {
            "id": "5df1950fd990683456d28d1c",
            "name": null,
            "photo": null,
            "lat": null,
            "lon": null
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjcwMDA5OTk5OTk4IiwiaWQiOiI1ZGYxOTUwZmQ5OTA2ODM0NTZkMjhkMWMiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE1Nzc0MTY1MTh9.Y2FkuFEBSoAZFnq1g2qIQ5AP0Oc8iHtVcRKOkIvSrQU"
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Input error // отсутствуют необходимые параметры
 *     {"status":"ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 *     HTTP/1.1 200 OK // Неверный код
 *    {"status": "ERROR", "error": "WRONG_CODE", "data": null }
 *     HTTP/1.1 200 OK // Пользователь забанен
 *    {"status":"ERROR", "error":"BANNED" }
 */

router.post('/login', async function (req, res) {
    if(!req.body  || !req.body.phone || !req.body.code ) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' , data: null});
    }
    let tmp_body =  {
        phone: req.body.phone,
        code: req.body.code
      };
      if(req.body.referral)
        tmp_body.referral = req.body.referral;
        
    publisher.sendTask( 'customer_login', req, res,tmp_body);
});


/** @api {get} /mobile_api/v1/customer/me получить мой профиль
 * @apiName getMyProfileCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "id": "5df1950fd990683456d28d1c",
        "name": null,
        "photo": null,
        "lat": null,
        "lon": null
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Неверный токен
 *     {"status":"ERROR", "error": "AUTH_ERROR"}

 */
router.get('/me', async function (req, res) {
  console.log("GOT REQUEST  ON WORKER ",process.pid)
    publisher.sendTask( 'get_customer_me', req, res,{});
});

/** @api {put} /mobile_api/v1/customer/me Редактировать мой профиль
 * @apiName EditMeCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} x-access-token Users access-token.

 * @apiParam {String} [name] Имя пользователя
 * @apiParam {String} [surname] Фамилия пользователя
 * * @apiParam {String} [second_name] Отчество пользователя
 * @apiParam {String} [about] О себе
 * @apiParam {Boolean} [sex] Пол пользователя
 * @apiParam {String} [photo] Путь к загруженному фото на сервере

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "id": "5df1950fd990683456d28d1c",
        "name": "My NAME",
        "photo": null,
        "lat": null,
        "lon": null
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 400 Input error // отсутствуют необходимые параметры
 * { "status":"ERROR", "error": "MISSING_INPUT_PARAMETERS" }
 * HTTP/1.1 200 OK // Пльзователь с таким номером телефона отсутствует
 * { "status": "ERROR", "error": "CUSTOMER_NOT_FOUND"}
 */
router.put('/me', async function (req, res) {
    if(!req.body) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS', data:null });
    }

    console.log("put me ", req.body)
    delete req.body.id;
    delete req.body.phone;
    delete req.body.code;

    publisher.sendTask( 'update_customer_me', req, res,req.body);
});

/** @api {put} /mobile_api/v1/customer/push_token Set push token
 * @apiName EditCustomerrPushToken
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} x-access-token Users access-token.

 * @apiParam {String} os IOS/ANDROID
  * @apiParam {String} udid device UDID
  * @apiParam {String} push_token Push token string
  *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {status:"ERROR", error: "AUTH_ERROR"}
 */
router.put('/push_token', async function (req, res) {
    if(!req.body) {
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS', data:null });
    }
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" )
    return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'update_customer_push_token', req, res,req.body);
});

/** @api {get} /mobile_api/v1/customer/cards Получить мои банковские карты
 * @apiName getMyCardsCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": [
        {
            "id": 1,
            "default_card": true,
            "first6": "333333",
            "last4": "4444",
            "expiry_month": "12",
            "expiry_year": "23",
            "card_type": "MasterCard"
        }
    ]
    }
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { "status":"ERROR", "error": 'AUTH_ERROR' }
 */
router.get('/cards', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'customer_get_my_cards', req, res, {});
});

/** @api {put} /mobile_api/v1/customer/cards/:id Сделать карту "по умолчанию"
 * @apiName putMyCardCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": "",
    "data": {
            "id": 1,
            "default_card": true,
            "first6": "333333",
            "last4": "4444",
            "expiry_month": "12",
            "expiry_year": "23",
            "card_type": "MasterCard"
        }
    }
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { status:"ERROR", error: 'AUTH_ERROR' }
 * HTTP/1.1 200 Input error // данная карта отсутствует в системе
 * { status:"ERROR", error: 'NO_SUCH_CARD' }
 */
router.put('/cards/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    let input_data = req.body;
    input_data._id = id;

    publisher.sendTask( 'customer_update_card', req, res, input_data);
});

/** @api {get} /mobile_api/v2/customer/new_card Получить форму для добавления новой карты
 * @apiName newCustomerCardForm
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "message": "",
    "data": {
        "opcode": 1,
        "merchant_site": 2000637,
        "merchant_uid": 2468,
        "currency": 643,
        "amount": 1,
        "cf4": "CUSTOMER",
        "cf2": 2,
        "cf3": "1;0",
        "cf1": "+380988864940",
        "callback_url": "https://api.topjob.online/qiwi/callback/wpf",
        "sign": "46c5c8d2f170ac476aa88d920747506cef60d376b0d46a52ee08fc3407d38f46"
        }
    }
 */
router.get('/new_card', async function(req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER")
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'customer_get_new_card_form', req, res, {});
});

/** @api {delete} /mobile_api/v1/customer/cards/:id Удалить мою карту
 * @apiName deleteMyCardCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": "",
    "data": []
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { status:"ERROR", error: 'AUTH_ERROR' }
 * HTTP/1.1 200 Input error // данная карта отсутствует в системе
 * { status:"ERROR", error: 'NO_SUCH_CARD' }
 */
router.delete('/cards/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'customer_delete_card', req, res,
        {
            _id: id
        });
});

/** @api {post} /mobile_api/v2/customer/promo Активировать промо код
 * @apiName ActivatePromoCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} [code] Промо код

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
        "status": "OK",
        "error": "",
        "data": {

        }
    }
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { "status":"ERROR", "error": 'AUTH_ERROR' }
 * HTTP/1.1 400 Input "error" // отсутствуют необходимые параметры
 * { "status":"ERROR", "error": 'MISSING_INPUT_PARAMETERS' }
 * HTTP/1.1 200 OK // Пльзователь с таким номером телефона отсутствует
 * {"status": "ERROR",    "error": "NO_SUCH_PROMO"}
 */
router.post('/promo', async function(req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.body || !req.body.code)
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'customer_activate_promo', req, res, req.body);

});

/** @api {get} /mobile_api/v2/customer/referral_history Получить историю начислений от рефералов
 * @apiName GetCustomerReferralHistory
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
        "status": "OK",
        "error": "",
        "data": [
            {
                order_id: "0df1950fd990683456d2999c",
                summ: "100",
                date:  "2019-12-27T03:14:26.822Z",
                user_type: "CUSTOMER",
                user: {
                    id: "5df1950fd990683456d28d1c",
                    phone: "+700000000"
                }
            }
        ]
    }
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/referral_history', async function(req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'customer_referral_history', req, res, {});

});

/** @api {get} /mobile_api/v2/customer/referral_transfer Перевод накоплений в баланс
 * @apiName CustomerReferralTransfer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
        "status": "OK",
        "error": "",
        "data": []
    }
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 Input error // неверный токен
 * { status:"ERROR", error: 'AUTH_ERROR' }
 */
router.get('/referral_transfer', async function(req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = {};
    if(req.body.amount){
        data.ammount = req.body.ammount;
    }

    publisher.sendTask( 'customer_referral_transfer', req, res, data);

});



/** @api {post} /mobile_api/v1/customer/location Установить текущее местоположение
 * @apiName setLocationCustomer
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
  *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {Decimal} lat Latitude
  * @apiParam {Decimal} lon  Longetude
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
            "id": "5df1950fd990683456d28d1c",
            "name": null,
            "photo": null,
            "lat": 23.2332,
            "lon": 48.224324
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Input error // отсутствуют необходимые параметры
 *     {"status":"ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 */

router.post('/location', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" ||!req.body )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {lat, lon} = req.body;

    if(!lat || !lon)
        return res.status(200).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'customer_set_location', req, res, {lat, lon});
});



/** @api {post} /mobile_api/v1/customer/referral_link получить реферральную ссылку
 * @apiName getReferralLink
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
  *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "url": "http://localhost:3000/deep_link/EC4a7nq1oNqG7hPlllh2xwiKjPH421MR7"
    }
}

 */

router.get('/referral_link', async function(req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = {};
    

    publisher.sendTask( 'customer_referral_link', req, res, data);
});

router.get('/:customer_id/marks', async function (req, res, next) {

    publisher.sendTask( 'get_customer_marks', req, res, {customer_id: req.params.customer_id});
});

/** @api {post} /mobile_api/v1/customer/refill Получить форму для пополнения счета
 * @apiName customerGetRefillForm
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {Decimal} amount Amount
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "opcode": 1,
        "merchant_site": 2000637,
        "merchant_uid": 2468,
        "currency": 643,
        "amount": 1000.00,
        "cf4": "CUSTOMER",
        "cf2": 2,
        "cf3": "1;0",
        "cf1": "+380988864940",
        "callback_url": "https://api.topjob.online/qiwi/callback/refill",
        "sign": "46c5c8d2f170ac476aa88d920747506cef60d376b0d46a52ee08fc3407d38f46"
        }
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Input error // отсутствуют необходимые параметры
 *     {"status":"ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 */
router.post('/refill', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="CUSTOMER" ||!req.body )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.body.amount)
        return res.status(200).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'customer_get_refill_form', req, res, {amount: req.body.amount});
});


module.exports = router;
