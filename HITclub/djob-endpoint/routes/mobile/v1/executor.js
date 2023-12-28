var express = require('express');
var router = express.Router();
var publisher = require('../../../libs/publisher');


/** @api {post} /mobile_api/v1/executor/logout Log out
 * @apiName ExecutorLogout
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
* @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Responfinancial_operationse:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {}
}

 */
router.post('/logout', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
    return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });


    publisher.sendTask( 'executor_logout', req, res,
    {});

});

/** @api {post} /mobile_api/v1/executor/send_code Отправить смс с кодом
 * @apiName SendCodeExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} phone Телефонный номер в формате +9999999999
 * @Description Для номеров, которые начинаются с +7000 код устанавливается 0000
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": "CODE_SENT",
    "data": {
        "code_resend_available": true,
        "next_login_sms_available_time": "2019-05-07T12:02:33+0300",
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

        publisher.sendTask( 'executor_send_code', req, res,
        {
          phone: req.body.phone
        });

});

/** @api {post} /mobile_api/v1/executor/login Логин
 * @apiName LoginExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} phone Телефонный номер в формате +9999999999
  * @apiParam {String} code  Код из смс
* @apiParam {String} [referral] Referral code
 * @Description status в корне ответа может принимать разные значения в зависимости от текущего статуса регистрации исполнителя ( REG_REJECTED WAITING_REG_APPROVE REG_NEEDED OK)
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK ПОльзователь успешно зарегистрирован
 * {
    "status": "OK",
    "error": null,
    "data": {
        "user": {
            "name": "Фамилия имя отчество",
            "phone": "+70009110001",
            "photo": null,
            "inn": "012323324332",
            "passport": {
                "series": "VV",
                "number": "456098",
                "code": "911",
                "issued_by": "Kalinin r-n",
                "main_photo": "somephoto.png",
                "registration_photo": "somephoto.gif"
            },
            "city": "Мой Город",
            "about": "SOME INFO ABOUT ME!!!",
            "registered": 1,
            "status": false,
            "balance": {
                "$numberDecimal": "-810"
            },
            "bonus_balance": {
                "$numberDecimal": "-810"
            },
            "specialities": [
                {
                    "id": "5df4273c96a789240b244df4",
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
                    "orders_count": 0,
                    "rate": 0,
                    "vote_count": 0,
                    "summ_rate": 0,
                    "workplace": true,
                    "on_departure": true,
                    "certificates": [],
                    "hourly_rate_price": 100,
                    "hourly_rate_enabled": true,
                    "fixed_rate_price": 1000,
                    "fixed_rate_enabled": true,
                    "enabled": true,
                    "rate_type_for_now": "HOURLY"
                },
                {
                    "id": "5df43c6827e012556b284964",
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
                    "orders_count": 0,
                    "rate": 0,
                    "vote_count": 0,
                    "summ_rate": 0,
                    "workplace": false,
                    "on_departure": false,
                    "certificates": [],
                    "hourly_rate_price": 0,
                    "hourly_rate_enabled": false,
                    "fixed_rate_price": 0,
                    "fixed_rate_enabled": false,
                    "enabled": true,
                    "rate_type_for_now": "HOURLY"
                }
            ],
            "office": {
                "id": "5df438c27db8d75491cd10ff",
                "name": "Some office address",
                "lon": {
                    "$numberDecimal": "30.3242"
                },
                "lat": {
                    "$numberDecimal": "33.3234"
                },
                "front": null,
                "code": null,
                "floor": null
            }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwOTExMDAwMSIsImlkIjoiNWRmNDI3MGU5NmE3ODkyNDBiMjQ0ZGYyIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTc3NDE4NDE0fQ.Whxcx0kLs83F98vtmKWspupLH0qVou18UY4RxPbbNic"
    }
}

*     HTTP/1.1 200 OK Необходима регистрация
*{
    "status": "REG_NEEDED",
    "error": null,
    "data": {
        "user": {
            "name": null,
            "phone": "+70001111111",
            "photo": null,
            "inn": null,
            "sex": null,
            "passport": {
                "series": null,
                "number": null,
                "code": null,
                "issued_by": null,
                "main_photo": null,
                "registration_photo": null,
                "selfy_photo": null
            },
            "city": null,
            "about": null,
            "registered": 0,
            "status": false,
            "balance": {
                "$numberDecimal": "0"
            },
            "bonus_balance": {
                "$numberDecimal": "0"
            },
            "specialities": [],
            "office": null,
            "organization": null,
            "rate": "0",
            "referral_code": "E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8"
    }
}



*     HTTP/1.1 200 OK Ожидается проверка регистрации администрацией
*{
    "status": "WAITING_REG_APPROVE",
    "error": null,
    "data": {
        "user": {
            "name": null,
            "phone": "+70001111111",
            "photo": null,
            "inn": null,
            "sex": null,
            "passport": {
                "series": null,
                "number": null,
                "code": null,
                "issued_by": null,
                "main_photo": null,
                "registration_photo": null,
                "selfy_photo": null
            },
            "city": null,
            "about": null,
            "registered": 0,
            "status": false,
            "balance": {
                "$numberDecimal": "0"
            },
            "bonus_balance": {
                "$numberDecimal": "0"
            },
            "specialities": [],
            "office": null,
            "organization": null,
            "rate": "0",
            "referral_code": "E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8"
    }
}



*     HTTP/1.1 200 OK Регистрация отклонена администрацией
*{
    "status": "REG_REJECTED",
    "error": null,
    "data": {
        "reject_reason":"Причина отказа",
        "user": {
            "name": null,
            "phone": "+70001111111",
            "photo": null,
            "inn": null,
            "sex": null,
            "passport": {
                "series": null,
                "number": null,
                "code": null,
                "issued_by": null,
                "main_photo": null,
                "registration_photo": null,
                "selfy_photo": null
            },
            "city": null,
            "about": null,
            "registered": 0,
            "status": false,
            "balance": {
                "$numberDecimal": "0"
            },
            "bonus_balance": {
                "$numberDecimal": "0"
            },
            "specialities": [],
            "office": null,
            "organization": null,
            "rate": "0",
            "referral_code": "E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8"
    }
}

*     HTTP/1.1 200 OK Регистрация отклонена и заблокированна
*{
    "status": "REG_BANNED",
    "error": null,
    "data":{}
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Input error // отсутствуют необходимые параметры
 *     {"status":"ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 *     HTTP/1.1 200 OK // Неверный код
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
        
    publisher.sendTask( 'executor_login', req, res,tmp_body);

});

/** @api {post} /mobile_api/v1/executor/login_by_token Логин по токену
 * @apiName LoginByTokenExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
  *   @apiHeader {String} x-access-token Users access-token.
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK ПОльзователь успешно зарегистрирован
 * {
    "status": "OK",
    "error": null,
    "data": {
        "user": {
            "name": "Фамилия имя отчество",
            "phone": "+70009110001",
            "photo": null,
            "inn": "012323324332",
            "passport": {
                "series": "VV",
                "number": "456098",
                "code": "911",
                "issued_by": "Kalinin r-n",
                "main_photo": "somephoto.png",
                "registration_photo": "somephoto.gif"
            },
            "city": "Мой Город",
            "about": "SOME INFO ABOUT ME!!!",
            "registered": 1,
            "status": false,
            "balance": {
                "$numberDecimal": "-810"
            },
            "bonus_balance": {
                "$numberDecimal": "-810"
            },
            "specialities": [
                {
                    "id": "5df4273c96a789240b244df4",
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
                    "orders_count": 0,
                    "rate": 0,
                    "vote_count": 0,
                    "summ_rate": 0,
                    "workplace": true,
                    "on_departure": true,
                    "certificates": [],
                    "hourly_rate_price": 100,
                    "hourly_rate_enabled": true,
                    "fixed_rate_price": 1000,
                    "fixed_rate_enabled": true,
                    "enabled": true,
                    "rate_type_for_now": "HOURLY"
                },
                {
                    "id": "5df43c6827e012556b284964",
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
                    "orders_count": 0,
                    "rate": 0,
                    "vote_count": 0,
                    "summ_rate": 0,
                    "workplace": false,
                    "on_departure": false,
                    "certificates": [],
                    "hourly_rate_price": 0,
                    "hourly_rate_enabled": false,
                    "fixed_rate_price": 0,
                    "fixed_rate_enabled": false,
                    "enabled": true,
                    "rate_type_for_now": "HOURLY"
                }
            ],
            "office": {
                "id": "5df438c27db8d75491cd10ff",
                "name": "Some office address",
                "lon": {
                    "$numberDecimal": "30.3242"
                },
                "lat": {
                    "$numberDecimal": "33.3234"
                },
                "front": null,
                "code": null,
                "floor": null
            }
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwOTExMDAwMSIsImlkIjoiNWRmNDI3MGU5NmE3ODkyNDBiMjQ0ZGYyIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTc3NDE4NDE0fQ.Whxcx0kLs83F98vtmKWspupLH0qVou18UY4RxPbbNic"
    }
}

*     HTTP/1.1 200 OK Необходима регистрация
*{
    "status": "REG_NEEDED",
    "error": null,
    "data": {
        "user": {
            "name": null,
            "phone": "+70001111111",
            "photo": null,
            "inn": null,
            "sex": null,
            "passport": {
                "series": null,
                "number": null,
                "code": null,
                "issued_by": null,
                "main_photo": null,
                "registration_photo": null,
                "selfy_photo": null
            },
            "city": null,
            "about": null,
            "registered": 0,
            "status": false,
            "balance": {
                "$numberDecimal": "0"
            },
            "bonus_balance": {
                "$numberDecimal": "0"
            },
            "specialities": [],
            "office": null,
            "organization": null,
            "rate": "0",
            "referral_code": "E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8"
    }
}



*     HTTP/1.1 200 OK Ожидается проверка регистрации администрацией
*{
    "status": "WAITING_REG_APPROVE",
    "error": null,
    "data": {
        "user": {
            "name": null,
            "phone": "+70001111111",
            "photo": null,
            "inn": null,
            "sex": null,
            "passport": {
                "series": null,
                "number": null,
                "code": null,
                "issued_by": null,
                "main_photo": null,
                "registration_photo": null,
                "selfy_photo": null
            },
            "city": null,
            "about": null,
            "registered": 0,
            "status": false,
            "balance": {
                "$numberDecimal": "0"
            },
            "bonus_balance": {
                "$numberDecimal": "0"
            },
            "specialities": [],
            "office": null,
            "organization": null,
            "rate": "0",
            "referral_code": "E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8"
    }
}



*     HTTP/1.1 200 OK Регистрация отклонена администрацией
*{
    "status": "REG_REJECTED",
    "error": null,
    "data": {
        "reject_reason":"Причина отказа",
        "user": {
            "name": null,
            "phone": "+70001111111",
            "photo": null,
            "inn": null,
            "sex": null,
            "passport": {
                "series": null,
                "number": null,
                "code": null,
                "issued_by": null,
                "main_photo": null,
                "registration_photo": null,
                "selfy_photo": null
            },
            "city": null,
            "about": null,
            "registered": 0,
            "status": false,
            "balance": {
                "$numberDecimal": "0"
            },
            "bonus_balance": {
                "$numberDecimal": "0"
            },
            "specialities": [],
            "office": null,
            "organization": null,
            "rate": "0",
            "referral_code": "E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8"
    }
}
*     HTTP/1.1 200 OK Регистрация отклонена и заблокированна
*{
    "status": "REG_BANNED",
    "error": null,
    "data":{}
}
 */
router.post('/login_by_token', async function (req, res) {
    publisher.sendTask( 'executor_login_by_token', req, res,
    {
    });
});

/** @api {post} /mobile_api/v1/executor/registration Регистрация
 * @apiName RegistrationExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
  *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} name Имя
 * @apiParam {String} second_name Отчество
 * @apiParam {String} surname Фамилия
 * @apiParam {String} city Город
 * @apiParam {String} about О себе
 * @apiParam {String} photo Фото\Аватарка
 * @apiParam {String} inn ИНН
 * @apiParam {Object} passport Объект паспорта
 * @apiParam {String} passport.series Серия
 * @apiParam {String} passport.number Номер
 * @apiParam {String} passport.code Код
 * @apiParam {String} passport.selfy_photo selfy_photo
 * @apiParam {String} passport.issued_by Кем выдан
 * @apiParam {String} passport.main_photo Фото паспорта с фото
 * @apiParam {String} passport.registration_photo Фото паспорта с регистрацией


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "user": {
            "name": "Фамилия имя отчество",
            "phone": "+70009110001",
            "photo": null,
            "inn": "012323324332",
            "passport": {
                "series": "VV",
                "number": "456098",
                "code": "911",
                "issued_by": "Kalinin r-n",
                "main_photo": "somephoto.png",
                "registration_photo": "somephoto.gif"
            },
            "city": "Мой Город",
            "about": "SOME INFO ABOUT ME!!!",
            "registered": 1,
            "status": false,
            "balance": {
                "$numberDecimal": "-810"
            },
            "bonus_balance": {
                "$numberDecimal": "-810"
            },
            "specialities": [
                {
                    "id": "5df4273c96a789240b244df4",
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
                    "orders_count": 0,
                    "rate": 0,
                    "vote_count": 0,
                    "summ_rate": 0,
                    "workplace": true,
                    "on_departure": true,
                    "certificates": [],
                    "hourly_rate_price": 100,
                    "hourly_rate_enabled": true,
                    "fixed_rate_price": 1000,
                    "fixed_rate_enabled": true,
                    "enabled": true,
                    "rate_type_for_now": "HOURLY"
                },
                {
                    "id": "5df43c6827e012556b284964",
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
                    "orders_count": 0,
                    "rate": 0,
                    "vote_count": 0,
                    "summ_rate": 0,
                    "workplace": false,
                    "on_departure": false,
                    "certificates": [],
                    "hourly_rate_price": 0,
                    "hourly_rate_enabled": false,
                    "fixed_rate_price": 0,
                    "fixed_rate_enabled": false,
                    "enabled": true,
                    "rate_type_for_now": "HOURLY"
                }
            ],
            "office": {
                "id": "5df438c27db8d75491cd10ff",
                "name": "Some office address",
                "lon": {
                    "$numberDecimal": "30.3242"
                },
                "lat": {
                    "$numberDecimal": "33.3234"
                },
                "front": null,
                "code": null,
                "floor": null
            }
        }
      }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Input error // отсутствуют необходимые параметры
 *     {"status":"ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 *     HTTP/1.1 200 OK // Регистрация пользователя ранее была подтверждена
 *    {"status":"ERROR", "error":"ALREADY_REGISTERED" }
 *    HTTP/1.1 200 OK // Пользователь забанен, регистрация невозможна
 *    {"status":"ERROR", "error":"BANNED" }
 */

router.post('/registration', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR" || !req.body)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;
    if(!input_data.name || !input_data.second_name || !input_data.surname || !input_data.city || !input_data.about
      /*|| !input_data.inn*/
       || !input_data.passport )
      return res.status(401).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    if(!input_data.passport.series || !input_data.passport.number  || !input_data.passport.code  || !input_data.passport.issued_by
     || !input_data.passport.main_photo  || !input_data.passport.registration_photo)
      return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
    delete input_data.createdAt;
    delete input_data.code;
    delete input_data.phone;
    delete input_data.id;
    delete input_data.registered;
    delete input_data.status;
    delete input_data.active_order_id;
    delete input_data.balance;
    delete input_data.yandex_balance;
    delete input_data.passport_status;

    publisher.sendTask( 'executor_registration', req, res, input_data);
});


/** @api {get} /mobile_api/v1/executor/me Получить мой профиль
 * @apiName getMyProfileExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "name": "Фамилия имя отчество",
        "phone": "+70009110001",
        "photo": null,
        "inn": "012323324332",
        "passport": {
            "series": "VV",
            "number": "456098",
            "code": "911",
            "issued_by": "Kalinin r-n",
            "main_photo": "somephoto.png",
            "registration_photo": "somephoto.gif"
        },
        "city": "Мой Город",
        "about": "SOME INFO ABOUT ME!!!",
        "registered": 1,
        "status": false,
        "balance": {
            "$numberDecimal": "-810"
        },
        "bonus_balance": {
            "$numberDecimal": "-810"
        },
        "specialities": [
            {
                "id": "5df4273c96a789240b244df4",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": true,
                "on_departure": true,
                "certificates": [],
                "hourly_rate_price": 100,
                "hourly_rate_enabled": true,
                "fixed_rate_price": 1000,
                "fixed_rate_enabled": true,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            },
            {
                "id": "5df43c6827e012556b284964",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": false,
                "on_departure": false,
                "certificates": [],
                "hourly_rate_price": 0,
                "hourly_rate_enabled": false,
                "fixed_rate_price": 0,
                "fixed_rate_enabled": false,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            }
        ],
        "office": {
            "id": "5df438c27db8d75491cd10ff",
            "name": "Some office address",
            "lon": {
                "$numberDecimal": "30.3242"
            },
            "lat": {
                "$numberDecimal": "33.3234"
            },
            "front": null,
            "code": null,
            "floor": null
        }
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 Неверный токен
 *     {"status":"ERROR", "error": "AUTH_ERROR"}

 */

router.get('/me', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR" || !req.body)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    publisher.sendTask( 'executor_get_profile', req, res, {});
});

/** @api {put} /mobile_api/v1/executor/me Редактировать мой профиль
 * @apiName EditExecutorProfile
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} x-access-token Users access-token.

 * @apiParam {String} [name] Имя пользователя
  * @apiParam {String} [second_name] Отчество
  * @apiParam {String} [surname] Фамилия
* @apiParam {String} [sex] Пол
 * @apiParam {String} [photo] Путь к загруженному фото на сервере
 * @apiParam {String} [about] О себе
 * @apiParam {String} [city] Город

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "name": "Фамилия имя отчество12312",
        "phone": "+70009110001",
        "photo": null,
        "inn": "012323324332",
        "passport": {
            "series": "VV",
            "number": "456098",
            "code": "911",
            "issued_by": "Kalinin r-n",
            "main_photo": "somephoto.png",
            "registration_photo": "somephoto.gif"
        },
        "city": "Мой Город",
        "about": "SOME INFO ABOUT ME!!!",
        "registered": 2,
        "status": false,
        "balance": {
            "$numberDecimal": "-810"
        },
        "bonus_balance": {
            "$numberDecimal": "-810"
        },
        "specialities": [
            {
                "id": "5df4273c96a789240b244df4",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": true,
                "on_departure": true,
                "certificates": [],
                "hourly_rate_price": 100,
                "hourly_rate_enabled": true,
                "fixed_rate_price": 1000,
                "fixed_rate_enabled": true,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            },
            {
                "id": "5df43c6827e012556b284964",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": false,
                "on_departure": false,
                "certificates": [],
                "hourly_rate_price": 0,
                "hourly_rate_enabled": false,
                "fixed_rate_price": 0,
                "fixed_rate_enabled": false,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            }
        ],
        "office": {
            "id": "5df438c27db8d75491cd10ff",
            "name": "Some office address",
            "lon": {
                "$numberDecimal": "30.3242"
            },
            "lat": {
                "$numberDecimal": "33.3234"
            },
            "front": null,
            "code": null,
            "floor": null
        }
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {status:"ERROR", error: "AUTH_ERROR"}
 * HTTP/1.1 200 // регистрация не подтверждена
 * {status:"ERROR", error: "HAVE_NO_PERMISSIONS"}
 */
router.put('/me', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR" || !req.body)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;
    delete input_data.createdAt;
    delete input_data.code;
    delete input_data.phone;
    delete input_data.id;
    delete input_data.registered;
    delete input_data.status;
    delete input_data.active_order_id;
    delete input_data.balance;

    publisher.sendTask( 'executor_save_profile', req, res, input_data);
});

/** @api {put} /mobile_api/v1/executor/push_token Set push token
 * @apiName EditExecutorPushToken
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
    return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'update_executor_push_token', req, res,req.body);
});


/** @api {post} /mobile_api/v1/executor/speciality Добавить специальность
 * @apiName AddExecutorSpeciality
 * @apiGroup ExecutorrMain
 * @apiVersion 1.0.0
 *
  * @apiParam {String} specialty_id id Специальности
 * @apiParam {Boolean} workplace Работа на оффисе
 * @apiParam {Boolean} on_departure Работа на выезде
 * @apiParam {Number} hourly_rate_price Почасовый тариф
 * @apiParam {Number} fixed_rate_price Фиксованный тариф
 * @apiParam {Boolean} hourly_rate_enabled Статус почасового тарифа (0 или 1)
 * @apiParam {Boolean} fixed_rate_enabled Статус фиксированного тарифа (0 или 1)
 * @apiParam {Boolean} enabled Статус (0 или 1)
 * @apiParam {String} rate_type_for_now Тариф для выполнения заказов "на сейчас" ( HOURLY / FIXED)
 * @apiParam {ArrayOfString} certificates Массив фотографий сертификатов
 *
 * @Description Для номеров, которые начинаются с +7000 код устанавливается 0000
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * {
    "status": "OK",
    "error": null,
    "data": {
        "id": "5e11b1ac821e25693b00ca2e",
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
        "orders_count": 0,
        "rate": 0,
        "vote_count": 0,
        "summ_rate": 0,
        "workplace": true,
        "on_departure": true,
        "certificates": [],
        "hourly_rate_price": 0,
        "hourly_rate_enabled": false,
        "fixed_rate_price": 0,
        "fixed_rate_enabled": false,
        "enabled": true,
        "rate_type_for_now": "HOURLY"
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {"status":"ERROR", "error": "AUTH_ERROR"}
 * HTTP/1.1 200 OK // отсутствуют необходимые параметры
 * {"status": "ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 */
router.post('/speciality', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR" || !req.body)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let input_data = req.body;

    publisher.sendTask( 'executor_add_speciality', req, res, input_data);
});

/** @api {put} /mobile_api/v1/executor/speciality/:id Редактировать специальность
 * @apiName EditExecutorSpeciality
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id id Спеиальности  Исполнителя
 * @apiParam {Boolean} workplace Работа на оффисе
 * @apiParam {Boolean} on_departure Работа на выезде
 * @apiParam {Number} hourly_rate_price Почасовый тариф
 * @apiParam {Number} fixed_rate_price Фиксованный тариф
 * @apiParam {Boolean} hourly_rate_enabled Статус почасового тарифа (0 или 1)
 * @apiParam {Boolean} fixed_rate_enabled Статус фиксированного тарифа (0 или 1)
 * @apiParam {Boolean} enabled Статус (0 или 1)
 * @apiParam {String} rate_type_for_now Тариф для выполнения заказов "на сейчас" ( HOURLY / FIXED)
 * @apiParam {ArrayOfString} certificates Массив фотографий сертификатов
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "id": "5e11b1ac821e25693b00ca2e",
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
        "orders_count": 0,
        "rate": 0,
        "vote_count": 0,
        "summ_rate": 0,
        "workplace": true,
        "on_departure": true,
        "certificates": [],
        "hourly_rate_price": 0,
        "hourly_rate_enabled": false,
        "fixed_rate_price": 0,
        "fixed_rate_enabled": false,
        "enabled": false,
        "rate_type_for_now": "HOURLY"
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {"status":"ERROR", "error": "AUTH_ERROR"}
 * HTTP/1.1 200 OK // отсутствуют необходимые параметры
 * {"status": "ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 */
router.put('/speciality/:id', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR" || !req.body)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let {id} = req.params;
    let input_data = req.body;
    input_data.id = id;

    publisher.sendTask( 'executor_update_speciality', req, res, input_data);
});

/** @api {delete} /mobile_api/v1/executor/speciality/:id Удалить специальность
 * @apiName DeleteExecutorSpeciality
 * @apiGroup CustomerMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id id Спеиальности  Исполнителя

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {"status":"ERROR", "error": "AUTH_ERROR"}
 * HTTP/1.1 200 OK // отсутствуют необходимые параметры
 * {"status": "ERROR", "error": "SPECIALITY_NOT_FOUND"}
 */
router.delete('/speciality/:id', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user || req.input_user.user.role !== "EXECUTOR" || !req.body)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});

    let {id} = req.params;
    let input_data = {id};

    publisher.sendTask( 'executor_delete_speciality', req, res, input_data);
});

/** @api {post} /mobile_api/v1/executor/location Установить местположение
 * @apiName setLocationExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {Double} lat Latitude
 * @apiParam {Double} lon Londitude

 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {status:"OK", error:""}
 * * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 401 Input error // неверный токен
 *   { status:"ERROR", error: 'AUTH_ERROR' }
 *   HTTP/1.1 200 Input error // Неправильные входные параметры
 *   { status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' }
 */
router.post('/location', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" ||!req.body  || !req.body.lat || !req.body.lon )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {lat, lon} = req.body;

    if(!lat || !lon)
        return res.status(200).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'executor_set_location', req, res, {lat, lon});
});



/** @api {put} /mobile_api/v1/executor/office Установить оффис
 * @apiName setExecutorOffice
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} name Текстовый адрес
 * @apiParam {Decimal} lat Широта
 * @apiParam {Decimal} lon Долгота
 * @apiParam {String} [front] Подъезд
 * @apiParam {String} [code] Код домофона
 * @apiParam {String} [floor] Этаж
* @apiParam {String} [flat] квартира
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {
    "status": "OK",
    "error": null,
    "data": {
        "name": "Фамилия имя отчество12312",
        "phone": "+70009110001",
        "photo": null,
        "inn": "012323324332",
        "passport": {
            "series": "VV",
            "number": "456098",
            "code": "911",
            "issued_by": "Kalinin r-n",
            "main_photo": "somephoto.png",
            "registration_photo": "somephoto.gif"
        },
        "city": "Мой Город",
        "about": "SOME INFO ABOUT ME!!!",
        "registered": 2,
        "status": false,
        "balance": {
            "$numberDecimal": "-810"
        },
        "bonus_balance": {
            "$numberDecimal": "-810"
        },
        "specialities": [
            {
                "id": "5df4273c96a789240b244df4",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": true,
                "on_departure": true,
                "certificates": [],
                "hourly_rate_price": 100,
                "hourly_rate_enabled": true,
                "fixed_rate_price": 1000,
                "fixed_rate_enabled": true,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            },
            {
                "id": "5df43c6827e012556b284964",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": false,
                "on_departure": false,
                "certificates": [],
                "hourly_rate_price": 0,
                "hourly_rate_enabled": false,
                "fixed_rate_price": 0,
                "fixed_rate_enabled": false,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            },
            {
                "id": "5e11b1ac821e25693b00ca2e",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": true,
                "on_departure": true,
                "certificates": [],
                "hourly_rate_price": 0,
                "hourly_rate_enabled": false,
                "fixed_rate_price": 0,
                "fixed_rate_enabled": false,
                "enabled": true,
                "rate_type_for_now": "HOURLY"
            },
            {
                "id": "5e11b1ac821e25693b00ca2e",
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
                "orders_count": 0,
                "rate": 0,
                "vote_count": 0,
                "summ_rate": 0,
                "workplace": true,
                "on_departure": true,
                "certificates": [],
                "hourly_rate_price": 0,
                "hourly_rate_enabled": false,
                "fixed_rate_price": 0,
                "fixed_rate_enabled": false,
                "enabled": false,
                "rate_type_for_now": "HOURLY"
            }
        ],
        "office": {
            "id": "5e11b886821e25693b00ca63",
            "name": "Some office address",
            "lon": {
                "$numberDecimal": "30.3242"
            },
            "lat": {
                "$numberDecimal": "33.3234"
            },
            "front": null,
            "code": null,
            "floor": null
        }
    }
}
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {"status":"ERROR", "error": "AUTH_ERROR"}
 * HTTP/1.1 200 OK // отсутствуют необходимые параметры
 * {"status": "ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 */

router.post('/office', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" ||!req.body  || !req.body.lat || !req.body.lon )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {lat, lon, name} = req.body;

    if(!lat || !lon || !name)
        return res.status(200).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'executor_set_office', req, res, req.body);
});

/** @api {delete} /mobile_api/v1/executor/office Удалить оффис
 * @apiName deleteExecutorOffice
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 {
        "status": "OK",
        "error": null,
        "data": []
    }
 * * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 403 Input error // неверный токен
 * {"status":"ERROR", "error": "AUTH_ERROR"}
 * HTTP/1.1 200 OK // отсутствуют необходимые параметры
 * {"status": "ERROR", "error": "MISSING_INPUT_PARAMETERS"}
 */
router.delete('/office', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_remove_office', req, res, req.body);
});

/** @api {get} /mobile_api/v2/executor/referral_history Получить историю начислений от рефералов
 * @apiName GetExecutorReferralHistory
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   {
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_referral_history', req, res, {});

});

/** @api {get} /mobile_api/v2/executor/referral_transfer Перевод накоплений в баланс
 * @apiName ExecutorReferralTransfer
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = {};
    if(req.body.amount){
        data.ammount = req.body.ammount;
    }

    publisher.sendTask( 'executor_referral_transfer', req, res, data);
});

/** @api {post} /mobile_api/v1/executor/referral_link получить реферральную ссылку
 * @apiName getExecutorReferralLink
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let data = {};
    

    publisher.sendTask( 'executor_referral_link', req, res, data);
});

/** @api {post} /mobile_api/v1/executor/status Изменить текущий статус
 * @apiDescription 1 - занят, 0 - свободен
 * @apiName setStatusExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {Number} status ID статуса

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {status:"OK", error:"", data:{status:1}}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK Input error // слишком низкий баланс
 *     { status:"ERROR", error: 'CASH_BALANCE_TOO_LOW' }
 *
 */
router.post('/status', async function (req, res, next) {

    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" ||!req.body   )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {status} = req.body;

    publisher.sendTask( 'executor_set_status', req, res, {status});
});

/** @api {get} /mobile_api/v1/executor/cards Получить мои банковские карты
 * @apiName getMyCardsExecutor
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_get_my_cards', req, res, {});
});

/** @api {put} /mobile_api/v1/executor/cards/:id Сделать карту "по умолчанию"
 * @apiName putMyCardExecutor
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    let input_data = req.body;
    input_data._id = id;


    publisher.sendTask( 'executor_update_card', req, res, input_data);
});

/** @api {get} /mobile_api/v2/executor/new_card Получить форму для добавления новой карты
 * @apiName newExecutorCardForm
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_get_new_card_form', req, res, {});
});

/** @api {delete} /mobile_api/v1/executor/cards/:id Удалить мою карту
 * @apiName deleteMyCardExecutor
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'executor_delete_card', req, res,
        {
            _id: id
        });
});


router.get('/accept_invitation', async function (req, res, next) {
  if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR"  )
      return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_accept_invitation', req, res, {});
});

router.get('/decline_invitation', async function (req, res, next) {
  if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
      return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_decline_invitation', req, res, {});
});

router.get('/leave_organization', async function (req, res, next) {
  if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
      return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_leave_organization', req, res, {});
});

/** @api {get} /mobile_api/v1/executor/:id/marks Получить отзывы исполнителя
 * @apiName getExecutorMarks
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id id Исполнителя
* @apiParam {Number} offset Offset
* @apiParam {Number} limit Limit

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * 
 */
router.get('/:executor_id/marks', async function (req, res, next) {
    let {offset, limit} = req.query;
    if(!offset)
        offset = 0;
    else 
        offset = parseInt(offset);

    if(!limit)
        limit = 10;
    else 
        limit = parseInt(limit);


    publisher.sendTask( 'get_executor_marks', req, res, {executor_id: req.params.executor_id, offset, limit});
});

router.get('/test_socket_message', async function (req, res, next) {
    publisher.sendTask( 'send_test_socket', req, res, {});
});
/** @api {get} /mobile_api/v1/executor/:id Получить профиль исполнителя
 * @apiName getFullExecutorProfile
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id id Исполнителя
 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 * 
 */
router.get('/:executor_id', async function (req, res, next) {

    publisher.sendTask( 'get_executor_full_profile', req, res, {executor_id: req.params.executor_id});
});



/** @api {get} /mobile_api/v2/executor/wallet Получить моw кошелек
 * @apiName getWalletExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {status:"OK", message:"", data:
 *      {
           "wallet": {
               "phone": "2019-08-29T17:57:39+0300",
                "active": true,
                "confirmed": true
           },
           "bonus_balance": 100
           "discount_active": true,
            "discount": 5
       }
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", message: 'AUTH_ERROR' }
 *
 */
router.get('/wallet', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_get_wallet', req, res, {});
});

/** @api {post} /mobile_api/v2/executor/wallet Создать кошелек
 * @apiName addWalletExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} phone Телефон

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {status:"OK", message:"", data: {
 *      "createdAt": "2019-08-29T17:57:39+0300",
        "active": true,
        "confirmed": true,
        "id": 1,
        "user_id": 1,
        "user_type": "EXECUTOR",
        "phone": "+38098111111"
 *  }
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", message: 'AUTH_ERROR' }
 *     HTTP/1.1 400 Input error
 *     { status:"ERROR", message: 'MISSING_INPUT_PARAMETERS' }
 *     { status:"ERROR", message: 'WALLET_ALREADY_EXISTS' }
 *
 */
router.post('/wallet', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_create_wallet', req, res, {});
});

/** @api {put} /mobile_api/v2/executor/wallet/:id Редактировать кошелек
 * @apiName editWalletExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {String} phone Телефон

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {status:"OK", message:"", data: {
 *      "createdAt": "2019-08-29T17:57:39+0300",
        "active": true,
        "confirmed": true,
        "id": 1,
        "user_id": 1,
        "user_type": "EXECUTOR",
        "phone": "+38098111111"
 *  }
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", message: 'AUTH_ERROR' }
 *     HTTP/1.1 400 Input error
 *     { status:"ERROR", message: 'MISSING_INPUT_PARAMETERS' }
 *     { status:"ERROR", message: 'NO_SUCH_WALLET' }
 *
 */
router.put('/wallet/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_update_wallet', req, res, {id: req.params.id});
});

/** @api {delete} /mobile_api/v2/executor/wallet/:id Редактировать кошелек
 * @apiName addWalletExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *
 *   @apiHeader {String} x-access-token Users access-token.

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {status:"OK", message:"", data: {}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", message: 'AUTH_ERROR' }
 *     HTTP/1.1 400 Input error
 *     { status:"ERROR", message: 'NO_SUCH_WALLET' }
 *
 */
router.delete('/wallet/:id', async function (req, res, next) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'executor_delete_wallet', req, res, {id: req.params.id});
});


/** @api {post} /mobile_api/v1/executor/refill Получить форму для пополнения счета
 * @apiName executorGetRefillForm
 * @apiGroup ExecutorMain
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
        "cf4": "EXECUTOR",
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR" ||!req.body )
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.body.amount)
        return res.status(200).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'executor_get_refill_form', req, res, {amount: req.body.amount});
});


/** @api {post} /mobile_api/v1/executor/promo Активировать промо код
 * @apiName ActivatePromoExecutor
 * @apiGroup ExecutorMain
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
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="EXECUTOR")
        return res.status(401).json({ status:"ERROR", error: 'AUTH_ERROR' });

    if(!req.body || !req.body.code)
        return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });

    publisher.sendTask( 'executor_activate_promo', req, res, req.body);

});

module.exports = router;
