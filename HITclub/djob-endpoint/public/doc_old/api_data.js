define({ "api": [
  {
    "type": "post",
    "url": "/mobile_api/v2/customer/promo",
    "title": "Активировать промо код",
    "name": "ActivatePromoCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "code",
            "description": "<p>Промо код</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n       \"status\": \"OK\",\n       \"error\": \"\",\n       \"data\": {\n\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ \"status\":\"ERROR\", \"error\": 'AUTH_ERROR' }\nHTTP/1.1 400 Input \"error\" // отсутствуют необходимые параметры\n{ \"status\":\"ERROR\", \"error\": 'MISSING_INPUT_PARAMETERS' }\nHTTP/1.1 200 OK // Пльзователь с таким номером телефона отсутствует\n{\"status\": \"ERROR\",    \"error\": \"NO_SUCH_PROMO\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/customer/logout",
    "title": "Log out",
    "name": "CustomerLogout",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v2/customer/referral_transfer",
    "title": "Перевод накоплений в баланс",
    "name": "CustomerReferralTransfer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n       \"status\": \"OK\",\n       \"error\": \"\",\n       \"data\": []\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "delete",
    "url": "/mobile_api/v1/executor/speciality/:id",
    "title": "Удалить специальность",
    "name": "DeleteExecutorSpeciality",
    "group": "CustomerMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id Спеиальности  Исполнителя</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}\nHTTP/1.1 200 OK // отсутствуют необходимые параметры\n{\"status\": \"ERROR\", \"error\": \"SPECIALITY_NOT_FOUND\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/customer/push_token",
    "title": "Set push token",
    "name": "EditCustomerrPushToken",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "os",
            "description": "<p>IOS/ANDROID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "udid",
            "description": "<p>device UDID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "push_token",
            "description": "<p>Push token string</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{status:\"ERROR\", error: \"AUTH_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/customer/me",
    "title": "Редактировать мой профиль",
    "name": "EditMeCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Имя пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "surname",
            "description": "<p>Фамилия пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "second_name",
            "description": "<p>Отчество пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>О себе</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "sex",
            "description": "<p>Пол пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "photo",
            "description": "<p>Путь к загруженному фото на сервере</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"id\": \"5df1950fd990683456d28d1c\",\n        \"name\": \"My NAME\",\n        \"photo\": null,\n        \"lat\": null,\n        \"lon\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Input error // отсутствуют необходимые параметры\n{ \"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\" }\nHTTP/1.1 200 OK // Пльзователь с таким номером телефона отсутствует\n{ \"status\": \"ERROR\", \"error\": \"CUSTOMER_NOT_FOUND\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v2/customer/referral_history",
    "title": "Получить историю начислений от рефералов",
    "name": "GetCustomerReferralHistory",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n       \"status\": \"OK\",\n       \"error\": \"\",\n       \"data\": [\n           {\n               order_id: \"0df1950fd990683456d2999c\",\n               summ: \"100\",\n               date:  \"2019-12-27T03:14:26.822Z\",\n               user_type: \"CUSTOMER\",\n               user: {\n                   id: \"5df1950fd990683456d28d1c\",\n                   phone: \"+700000000\"\n               }\n           }\n       ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/customer/login",
    "title": "Логин",
    "name": "LoginCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефонный номер в формате +9999999999</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Код из смс</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "referral",
            "description": "<p>Referral code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"id\": \"5df1950fd990683456d28d1c\",\n            \"name\": null,\n            \"photo\": null,\n            \"lat\": null,\n            \"lon\": null\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjcwMDA5OTk5OTk4IiwiaWQiOiI1ZGYxOTUwZmQ5OTA2ODM0NTZkMjhkMWMiLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE1Nzc0MTY1MTh9.Y2FkuFEBSoAZFnq1g2qIQ5AP0Oc8iHtVcRKOkIvSrQU\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 200 Input error // отсутствуют необходимые параметры\n {\"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}\n HTTP/1.1 200 OK // Неверный код\n{\"status\": \"ERROR\", \"error\": \"WRONG_CODE\", \"data\": null }\n HTTP/1.1 200 OK // Пользователь забанен\n{\"status\":\"ERROR\", \"error\":\"BANNED\" }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/customer/send_code",
    "title": "Отправить смс с кодом",
    "name": "SendCodeCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефонный номер в формате +9999999999</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"code_resend_available\": true,\n        \"next_login_sms_available_time\": \"2019-12-27T03:14:26.822Z\",\n        \"sms_sent_count\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 200 Input error // отсутствуют необходимые параметры\n {\"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}\n HTTP/1.1 200 OK // Слишком рано для отправки СМС\n{\"status\": \"ERROR\", \"error\": \"NEXT_SMS_TIME_ERROR\", \"data\": {\"next_login_sms_available_time\": \"2019-05-07T11:52:37+0300\"} }\n HTTP/1.1 200 OK // Пользователь забанен\n{\"status\":\"ERROR\", \"error\":\"BANNED\" }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "delete",
    "url": "/mobile_api/v1/customer/cards/:id",
    "title": "Удалить мою карту",
    "name": "deleteMyCardCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": \"\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 Input error // данная карта отсутствует в системе\n{ status:\"ERROR\", error: 'NO_SUCH_CARD' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/customer/cards",
    "title": "Получить мои банковские карты",
    "name": "getMyCardsCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": 1,\n            \"default_card\": true,\n            \"first6\": \"333333\",\n            \"last4\": \"4444\",\n            \"expiry_month\": \"12\",\n            \"expiry_year\": \"23\",\n            \"card_type\": \"MasterCard\"\n        }\n    ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ \"status\":\"ERROR\", \"error\": 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/customer/me",
    "title": "получить мой профиль",
    "name": "getMyProfileCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"id\": \"5df1950fd990683456d28d1c\",\n        \"name\": null,\n        \"photo\": null,\n        \"lat\": null,\n        \"lon\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/customer/referral_link",
    "title": "получить реферральную ссылку",
    "name": "getReferralLink",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"url\": \"http://localhost:3000/deep_link/EC4a7nq1oNqG7hPlllh2xwiKjPH421MR7\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/customer/cards/:id",
    "title": "Сделать карту \"по умолчанию\"",
    "name": "putMyCardCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": \"\",\n    \"data\": {\n            \"id\": 1,\n            \"default_card\": true,\n            \"first6\": \"333333\",\n            \"last4\": \"4444\",\n            \"expiry_month\": \"12\",\n            \"expiry_year\": \"23\",\n            \"card_type\": \"MasterCard\"\n        }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 Input error // данная карта отсутствует в системе\n{ status:\"ERROR\", error: 'NO_SUCH_CARD' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/customer/location",
    "title": "Установить текущее местоположение",
    "name": "setLocationCustomer",
    "group": "CustomerMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lon",
            "description": "<p>Longetude</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n            \"id\": \"5df1950fd990683456d28d1c\",\n            \"name\": null,\n            \"photo\": null,\n            \"lat\": 23.2332,\n            \"lon\": 48.224324\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Input error // отсутствуют необходимые параметры\n{\"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/customer.js",
    "groupTitle": "CustomerMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/executor/me",
    "title": "Редактировать мой профиль",
    "name": "EditExecutorProfile",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Имя пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "second_name",
            "description": "<p>Отчество</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "surname",
            "description": "<p>Фамилия</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sex",
            "description": "<p>Пол</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "photo",
            "description": "<p>Путь к загруженному фото на сервере</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>О себе</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>Город</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"name\": \"Фамилия имя отчество12312\",\n        \"phone\": \"+70009110001\",\n        \"photo\": null,\n        \"inn\": \"012323324332\",\n        \"passport\": {\n            \"series\": \"VV\",\n            \"number\": \"456098\",\n            \"code\": \"911\",\n            \"issued_by\": \"Kalinin r-n\",\n            \"main_photo\": \"somephoto.png\",\n            \"registration_photo\": \"somephoto.gif\"\n        },\n        \"city\": \"Мой Город\",\n        \"about\": \"SOME INFO ABOUT ME!!!\",\n        \"registered\": 2,\n        \"status\": false,\n        \"balance\": {\n            \"$numberDecimal\": \"-810\"\n        },\n        \"bonus_balance\": {\n            \"$numberDecimal\": \"-810\"\n        },\n        \"specialities\": [\n            {\n                \"id\": \"5df4273c96a789240b244df4\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": true,\n                \"on_departure\": true,\n                \"certificates\": [],\n                \"hourly_rate_price\": 100,\n                \"hourly_rate_enabled\": true,\n                \"fixed_rate_price\": 1000,\n                \"fixed_rate_enabled\": true,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            },\n            {\n                \"id\": \"5df43c6827e012556b284964\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": false,\n                \"on_departure\": false,\n                \"certificates\": [],\n                \"hourly_rate_price\": 0,\n                \"hourly_rate_enabled\": false,\n                \"fixed_rate_price\": 0,\n                \"fixed_rate_enabled\": false,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            }\n        ],\n        \"office\": {\n            \"id\": \"5df438c27db8d75491cd10ff\",\n            \"name\": \"Some office address\",\n            \"lon\": {\n                \"$numberDecimal\": \"30.3242\"\n            },\n            \"lat\": {\n                \"$numberDecimal\": \"33.3234\"\n            },\n            \"front\": null,\n            \"code\": null,\n            \"floor\": null\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{status:\"ERROR\", error: \"AUTH_ERROR\"}\nHTTP/1.1 200 // регистрация не подтверждена\n{status:\"ERROR\", error: \"HAVE_NO_PERMISSIONS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/executor/push_token",
    "title": "Set push token",
    "name": "EditExecutorPushToken",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "os",
            "description": "<p>IOS/ANDROID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "udid",
            "description": "<p>device UDID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "push_token",
            "description": "<p>Push token string</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{status:\"ERROR\", error: \"AUTH_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/executor/speciality/:id",
    "title": "Редактировать специальность",
    "name": "EditExecutorSpeciality",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id Спеиальности  Исполнителя</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "workplace",
            "description": "<p>Работа на оффисе</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "on_departure",
            "description": "<p>Работа на выезде</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hourly_rate_price",
            "description": "<p>Почасовый тариф</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fixed_rate_price",
            "description": "<p>Фиксованный тариф</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "hourly_rate_enabled",
            "description": "<p>Статус почасового тарифа (0 или 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "fixed_rate_enabled",
            "description": "<p>Статус фиксированного тарифа (0 или 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "enabled",
            "description": "<p>Статус (0 или 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rate_type_for_now",
            "description": "<p>Тариф для выполнения заказов &quot;на сейчас&quot; ( HOURLY / FIXED)</p>"
          },
          {
            "group": "Parameter",
            "type": "ArrayOfString",
            "optional": false,
            "field": "certificates",
            "description": "<p>Массив фотографий сертификатов</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"id\": \"5e11b1ac821e25693b00ca2e\",\n        \"specialty\": {\n            \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n            \"name\": \"GR1\",\n            \"info\": \"Info field\",\n            \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n            \"group\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                \"name\": \"123\"\n            }\n        },\n        \"orders_count\": 0,\n        \"rate\": 0,\n        \"vote_count\": 0,\n        \"summ_rate\": 0,\n        \"workplace\": true,\n        \"on_departure\": true,\n        \"certificates\": [],\n        \"hourly_rate_price\": 0,\n        \"hourly_rate_enabled\": false,\n        \"fixed_rate_price\": 0,\n        \"fixed_rate_enabled\": false,\n        \"enabled\": false,\n        \"rate_type_for_now\": \"HOURLY\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}\nHTTP/1.1 200 OK // отсутствуют необходимые параметры\n{\"status\": \"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/logout",
    "title": "Log out",
    "name": "ExecutorLogout",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v2/executor/referral_transfer",
    "title": "Перевод накоплений в баланс",
    "name": "ExecutorReferralTransfer",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n       \"status\": \"OK\",\n       \"error\": \"\",\n       \"data\": []\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v2/executor/referral_history",
    "title": "Получить историю начислений от рефералов",
    "name": "GetExecutorReferralHistory",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n      \"status\": \"OK\",\n      \"error\": \"\",\n      \"data\": [\n          {\n              order_id: \"0df1950fd990683456d2999c\",\n              summ: \"100\",\n              date:  \"2019-12-27T03:14:26.822Z\",\n              user_type: \"CUSTOMER\",\n              user: {\n                  id: \"5df1950fd990683456d28d1c\",\n                  phone: \"+700000000\"\n              }\n          }\n      ]\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/login_by_token",
    "title": "Логин по токену",
    "name": "LoginByTokenExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK ПОльзователь успешно зарегистрирован\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": \"Фамилия имя отчество\",\n            \"phone\": \"+70009110001\",\n            \"photo\": null,\n            \"inn\": \"012323324332\",\n            \"passport\": {\n                \"series\": \"VV\",\n                \"number\": \"456098\",\n                \"code\": \"911\",\n                \"issued_by\": \"Kalinin r-n\",\n                \"main_photo\": \"somephoto.png\",\n                \"registration_photo\": \"somephoto.gif\"\n            },\n            \"city\": \"Мой Город\",\n            \"about\": \"SOME INFO ABOUT ME!!!\",\n            \"registered\": 1,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"-810\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"-810\"\n            },\n            \"specialities\": [\n                {\n                    \"id\": \"5df4273c96a789240b244df4\",\n                    \"specialty\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                        \"name\": \"GR1\",\n                        \"info\": \"Info field\",\n                        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                        \"group\": {\n                            \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                            \"name\": \"123\"\n                        }\n                    },\n                    \"orders_count\": 0,\n                    \"rate\": 0,\n                    \"vote_count\": 0,\n                    \"summ_rate\": 0,\n                    \"workplace\": true,\n                    \"on_departure\": true,\n                    \"certificates\": [],\n                    \"hourly_rate_price\": 100,\n                    \"hourly_rate_enabled\": true,\n                    \"fixed_rate_price\": 1000,\n                    \"fixed_rate_enabled\": true,\n                    \"enabled\": true,\n                    \"rate_type_for_now\": \"HOURLY\"\n                },\n                {\n                    \"id\": \"5df43c6827e012556b284964\",\n                    \"specialty\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                        \"name\": \"GR1\",\n                        \"info\": \"Info field\",\n                        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                        \"group\": {\n                            \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                            \"name\": \"123\"\n                        }\n                    },\n                    \"orders_count\": 0,\n                    \"rate\": 0,\n                    \"vote_count\": 0,\n                    \"summ_rate\": 0,\n                    \"workplace\": false,\n                    \"on_departure\": false,\n                    \"certificates\": [],\n                    \"hourly_rate_price\": 0,\n                    \"hourly_rate_enabled\": false,\n                    \"fixed_rate_price\": 0,\n                    \"fixed_rate_enabled\": false,\n                    \"enabled\": true,\n                    \"rate_type_for_now\": \"HOURLY\"\n                }\n            ],\n            \"office\": {\n                \"id\": \"5df438c27db8d75491cd10ff\",\n                \"name\": \"Some office address\",\n                \"lon\": {\n                    \"$numberDecimal\": \"30.3242\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"33.3234\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            }\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwOTExMDAwMSIsImlkIjoiNWRmNDI3MGU5NmE3ODkyNDBiMjQ0ZGYyIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTc3NDE4NDE0fQ.Whxcx0kLs83F98vtmKWspupLH0qVou18UY4RxPbbNic\"\n    }\n}\n    HTTP/1.1 200 OK Необходима регистрация\n{\n    \"status\": \"REG_NEEDED\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": null,\n            \"phone\": \"+70001111111\",\n            \"photo\": null,\n            \"inn\": null,\n            \"sex\": null,\n            \"passport\": {\n                \"series\": null,\n                \"number\": null,\n                \"code\": null,\n                \"issued_by\": null,\n                \"main_photo\": null,\n                \"registration_photo\": null,\n                \"selfy_photo\": null\n            },\n            \"city\": null,\n            \"about\": null,\n            \"registered\": 0,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"specialities\": [],\n            \"office\": null,\n            \"organization\": null,\n            \"rate\": \"0\",\n            \"referral_code\": \"E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8\"\n    }\n}\n    HTTP/1.1 200 OK Ожидается проверка регистрации администрацией\n{\n    \"status\": \"WAITING_REG_APPROVE\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": null,\n            \"phone\": \"+70001111111\",\n            \"photo\": null,\n            \"inn\": null,\n            \"sex\": null,\n            \"passport\": {\n                \"series\": null,\n                \"number\": null,\n                \"code\": null,\n                \"issued_by\": null,\n                \"main_photo\": null,\n                \"registration_photo\": null,\n                \"selfy_photo\": null\n            },\n            \"city\": null,\n            \"about\": null,\n            \"registered\": 0,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"specialities\": [],\n            \"office\": null,\n            \"organization\": null,\n            \"rate\": \"0\",\n            \"referral_code\": \"E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8\"\n    }\n}\n    HTTP/1.1 200 OK Регистрация отклонена администрацией\n{\n    \"status\": \"REG_REJECTED\",\n    \"error\": null,\n    \"data\": {\n        \"reject_reason\":\"Причина отказа\",\n        \"user\": {\n            \"name\": null,\n            \"phone\": \"+70001111111\",\n            \"photo\": null,\n            \"inn\": null,\n            \"sex\": null,\n            \"passport\": {\n                \"series\": null,\n                \"number\": null,\n                \"code\": null,\n                \"issued_by\": null,\n                \"main_photo\": null,\n                \"registration_photo\": null,\n                \"selfy_photo\": null\n            },\n            \"city\": null,\n            \"about\": null,\n            \"registered\": 0,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"specialities\": [],\n            \"office\": null,\n            \"organization\": null,\n            \"rate\": \"0\",\n            \"referral_code\": \"E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8\"\n    }\n}\n    HTTP/1.1 200 OK Регистрация отклонена и заблокированна\n{\n    \"status\": \"REG_BANNED\",\n    \"error\": null,\n    \"data\":{}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/login",
    "title": "Логин",
    "name": "LoginExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефонный номер в формате +9999999999</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Код из смс</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "referral",
            "description": "<p>Referral code</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK ПОльзователь успешно зарегистрирован\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": \"Фамилия имя отчество\",\n            \"phone\": \"+70009110001\",\n            \"photo\": null,\n            \"inn\": \"012323324332\",\n            \"passport\": {\n                \"series\": \"VV\",\n                \"number\": \"456098\",\n                \"code\": \"911\",\n                \"issued_by\": \"Kalinin r-n\",\n                \"main_photo\": \"somephoto.png\",\n                \"registration_photo\": \"somephoto.gif\"\n            },\n            \"city\": \"Мой Город\",\n            \"about\": \"SOME INFO ABOUT ME!!!\",\n            \"registered\": 1,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"-810\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"-810\"\n            },\n            \"specialities\": [\n                {\n                    \"id\": \"5df4273c96a789240b244df4\",\n                    \"specialty\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                        \"name\": \"GR1\",\n                        \"info\": \"Info field\",\n                        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                        \"group\": {\n                            \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                            \"name\": \"123\"\n                        }\n                    },\n                    \"orders_count\": 0,\n                    \"rate\": 0,\n                    \"vote_count\": 0,\n                    \"summ_rate\": 0,\n                    \"workplace\": true,\n                    \"on_departure\": true,\n                    \"certificates\": [],\n                    \"hourly_rate_price\": 100,\n                    \"hourly_rate_enabled\": true,\n                    \"fixed_rate_price\": 1000,\n                    \"fixed_rate_enabled\": true,\n                    \"enabled\": true,\n                    \"rate_type_for_now\": \"HOURLY\"\n                },\n                {\n                    \"id\": \"5df43c6827e012556b284964\",\n                    \"specialty\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                        \"name\": \"GR1\",\n                        \"info\": \"Info field\",\n                        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                        \"group\": {\n                            \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                            \"name\": \"123\"\n                        }\n                    },\n                    \"orders_count\": 0,\n                    \"rate\": 0,\n                    \"vote_count\": 0,\n                    \"summ_rate\": 0,\n                    \"workplace\": false,\n                    \"on_departure\": false,\n                    \"certificates\": [],\n                    \"hourly_rate_price\": 0,\n                    \"hourly_rate_enabled\": false,\n                    \"fixed_rate_price\": 0,\n                    \"fixed_rate_enabled\": false,\n                    \"enabled\": true,\n                    \"rate_type_for_now\": \"HOURLY\"\n                }\n            ],\n            \"office\": {\n                \"id\": \"5df438c27db8d75491cd10ff\",\n                \"name\": \"Some office address\",\n                \"lon\": {\n                    \"$numberDecimal\": \"30.3242\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"33.3234\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            }\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwOTExMDAwMSIsImlkIjoiNWRmNDI3MGU5NmE3ODkyNDBiMjQ0ZGYyIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTc3NDE4NDE0fQ.Whxcx0kLs83F98vtmKWspupLH0qVou18UY4RxPbbNic\"\n    }\n}\n    HTTP/1.1 200 OK Необходима регистрация\n{\n    \"status\": \"REG_NEEDED\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": null,\n            \"phone\": \"+70001111111\",\n            \"photo\": null,\n            \"inn\": null,\n            \"sex\": null,\n            \"passport\": {\n                \"series\": null,\n                \"number\": null,\n                \"code\": null,\n                \"issued_by\": null,\n                \"main_photo\": null,\n                \"registration_photo\": null,\n                \"selfy_photo\": null\n            },\n            \"city\": null,\n            \"about\": null,\n            \"registered\": 0,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"specialities\": [],\n            \"office\": null,\n            \"organization\": null,\n            \"rate\": \"0\",\n            \"referral_code\": \"E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8\"\n    }\n}\n    HTTP/1.1 200 OK Ожидается проверка регистрации администрацией\n{\n    \"status\": \"WAITING_REG_APPROVE\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": null,\n            \"phone\": \"+70001111111\",\n            \"photo\": null,\n            \"inn\": null,\n            \"sex\": null,\n            \"passport\": {\n                \"series\": null,\n                \"number\": null,\n                \"code\": null,\n                \"issued_by\": null,\n                \"main_photo\": null,\n                \"registration_photo\": null,\n                \"selfy_photo\": null\n            },\n            \"city\": null,\n            \"about\": null,\n            \"registered\": 0,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"specialities\": [],\n            \"office\": null,\n            \"organization\": null,\n            \"rate\": \"0\",\n            \"referral_code\": \"E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8\"\n    }\n}\n    HTTP/1.1 200 OK Регистрация отклонена администрацией\n{\n    \"status\": \"REG_REJECTED\",\n    \"error\": null,\n    \"data\": {\n        \"reject_reason\":\"Причина отказа\",\n        \"user\": {\n            \"name\": null,\n            \"phone\": \"+70001111111\",\n            \"photo\": null,\n            \"inn\": null,\n            \"sex\": null,\n            \"passport\": {\n                \"series\": null,\n                \"number\": null,\n                \"code\": null,\n                \"issued_by\": null,\n                \"main_photo\": null,\n                \"registration_photo\": null,\n                \"selfy_photo\": null\n            },\n            \"city\": null,\n            \"about\": null,\n            \"registered\": 0,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"0\"\n            },\n            \"specialities\": [],\n            \"office\": null,\n            \"organization\": null,\n            \"rate\": \"0\",\n            \"referral_code\": \"E1WAtGXCLmKIL74NeTZm8aipcaWlzoPyQ\"\n        },\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis3MDAwMTExMTExMSIsImlkIjoiNWU4ZDgyZjU4YmEwMTM3MmY0MDAzYmNiIiwicm9sZSI6IkVYRUNVVE9SIiwiaWF0IjoxNTg2MzMyNDQ0fQ.tmQwyLGPc1p_TSR3rXRTPbLuU2QDYr3Rp7VyMYvaCL8\"\n    }\n}\n    HTTP/1.1 200 OK Регистрация отклонена и заблокированна\n{\n    \"status\": \"REG_BANNED\",\n    \"error\": null,\n    \"data\":{}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 200 Input error // отсутствуют необходимые параметры\n {\"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}\n HTTP/1.1 200 OK // Неверный код\n{\"status\":\"ERROR\", \"error\":\"BANNED\" }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/registration",
    "title": "Регистрация",
    "name": "RegistrationExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Имя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "second_name",
            "description": "<p>Отчество</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>Фамилия</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>Город</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "about",
            "description": "<p>О себе</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "photo",
            "description": "<p>Фото\\Аватарка</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "inn",
            "description": "<p>ИНН</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "passport",
            "description": "<p>Объект паспорта</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.series",
            "description": "<p>Серия</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.number",
            "description": "<p>Номер</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.code",
            "description": "<p>Код</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.selfy_photo",
            "description": "<p>selfy_photo</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.issued_by",
            "description": "<p>Кем выдан</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.main_photo",
            "description": "<p>Фото паспорта с фото</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passport.registration_photo",
            "description": "<p>Фото паспорта с регистрацией</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"user\": {\n            \"name\": \"Фамилия имя отчество\",\n            \"phone\": \"+70009110001\",\n            \"photo\": null,\n            \"inn\": \"012323324332\",\n            \"passport\": {\n                \"series\": \"VV\",\n                \"number\": \"456098\",\n                \"code\": \"911\",\n                \"issued_by\": \"Kalinin r-n\",\n                \"main_photo\": \"somephoto.png\",\n                \"registration_photo\": \"somephoto.gif\"\n            },\n            \"city\": \"Мой Город\",\n            \"about\": \"SOME INFO ABOUT ME!!!\",\n            \"registered\": 1,\n            \"status\": false,\n            \"balance\": {\n                \"$numberDecimal\": \"-810\"\n            },\n            \"bonus_balance\": {\n                \"$numberDecimal\": \"-810\"\n            },\n            \"specialities\": [\n                {\n                    \"id\": \"5df4273c96a789240b244df4\",\n                    \"specialty\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                        \"name\": \"GR1\",\n                        \"info\": \"Info field\",\n                        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                        \"group\": {\n                            \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                            \"name\": \"123\"\n                        }\n                    },\n                    \"orders_count\": 0,\n                    \"rate\": 0,\n                    \"vote_count\": 0,\n                    \"summ_rate\": 0,\n                    \"workplace\": true,\n                    \"on_departure\": true,\n                    \"certificates\": [],\n                    \"hourly_rate_price\": 100,\n                    \"hourly_rate_enabled\": true,\n                    \"fixed_rate_price\": 1000,\n                    \"fixed_rate_enabled\": true,\n                    \"enabled\": true,\n                    \"rate_type_for_now\": \"HOURLY\"\n                },\n                {\n                    \"id\": \"5df43c6827e012556b284964\",\n                    \"specialty\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                        \"name\": \"GR1\",\n                        \"info\": \"Info field\",\n                        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                        \"group\": {\n                            \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                            \"name\": \"123\"\n                        }\n                    },\n                    \"orders_count\": 0,\n                    \"rate\": 0,\n                    \"vote_count\": 0,\n                    \"summ_rate\": 0,\n                    \"workplace\": false,\n                    \"on_departure\": false,\n                    \"certificates\": [],\n                    \"hourly_rate_price\": 0,\n                    \"hourly_rate_enabled\": false,\n                    \"fixed_rate_price\": 0,\n                    \"fixed_rate_enabled\": false,\n                    \"enabled\": true,\n                    \"rate_type_for_now\": \"HOURLY\"\n                }\n            ],\n            \"office\": {\n                \"id\": \"5df438c27db8d75491cd10ff\",\n                \"name\": \"Some office address\",\n                \"lon\": {\n                    \"$numberDecimal\": \"30.3242\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"33.3234\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            }\n        }\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 200 Input error // отсутствуют необходимые параметры\n {\"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}\n HTTP/1.1 200 OK // Регистрация пользователя ранее была подтверждена\n{\"status\":\"ERROR\", \"error\":\"ALREADY_REGISTERED\" }\nHTTP/1.1 200 OK // Пользователь забанен, регистрация невозможна\n{\"status\":\"ERROR\", \"error\":\"BANNED\" }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/send_code",
    "title": "Отправить смс с кодом",
    "name": "SendCodeExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефонный номер в формате +9999999999</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": \"CODE_SENT\",\n    \"data\": {\n        \"code_resend_available\": true,\n        \"next_login_sms_available_time\": \"2019-05-07T12:02:33+0300\",\n        \"sms_sent_count\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 200 Input error // отсутствуют необходимые параметры\n {\"status\":\"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}\n HTTP/1.1 200 OK // Слишком рано для отправки СМС\n{\"status\": \"ERROR\", \"error\": \"NEXT_SMS_TIME_ERROR\", \"data\": {\"next_login_sms_available_time\": \"2019-05-07T11:52:37+0300\"} }\n HTTP/1.1 200 OK // Пользователь забанен\n{\"status\":\"ERROR\", \"error\":\"BANNED\" }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "delete",
    "url": "/mobile_api/v1/executor/office",
    "title": "Удалить оффис",
    "name": "deleteExecutorOffice",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n\n{\n       \"status\": \"OK\",\n       \"error\": null,\n       \"data\": []\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}\nHTTP/1.1 200 OK // отсутствуют необходимые параметры\n{\"status\": \"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/executor/:id/marks",
    "title": "Получить отзывы исполнителя",
    "name": "getExecutorMarks",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id Исполнителя</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/referral_link",
    "title": "получить реферральную ссылку",
    "name": "getExecutorReferralLink",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"url\": \"http://localhost:3000/deep_link/EC4a7nq1oNqG7hPlllh2xwiKjPH421MR7\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/executor/:id",
    "title": "Получить профиль исполнителя",
    "name": "getFullExecutorProfile",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id Исполнителя</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/executor/me",
    "title": "Получить мой профиль",
    "name": "getMyProfileExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"name\": \"Фамилия имя отчество\",\n        \"phone\": \"+70009110001\",\n        \"photo\": null,\n        \"inn\": \"012323324332\",\n        \"passport\": {\n            \"series\": \"VV\",\n            \"number\": \"456098\",\n            \"code\": \"911\",\n            \"issued_by\": \"Kalinin r-n\",\n            \"main_photo\": \"somephoto.png\",\n            \"registration_photo\": \"somephoto.gif\"\n        },\n        \"city\": \"Мой Город\",\n        \"about\": \"SOME INFO ABOUT ME!!!\",\n        \"registered\": 1,\n        \"status\": false,\n        \"balance\": {\n            \"$numberDecimal\": \"-810\"\n        },\n        \"bonus_balance\": {\n            \"$numberDecimal\": \"-810\"\n        },\n        \"specialities\": [\n            {\n                \"id\": \"5df4273c96a789240b244df4\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": true,\n                \"on_departure\": true,\n                \"certificates\": [],\n                \"hourly_rate_price\": 100,\n                \"hourly_rate_enabled\": true,\n                \"fixed_rate_price\": 1000,\n                \"fixed_rate_enabled\": true,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            },\n            {\n                \"id\": \"5df43c6827e012556b284964\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": false,\n                \"on_departure\": false,\n                \"certificates\": [],\n                \"hourly_rate_price\": 0,\n                \"hourly_rate_enabled\": false,\n                \"fixed_rate_price\": 0,\n                \"fixed_rate_enabled\": false,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            }\n        ],\n        \"office\": {\n            \"id\": \"5df438c27db8d75491cd10ff\",\n            \"name\": \"Some office address\",\n            \"lon\": {\n                \"$numberDecimal\": \"30.3242\"\n            },\n            \"lat\": {\n                \"$numberDecimal\": \"33.3234\"\n            },\n            \"front\": null,\n            \"code\": null,\n            \"floor\": null\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 Неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "put",
    "url": "/mobile_api/v1/executor/office",
    "title": "Установить оффис",
    "name": "setExecutorOffice",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Текстовый адрес</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lat",
            "description": "<p>Широта</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "lon",
            "description": "<p>Долгота</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "front",
            "description": "<p>Подъезд</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "code",
            "description": "<p>Код домофона</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "floor",
            "description": "<p>Этаж</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "flat",
            "description": "<p>квартира</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"name\": \"Фамилия имя отчество12312\",\n        \"phone\": \"+70009110001\",\n        \"photo\": null,\n        \"inn\": \"012323324332\",\n        \"passport\": {\n            \"series\": \"VV\",\n            \"number\": \"456098\",\n            \"code\": \"911\",\n            \"issued_by\": \"Kalinin r-n\",\n            \"main_photo\": \"somephoto.png\",\n            \"registration_photo\": \"somephoto.gif\"\n        },\n        \"city\": \"Мой Город\",\n        \"about\": \"SOME INFO ABOUT ME!!!\",\n        \"registered\": 2,\n        \"status\": false,\n        \"balance\": {\n            \"$numberDecimal\": \"-810\"\n        },\n        \"bonus_balance\": {\n            \"$numberDecimal\": \"-810\"\n        },\n        \"specialities\": [\n            {\n                \"id\": \"5df4273c96a789240b244df4\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": true,\n                \"on_departure\": true,\n                \"certificates\": [],\n                \"hourly_rate_price\": 100,\n                \"hourly_rate_enabled\": true,\n                \"fixed_rate_price\": 1000,\n                \"fixed_rate_enabled\": true,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            },\n            {\n                \"id\": \"5df43c6827e012556b284964\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": false,\n                \"on_departure\": false,\n                \"certificates\": [],\n                \"hourly_rate_price\": 0,\n                \"hourly_rate_enabled\": false,\n                \"fixed_rate_price\": 0,\n                \"fixed_rate_enabled\": false,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            },\n            {\n                \"id\": \"5e11b1ac821e25693b00ca2e\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": true,\n                \"on_departure\": true,\n                \"certificates\": [],\n                \"hourly_rate_price\": 0,\n                \"hourly_rate_enabled\": false,\n                \"fixed_rate_price\": 0,\n                \"fixed_rate_enabled\": false,\n                \"enabled\": true,\n                \"rate_type_for_now\": \"HOURLY\"\n            },\n            {\n                \"id\": \"5e11b1ac821e25693b00ca2e\",\n                \"specialty\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"group\": {\n                        \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                        \"name\": \"123\"\n                    }\n                },\n                \"orders_count\": 0,\n                \"rate\": 0,\n                \"vote_count\": 0,\n                \"summ_rate\": 0,\n                \"workplace\": true,\n                \"on_departure\": true,\n                \"certificates\": [],\n                \"hourly_rate_price\": 0,\n                \"hourly_rate_enabled\": false,\n                \"fixed_rate_price\": 0,\n                \"fixed_rate_enabled\": false,\n                \"enabled\": false,\n                \"rate_type_for_now\": \"HOURLY\"\n            }\n        ],\n        \"office\": {\n            \"id\": \"5e11b886821e25693b00ca63\",\n            \"name\": \"Some office address\",\n            \"lon\": {\n                \"$numberDecimal\": \"30.3242\"\n            },\n            \"lat\": {\n                \"$numberDecimal\": \"33.3234\"\n            },\n            \"front\": null,\n            \"code\": null,\n            \"floor\": null\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}\nHTTP/1.1 200 OK // отсутствуют необходимые параметры\n{\"status\": \"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/location",
    "title": "Установить местположение",
    "name": "setLocationExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Double",
            "optional": false,
            "field": "lon",
            "description": "<p>Londitude</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{status:\"OK\", error:\"\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 Input error // Неправильные входные параметры\n{ status:\"ERROR\", error: 'MISSING_INPUT_PARAMETERS' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/status",
    "title": "Изменить текущий статус",
    "description": "<p>1 - занят, 0 - свободен</p>",
    "name": "setStatusExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>ID статуса</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{status:\"OK\", error:\"\", data:{status:1}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 OK Input error // слишком низкий баланс\n{ status:\"ERROR\", error: 'CASH_BALANCE_TOO_LOW' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/status",
    "title": "Изменить текущий статус",
    "description": "<p>1 - занят, 0 - свободен</p>",
    "name": "setStatusExecutor",
    "group": "ExecutorMain",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>ID статуса</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{status:\"OK\", error:\"\", data:{status:1}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 OK Input error // слишком низкий баланс\n{ status:\"ERROR\", error: 'CASH_BALANCE_TOO_LOW' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/file.js",
    "groupTitle": "ExecutorMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/executor/speciality",
    "title": "Добавить специальность",
    "name": "AddExecutorSpeciality",
    "group": "ExecutorrMain",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialty_id",
            "description": "<p>id Специальности</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "workplace",
            "description": "<p>Работа на оффисе</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "on_departure",
            "description": "<p>Работа на выезде</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "hourly_rate_price",
            "description": "<p>Почасовый тариф</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fixed_rate_price",
            "description": "<p>Фиксованный тариф</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "hourly_rate_enabled",
            "description": "<p>Статус почасового тарифа (0 или 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "fixed_rate_enabled",
            "description": "<p>Статус фиксированного тарифа (0 или 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "enabled",
            "description": "<p>Статус (0 или 1)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rate_type_for_now",
            "description": "<p>Тариф для выполнения заказов &quot;на сейчас&quot; ( HOURLY / FIXED)</p>"
          },
          {
            "group": "Parameter",
            "type": "ArrayOfString",
            "optional": false,
            "field": "certificates",
            "description": "<p>Массив фотографий сертификатов</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"id\": \"5e11b1ac821e25693b00ca2e\",\n        \"specialty\": {\n            \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n            \"name\": \"GR1\",\n            \"info\": \"Info field\",\n            \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n            \"group\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                \"name\": \"123\"\n            }\n        },\n        \"orders_count\": 0,\n        \"rate\": 0,\n        \"vote_count\": 0,\n        \"summ_rate\": 0,\n        \"workplace\": true,\n        \"on_departure\": true,\n        \"certificates\": [],\n        \"hourly_rate_price\": 0,\n        \"hourly_rate_enabled\": false,\n        \"fixed_rate_price\": 0,\n        \"fixed_rate_enabled\": false,\n        \"enabled\": true,\n        \"rate_type_for_now\": \"HOURLY\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Input error // неверный токен\n{\"status\":\"ERROR\", \"error\": \"AUTH_ERROR\"}\nHTTP/1.1 200 OK // отсутствуют необходимые параметры\n{\"status\": \"ERROR\", \"error\": \"MISSING_INPUT_PARAMETERS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/executor.js",
    "groupTitle": "ExecutorrMain"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/upload",
    "title": "Загрузить файл",
    "description": "<p>1 - занят, 0 - свободен</p>",
    "name": "uploadFile",
    "group": "Files",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Факйл фото</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"fileName\": \"DWEF7OUQRPD2KWJDG3OMCTQ7TAL4IARP3GKN634ZIQU2NTHNEH3U.jpg\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/file.js",
    "groupTitle": "Files"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/global/faq",
    "title": "FAQ",
    "name": "GetFaqList",
    "group": "Global",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>CUSTOMER/EXECUTOR</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/global.js",
    "groupTitle": "Global"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/global/report",
    "title": "Отправить жалобу",
    "name": "MakeReport",
    "group": "Global",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>ID заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст жалобы</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "photo",
            "description": "<p>приложенное фото</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/global.js",
    "groupTitle": "Global"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/global/report",
    "title": "Отправить жалобу",
    "name": "MakeReport",
    "group": "Global",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>ID заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст жалобы</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "photo",
            "description": "<p>приложенное фото</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/global.js",
    "groupTitle": "Global"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/global/support_request",
    "title": "Отправить запрос в тех. поддержку",
    "name": "MakeSupportRequest",
    "group": "Global",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст обращения</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Номер телефона</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/global.js",
    "groupTitle": "Global"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/global/privacy_policy",
    "title": "get Privacy Policy",
    "name": "getPrivacyPolicy",
    "group": "Global",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/global.js",
    "groupTitle": "Global"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/global/terms_of_conditions",
    "title": "get Terms Of Conditions",
    "name": "getTermsOfConditions",
    "group": "Global",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/global.js",
    "groupTitle": "Global"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/cancel_ask_executor",
    "title": "Отменить предложение заказа исполнителю ( срочный )",
    "name": "CancelAskExecutorOrder",
    "group": "OrderCustomer",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас нет кативного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ANY_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"WRONG_ORDER_STATUS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderCustomer"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/cancel",
    "title": "Отменить заказ (во время выполнения)",
    "name": "CloseConfirmOrder",
    "group": "OrderCustomer",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст комментария</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Тип (причина) отмены</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас нет кативного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"WRONG_ORDER_STATUS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderCustomer"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/close",
    "title": "Закрыть заказ ( до выбора исполнителя )",
    "name": "CloseCustomerOrder",
    "group": "OrderCustomer",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас нет кативного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ANY_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"WRONG_ORDER_STATUS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderCustomer"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/close",
    "title": "Закрыть заказ ( до выбора исполнителя )",
    "name": "CloseCustomerOrder",
    "group": "OrderCustomer",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас нет кативного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ANY_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"WRONG_ORDER_STATUS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderCustomer"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/cancel_confirm",
    "title": "Подтвердить  завершение заказа (заказчик)",
    "name": "CustomerCloseConfirmOrder",
    "group": "OrderCustomer",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас нет кативного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ANY_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"WRONG_ORDER_STATUS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderCustomer"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/for_later",
    "title": "Список отложенных заказов",
    "name": "customer_orders_list_for_later",
    "group": "OrderCustomer",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderCustomer"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/accept",
    "title": "Принять текущий заказ",
    "name": "AcceptOrder",
    "group": "OrderExecutor",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{status:\"OK\", error:\"SUCCESS\", data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 OK // У вас уже есть текущий заказ\n{ \"status\": \"ERROR\",    \"error\": \"ALREADY_BUSY\"}\nHTTP/1.1 200 OK // Вам не предлагали исполнять нкакой заказ\n{ \"status\": \"ERROR\",    \"error\": \"NO_ORDER_REQUESTS\"}\nHTTP/1.1 200 OK //Заказ отсутсвует или уже имеет исполнителя\n{ \"status\": \"ERROR\",    \"error\": \"ORDER_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderExecutor"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/decline",
    "title": "Отклонить текущий заказ",
    "name": "DeclineOrder",
    "group": "OrderExecutor",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас уже есть текущий заказ\n{ \"status\": \"ERROR\",    \"error\": \"ALREADY_BUSY\"}\n HTTP/1.1 200 OK // Вам не предлагали исполнять нкакой заказ\n{ \"status\": \"ERROR\",    \"error\": \"NO_ORDER_REQUESTS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderExecutor"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/approve_offer",
    "title": "Утвердить заявку (C)",
    "name": "ApproveOfferForOrder",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>ИД заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "executor_id",
            "description": "<p>ИД исполнителя</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 // Отсутствуют обязательные параметры\n{ status:\"ERROR\", error: 'MISSING_INPUT_PARAMETERS' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/cancel_for_later",
    "title": "Отменить отложенный заказ до начала выполнения (C+E)",
    "name": "CloseConfirmOrder",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "order_id",
            "description": "<p>ID заказа</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас нет кативного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"WRONG_ORDER_STATUS\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/create_offer",
    "title": "Создать предложение (E)",
    "name": "CreateOfferForOrder",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>ИД заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "summ_type",
            "description": "<p>тип оплаты ( HOURLY, FIXED)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "summ",
            "description": "<p>сумма предложения</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departure",
            "description": "<p>место выполнения (ADDRESS, OFFICE)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"id\": \"5ecae4b077b8552ad2ec2512\",\n        \"summ\": \"100\",\n        \"departure\": \"ADDRESS\",\n        \"summ_type\": \"FIXED\",\n        \"address\": {\n            \"id\": \"5ecae1dbfad9ed0ccccb5f22\",\n            \"name\": \"Podil, Kyiv, Ukraine\",\n            \"lon\": 30.51675389999999,\n            \"lat\": 50.4688984,\n            \"front\": null,\n            \"code\": \"\",\n            \"floor\": \"3\",\n            \"flat\": null\n        },\n        \"status\": \"WAITING\",\n        \"createdAt\": \"2020-05-24T21:18:40.743Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 // ЗАявка уже отправлена\n{ status:\"ERROR\", error: 'ALREADY_MADE_OFFER' }\nHTTP/1.1 200 // неверный статус заказа\n{ status:\"ERROR\", error: 'ORDER_STATUS_ERROR' }\nHTTP/1.1 200 // no executor office ( in case where departure = \"OFFICE\")\n{ status:\"ERROR\", error: 'NO_ANY_OFFICE' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/find_orders_for_later_time",
    "title": "Поиск отложенных заказов (E)",
    "name": "FindOrdersForLaterExecutor",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "sort",
            "description": "<p>&quot;TIME&quot;, &quot;DISTANCE&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "ArrayOfString",
            "optional": true,
            "field": "specialities",
            "description": "<p>Массив ID специальностей для поиска ( по умолчанию используются все специальности исполнителя)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "departure",
            "description": "<p>&quot;ANY&quot;, &quot;OFFICE&quot;, &quot;ADDRESS&quot; (Default: &quot;ANY&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date_from",
            "description": "<p>Date in format &quot;2019-12-08T14:25:39.180Z&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "date_to",
            "description": "<p>Date in format &quot;2019-12-08T14:25:39.180Z&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "time_from",
            "description": "<p>Time in minutes 0-1440 (default: 0)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "time_to",
            "description": "<p>Time in minutes 0-1440 (default: 1440)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5ebdf612174bfa36478b9c5f\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"Грузчик\",\n                \"info\": \"Специалисты по перемещению грузов в пространстве\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"name\": \"123\"\n                }\n            },\n            \"address\": {\n                \"id\": \"5ebdf612174bfa36478b9c62\",\n                \"name\": \"Lybidska Square, Kyiv, Ukraine\",\n                \"lon\": 30.5245176,\n                \"lat\": 50.4128723,\n                \"front\": null,\n                \"code\": \"\",\n                \"floor\": \"\",\n                \"flat\": null\n            },\n            \"scheduled_time\": \"2020-05-14T12:23:48.000Z\",\n            \"scheduled_time_minutes\": 100,\n            \"address_distance\": 6312444.973459362,\n            \"office_distance\": null,\n            \"departure\": \"ANY\",\n            \"payment_type\": \"CASH\",\n            \"offer_status\": \"NONE\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/offers/:order_id",
    "title": "Список преложений на заказ (C)",
    "name": "GetOffersForOrder",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>ИД заказа</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5ecae4b077b8552ad2ec2512\",\n            \"summ\": \"100\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"FIXED\",\n            \"address\": {\n                \"id\": \"5ecae1dbfad9ed0ccccb5f22\",\n                \"name\": \"Podil, Kyiv, Ukraine\",\n                \"lon\": 30.51675389999999,\n                \"lat\": 50.4688984,\n                \"front\": null,\n                \"code\": \"\",\n                \"floor\": \"3\",\n                \"flat\": null\n            },\n            \"status\": \"WAITING\",\n            \"createdAt\": \"2020-05-24T21:18:40.743Z\",\n            \"executor\": {\n                \"id\": \"5e9576d8e3c96454aeb99d4b\",\n                \"name\": \"String\",\n                \"second_name\": \"String\",\n                \"surname\": \"String\",\n                \"phone\": \"+70001111112\",\n                \"photo\": \"String\",\n                \"about\": \"String\",\n                \"sex\": null,\n                \"lat\": 0,\n                \"lon\": 0,\n                \"rate\": \"0\",\n                \"status\": false\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 // Отсутствуют обязательные параметры\n{ status:\"ERROR\", error: 'MISSING_INPUT_PARAMETERS' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/planned_list",
    "title": "Список запланированных заказов (E)",
    "name": "GetPlannedExecutorOrders",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5ecae1dbfad9ed0ccccb5f1f\",\n            \"specialty\": {\n                \"id\": \"5eb7f6d00d84d97445361d59\",\n                \"name\": \"Вольный стрелок\",\n                \"info\": \"Описание\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"name\": \"123\"\n                }\n            },\n            \"address\": {\n                \"id\": \"5ecae1dbfad9ed0ccccb5f22\",\n                \"name\": \"Podil, Kyiv, Ukraine\",\n                \"lon\": 30.51675389999999,\n                \"lat\": 50.4688984,\n                \"front\": null,\n                \"code\": \"\",\n                \"floor\": \"3\",\n                \"flat\": null\n            },\n            \"scheduled_time\": \"2021-05-14T12:23:48.000Z\",\n            \"scheduled_time_minutes\": 100,\n            \"address_distance\": null,\n            \"office_distance\": null,\n            \"price\": 100,\n            \"departure\": \"ADDRESS\",\n            \"payment_type\": \"CASH\",\n            \"offer_status\": \"APPROVED\",\n            \"summ_type\": \"FIXED\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 // Отсутствуют обязательные параметры\n{ status:\"ERROR\", error: 'MISSING_INPUT_PARAMETERS' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/remove_offer",
    "title": "Удалить предложение (E)",
    "name": "RemoveOfferForOrder",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>ИД заказа</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 // Отсутствуют обязательные параметры\n{ status:\"ERROR\", error: 'MISSING_INPUT_PARAMETERS' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/for_later",
    "title": "Список отложенных заказов (C)",
    "name": "customer_orders_list_for_later",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5e1c5e354f585341a827a55d\",\n            \"specialty\": {\n                \"id\": \"5dfa0fe715ef9103a47aef95\",\n                \"name\": \"Грузчик\",\n                \"info\": \"Грузчик\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5ded07e37ad2cc6ecc2665af\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": 37.712012,\n                \"lat\": 55.854117,\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null,\n                \"flat\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5e94026bec5ed64458cb210c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": false,\n            \"scheduled_time\": \"2019-12-08T14:25:39.180Z\",\n            \"scheduled_time_minutes\": 0,\n            \"departure\": \"ANY\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"price\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2021-01-02T14:25:39.000Z\",\n            \"executor\": null,\n            \"customer\": {\n                \"id\": \"5e94026bec5ed64458cb210c\",\n                \"name\": null,\n                \"phone\": \"+70003331111\",\n                \"rate\": \"0.00\"\n            },\n            \"offers_count\": 3,\n            \"requested_executor\": null,\n            \"requested_summ_type\": null,\n            \"requested_price\": null,\n            \"requested_departure\": null\n        },\n        {\n            \"id\": \"5e1c5e2d4f585341a827a55c\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"Грузчик\",\n                \"info\": \"Грузчик\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5ded07e37ad2cc6ecc2665af\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": 37.711012,\n                \"lat\": 55.857117,\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null,\n                \"flat\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5e94026bec5ed64458cb210c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": false,\n            \"scheduled_time\": \"2019-12-08T14:25:39.180Z\",\n            \"scheduled_time_minutes\": 0,\n            \"departure\": \"ANY\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"price\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2021-01-02T14:25:39.000Z\",\n            \"executor\": null,\n            \"customer\": {\n                \"id\": \"5e94026bec5ed64458cb210c\",\n                \"name\": null,\n                \"phone\": \"+70003331111\",\n                \"rate\": \"0.00\"\n            },\n            \"offers_count\": 2,\n            \"requested_executor\": null,\n            \"requested_summ_type\": null,\n            \"requested_price\": null,\n            \"requested_departure\": null\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/on_my_way",
    "title": "Сделать активным отложенный заказ (E)",
    "name": "onMyWayFutureOrder",
    "group": "OrderForLater",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>Order ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"id\": \"5ecae1dbfad9ed0ccccb5f1f\",\n        \"specialty\": {\n            \"id\": \"5eb7f6d00d84d97445361d59\",\n            \"name\": \"Вольный стрелок\",\n            \"info\": \"Описание\",\n            \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n            \"group\": {\n                \"id\": \"5de8ba7ed8533e18410ed35c\",\n                \"name\": \"123\"\n            }\n        },\n        \"status\": 20,\n        \"comment\": \"\",\n        \"address\": {\n            \"id\": \"5ecae1dbfad9ed0ccccb5f22\",\n            \"name\": \"Podil, Kyiv, Ukraine\",\n            \"lon\": 30.51675389999999,\n            \"lat\": 50.4688984,\n            \"front\": null,\n            \"code\": \"\",\n            \"floor\": \"3\",\n            \"flat\": null\n        },\n        \"executor_id\": \"5e9576d8e3c96454aeb99d4b\",\n        \"customer_id\": \"5e94026bec5ed64458cb210c\",\n        \"payment_type\": \"CASH\",\n        \"for_now\": false,\n        \"scheduled_time\": \"2021-05-14T12:23:48.000Z\",\n        \"scheduled_time_minutes\": 100,\n        \"departure\": \"ADDRESS\",\n        \"summ_type\": \"FIXED\",\n        \"summ\": null,\n        \"price\": \"100\",\n        \"departure_address\": null,\n        \"map\": null,\n        \"start_walk_time\": null,\n        \"start_work_time\": null,\n        \"end_work_time\": null,\n        \"finishedAt\": null,\n        \"duration\": null,\n        \"check\": {\n            \"order_check\": {\n                \"full_price\": {\n                    \"$numberDecimal\": \"100\"\n                },\n                \"app_commission\": 2,\n                \"customer_referral_comission\": 1,\n                \"executor_referral_comission\": 1,\n                \"payfor_full_price\": 100,\n                \"full_executor_payment\": 98,\n                \"customer_discount\": 0,\n                \"executor_extra_payment\": 0,\n                \"customer_final_payment_amount\": 100,\n                \"qiwi_comission_amount\": null\n            },\n            \"order_configs\": {\n                \"system_commission\": 2,\n                \"referral_program_commissions\": 1,\n                \"customer_discount_percent\": 0,\n                \"executor_extra_payment_percent\": 0\n            },\n            \"customer_check\": {\n                \"full_price\": {\n                    \"$numberDecimal\": \"100\"\n                },\n                \"customer_discount\": 0,\n                \"customer_final_payment_amount\": 100\n            },\n            \"executor_check\": {\n                \"full_price\": {\n                    \"$numberDecimal\": \"100\"\n                },\n                \"customer_discount\": 0,\n                \"customer_final_payment_amount\": 100,\n                \"executor_extra_payment\": 0\n            }\n        },\n        \"cancel_reason\": null,\n        \"createdAt\": \"2020-05-24T21:06:35.707Z\",\n        \"executor\": {\n            \"id\": \"5e9576d8e3c96454aeb99d4b\",\n            \"name\": \"String\",\n            \"second_name\": \"String\",\n            \"surname\": \"String\",\n            \"phone\": \"+70001111112\",\n            \"photo\": \"String\",\n            \"about\": \"String\",\n            \"sex\": null,\n            \"lat\": 0,\n            \"lon\": 0,\n            \"rate\": \"0\",\n            \"status\": false\n        },\n        \"customer\": {\n            \"id\": \"5e94026bec5ed64458cb210c\",\n            \"name\": null,\n            \"phone\": \"+70003331111\",\n            \"rate\": \"0.00\"\n        },\n        \"offers_count\": 1,\n        \"requested_executor\": null,\n        \"requested_summ_type\": null,\n        \"requested_price\": null,\n        \"requested_departure\": null\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK // У вас уже есть активный заказ\n{ \"status\": \"ERROR\",    \"error\": \"ALREDY_HAVE_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Заказчик занят в данный момент\n{ \"status\": \"ERROR\",    \"error\": \"CUSTOMER_IS_BUSY\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order_for_later.js",
    "groupTitle": "OrderForLater"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/ask_executor/:executor_id",
    "title": "Предложить исполнителю выполнение заказа",
    "name": "AskExecutorForNow",
    "group": "OrderForNow",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "executor_id",
            "description": "<p>ИД исполнителя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departure",
            "description": "<p>ADDRESS or OFFICE</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5df4270e96a789240b244df2\",\n            \"name\": \"Фамилия имя отчество12312\",\n            \"distance\": 1534933.23925855,\n            \"departure\": \"ADDRESS\",\n            \"rate_type\": \"HOURLY\",\n            \"price\": 100\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 // Отсутствует активный заказ\n{ status:\"ERROR\", error: 'NO_ANY_ACTIVE_ORDER' }\nHTTP/1.1 200 // такой исполнитель не существует\n{ status:\"ERROR\", error: 'NO_SUCH_EXECUTOR' }\nHTTP/1.1 200 // исполнитель занят другим заказом\n{ status:\"ERROR\", error: 'EXECUTOR_IS_BUSY' }\nHTTP/1.1 200 // неверный статус заказа\n{ status:\"ERROR\", error: 'WRONG_ORDER_STATUS' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderForNow"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/find_executors",
    "title": "Поиск подходящих исполнителей",
    "name": "FindExecutorsForNow",
    "group": "OrderForNow",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5df4270e96a789240b244df2\",\n            \"name\": \"Фамилия имя отчество12312\",\n            \"distance\": 1534933.23925855,\n            \"departure\": \"ADDRESS\",\n            \"rate_type\": \"HOURLY\",\n            \"price\": 100\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderForNow"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/by_id/:order_id",
    "title": "Get order by ID",
    "name": "GetOrderById",
    "group": "OrderGlobal",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>order_id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n            \"id\": \"5e125439d22b072061db5066\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e125439d22b072061db5069\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": true,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T21:25:13.951Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderGlobal"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/my",
    "title": "Получить мой активный заказ",
    "name": "MyOrder",
    "group": "Order",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"order\": {\n            \"id\": \"5e125439d22b072061db5066\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e125439d22b072061db5069\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": true,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T21:25:13.951Z\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }\nHTTP/1.1 200 OK // Отсутсвует текущий активный заказ\n{ \"status\": \"ERROR\",    \"error\": \"NO_ANY_ACTIVE_ORDER\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/history",
    "title": "Получить историю моих заказов",
    "name": "MyOrderHistory",
    "group": "Order",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [{\n        \"order\": {\n            \"id\": \"5e125439d22b072061db5066\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e125439d22b072061db5069\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": true,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T21:25:13.951Z\"\n        }\n    }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // неверный токен\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/offer/by_order_id/:order_id",
    "title": "Получить мое предложение по ИД заказа (E)",
    "name": "offer_by_order_id",
    "group": "OrderOfferByOrderId",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order_id",
            "description": "<p>order ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferByOrderId"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/address_only_approved_offers_orders",
    "title": "Подтвержденные заявки ( выезд на адрес)",
    "name": "address_only_approved_offers_orders",
    "group": "OrderOfferList",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"approved_orders\": [\n            {\n                \"price\": {\n                    \"$numberDecimal\": \"200\"\n                },\n                \"specialty_id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"specialty\": {\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group\": {\n                        \"name\": \"123\",\n                        \"_id\": \"5de8bb8d05158d1b6d10eb70\"\n                    },\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"enabled\": true,\n                    \"_id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"__v\": 0\n                },\n                \"status\": 20,\n                \"comment\": \"123\",\n                \"address\": {\n                    \"location\": {\n                        \"type\": \"Point\",\n                        \"coordinates\": [\n                            23,\n                            13\n                        ]\n                    },\n                    \"lat\": {\n                        \"$numberDecimal\": \"13\"\n                    },\n                    \"lon\": {\n                        \"$numberDecimal\": \"23\"\n                    },\n                    \"name\": \"Teatralnaya\",\n                    \"front\": null,\n                    \"code\": null,\n                    \"floor\": null,\n                    \"type\": \"ADDRESS\",\n                    \"apartment\": null,\n                    \"_id\": \"5e1267cdf5f10a4e27b05702\"\n                },\n                \"executor_id\": \"5df4270e96a789240b244df2\",\n                \"customer_id\": \"5df1950fd990683456d28d1c\",\n                \"payment_type\": \"CASH\",\n                \"for_now\": false,\n                \"departure\": \"OFFICE\",\n                \"departure_address\": null,\n                \"start_walk_time\": null,\n                \"start_work_time\": null,\n                \"end_work_time\": null,\n                \"finishedAt\": null,\n                \"duration\": null,\n                \"offered_executor_ids\": [],\n                \"summ_type\": \"HOURLY\",\n                \"summ\": null,\n                \"expected_time\": null,\n                \"card_id\": null,\n                \"_id\": \"5e1267cdf5f10a4e27b056ff\",\n                \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n                \"createdAt\": \"2020-01-05T22:48:45.272Z\",\n                \"updatedAt\": \"2020-01-05T22:48:45.272Z\",\n                \"__v\": 4,\n                \"map\": {\n                    \"expected_time\": 600000,\n                    \"path\": \"_ienA{|jkC\"\n                }\n            }\n        ],\n        \"unapproved_orders\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferList"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/address_unoffered_orders",
    "title": "Заказы без предложенных заявок( Адрес )",
    "name": "address_unoffered_orders",
    "group": "OrderOfferList",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5e1267cdf5f10a4e27b056fb\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e1267cdf5f10a4e27b056fe\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": false,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T22:48:45.261Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferList"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/all_approved_offers_orders",
    "title": "Подтвержденные заявки ( ВСЕ )",
    "name": "all_approved_offers_orders",
    "group": "OrderOfferList",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5e1267cdf5f10a4e27b056ff\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 20,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e1267cdf5f10a4e27b05702\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": \"5df4270e96a789240b244df2\",\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": false,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"OFFICE\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": {\n                \"expected_time\": 600000,\n                \"path\": \"_ienA{|jkC\"\n            },\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T22:48:45.272Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferList"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/approved_and_offered_orders",
    "title": "Отправленные и Подтвержденные",
    "name": "approved_and_offered_orders",
    "group": "OrderOfferList",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"approved_orders\": [\n            {\n                \"price\": {\n                    \"$numberDecimal\": \"200\"\n                },\n                \"specialty_id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"specialty\": {\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group\": {\n                        \"name\": \"123\",\n                        \"_id\": \"5de8bb8d05158d1b6d10eb70\"\n                    },\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"enabled\": true,\n                    \"_id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"__v\": 0\n                },\n                \"status\": 20,\n                \"comment\": \"123\",\n                \"address\": {\n                    \"location\": {\n                        \"type\": \"Point\",\n                        \"coordinates\": [\n                            23,\n                            13\n                        ]\n                    },\n                    \"lat\": {\n                        \"$numberDecimal\": \"13\"\n                    },\n                    \"lon\": {\n                        \"$numberDecimal\": \"23\"\n                    },\n                    \"name\": \"Teatralnaya\",\n                    \"front\": null,\n                    \"code\": null,\n                    \"floor\": null,\n                    \"type\": \"ADDRESS\",\n                    \"apartment\": null,\n                    \"_id\": \"5e1267cdf5f10a4e27b05702\"\n                },\n                \"executor_id\": \"5df4270e96a789240b244df2\",\n                \"customer_id\": \"5df1950fd990683456d28d1c\",\n                \"payment_type\": \"CASH\",\n                \"for_now\": false,\n                \"departure\": \"OFFICE\",\n                \"departure_address\": null,\n                \"start_walk_time\": null,\n                \"start_work_time\": null,\n                \"end_work_time\": null,\n                \"finishedAt\": null,\n                \"duration\": null,\n                \"offered_executor_ids\": [],\n                \"summ_type\": \"HOURLY\",\n                \"summ\": null,\n                \"expected_time\": null,\n                \"card_id\": null,\n                \"_id\": \"5e1267cdf5f10a4e27b056ff\",\n                \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n                \"createdAt\": \"2020-01-05T22:48:45.272Z\",\n                \"updatedAt\": \"2020-01-05T22:48:45.272Z\",\n                \"__v\": 4,\n                \"map\": {\n                    \"expected_time\": 600000,\n                    \"path\": \"_ienA{|jkC\"\n                }\n            }\n        ],\n        \"unapproved_orders\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferList"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/office_only_approved_offers_orders",
    "title": "Подтвержденные заявки ( на оффисе)",
    "name": "office_only_approved_offers_orders",
    "group": "OrderOfferList",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"approved_orders\": [\n            {\n                \"price\": {\n                    \"$numberDecimal\": \"200\"\n                },\n                \"specialty_id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"specialty\": {\n                    \"name\": \"GR1\",\n                    \"info\": \"Info field\",\n                    \"group\": {\n                        \"name\": \"123\",\n                        \"_id\": \"5de8bb8d05158d1b6d10eb70\"\n                    },\n                    \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                    \"enabled\": true,\n                    \"_id\": \"5de8bb8d05158d1b6d10eb6f\",\n                    \"__v\": 0\n                },\n                \"status\": 20,\n                \"comment\": \"123\",\n                \"address\": {\n                    \"location\": {\n                        \"type\": \"Point\",\n                        \"coordinates\": [\n                            23,\n                            13\n                        ]\n                    },\n                    \"lat\": {\n                        \"$numberDecimal\": \"13\"\n                    },\n                    \"lon\": {\n                        \"$numberDecimal\": \"23\"\n                    },\n                    \"name\": \"Teatralnaya\",\n                    \"front\": null,\n                    \"code\": null,\n                    \"floor\": null,\n                    \"type\": \"ADDRESS\",\n                    \"apartment\": null,\n                    \"_id\": \"5e1267cdf5f10a4e27b05702\"\n                },\n                \"executor_id\": \"5df4270e96a789240b244df2\",\n                \"customer_id\": \"5df1950fd990683456d28d1c\",\n                \"payment_type\": \"CASH\",\n                \"for_now\": false,\n                \"departure\": \"OFFICE\",\n                \"departure_address\": null,\n                \"start_walk_time\": null,\n                \"start_work_time\": null,\n                \"end_work_time\": null,\n                \"finishedAt\": null,\n                \"duration\": null,\n                \"offered_executor_ids\": [],\n                \"summ_type\": \"HOURLY\",\n                \"summ\": null,\n                \"expected_time\": null,\n                \"card_id\": null,\n                \"_id\": \"5e1267cdf5f10a4e27b056ff\",\n                \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n                \"createdAt\": \"2020-01-05T22:48:45.272Z\",\n                \"updatedAt\": \"2020-01-05T22:48:45.272Z\",\n                \"__v\": 4,\n                \"map\": {\n                    \"expected_time\": 600000,\n                    \"path\": \"_ienA{|jkC\"\n                }\n            }\n        ],\n        \"unapproved_orders\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferList"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/list/office_unoffered_orders",
    "title": "Заказы без предложенных заявок( Оффис )",
    "name": "office_unoffered_orders",
    "group": "OrderOfferList",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"id\": \"5e1267cdf5f10a4e27b056fb\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e1267cdf5f10a4e27b056fe\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": false,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T22:48:45.261Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Input error // Ошибка авторизации\n{ status:\"ERROR\", error: 'AUTH_ERROR' }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "OrderOfferList"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/create",
    "title": "Создать заказ",
    "name": "OrderCreate",
    "group": "Order",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "specialty_id",
            "description": "<p>ИД специальности</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>комментарий</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "address",
            "description": "<p>объект адреса</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address.name",
            "description": "<p>адрес ( текст)</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "address.lat",
            "description": "<p>широта</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "address.lon",
            "description": "<p>долгота</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address.code",
            "description": "<p>код домофона</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address.floor",
            "description": "<p>этаж</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address.flat",
            "description": "<p>квартира</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "payment_type",
            "description": "<p>способ оплаты CASH/CARD/BONUS</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "departure",
            "description": "<p>место проведения работ ADDRESS/OFFICE/ANY (ANY from 23/05/20)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "for_now",
            "description": "<p>срочный заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "scheduled_time",
            "description": "<p>запрланированные дата+время выполнения заказа в формате &quot;2019-12-08T14:25:39.180Z&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "scheduled_time_minutes",
            "description": "<p>запрланированное время выполнения заказа в МИНУТАХ (Часы*60 + Минуты) 0-1440</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "card_id",
            "description": "<p>ИД карты ( если payment_type = CARD )</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"order\": {\n            \"id\": \"5e125439d22b072061db5066\",\n            \"specialty\": {\n                \"id\": \"5de8bb8d05158d1b6d10eb6f\",\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"group\": {\n                    \"id\": \"5de8bb8d05158d1b6d10eb70\",\n                    \"name\": \"123\"\n                }\n            },\n            \"status\": 10,\n            \"comment\": \"123\",\n            \"address\": {\n                \"id\": \"5e125439d22b072061db5069\",\n                \"name\": \"Teatralnaya\",\n                \"lon\": {\n                    \"$numberDecimal\": \"23\"\n                },\n                \"lat\": {\n                    \"$numberDecimal\": \"13\"\n                },\n                \"front\": null,\n                \"code\": null,\n                \"floor\": null\n            },\n            \"executor_id\": null,\n            \"customer_id\": \"5df1950fd990683456d28d1c\",\n            \"payment_type\": \"CASH\",\n            \"for_now\": true,\n            \"scheduled_time\": \"1970-01-19T04:53:34.800Z\",\n            \"departure\": \"ADDRESS\",\n            \"summ_type\": \"HOURLY\",\n            \"summ\": null,\n            \"departure_address\": null,\n            \"map\": null,\n            \"start_walk_time\": null,\n            \"start_work_time\": null,\n            \"end_work_time\": null,\n            \"finishedAt\": null,\n            \"duration\": null,\n            \"check\": null,\n            \"cancel_reason\": null,\n            \"createdAt\": \"2020-01-05T21:25:13.951Z\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // Ошибка авторизации\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 400 Input error // отсутствуют необходимые параметры\n { status:\"ERROR\", error: 'MISSING_INPUT_PARAMETERS' }\n HTTP/1.1 200 OK // Специальность не найдена\n{ \"status\": \"ERROR\",    \"error\": \"SPECIALTY_NOT_FOUND\"}\n HTTP/1.1 200 OK // У пользователя ест ьактивный заказ\n{ \"status\": \"ERROR\",    \"error\": \"ALREADY_HAVE_ACTIVE_ORDER\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/start_work",
    "title": "Начать работу",
    "name": "StartWorkOrder",
    "group": "Order",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{status:\"OK\", error:null, data:{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 401 Input error // неверный токен\n    { status:\"ERROR\", error: 'AUTH_ERROR' }\n    HTTP/1.1 200 OK // У вас нет активного заказа\n   { \"status\": \"ERROR\",    \"error\": \"NO_ACTIVE_ORDER\"}\n    HTTP/1.1 200 OK // Неподходящий статус заказа\n   { \"status\": \"ERROR\",    \"error\": \"ORDER_STATUS_ERROR\"}\n    HTTP/1.1 200 OK // Расстояние до заказа больше 150 метров\n   {\n    \"status\": \"ERROR\",\n    \"error\": \"TOO_FAR_FOR_START\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/mobile_api/v1/order/order_done_confirm",
    "title": "Подтвердить завершение заказа",
    "name": "WorkDoneConfirmOrder",
    "group": "Order",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mark",
            "description": "<p>Оценка (1-5).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст комментария выполнения заказа.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "report_text",
            "description": "<p>Текст жалобы</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "report_type",
            "description": "<p>Тип жалобы</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK //Нет активного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"ORDER_STATUS_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/order/work_done",
    "title": "Работа окончена, переход к оплате",
    "name": "WorkDoneOrder",
    "group": "Order",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Users access-token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 401 Input error // неверный токен\n { status:\"ERROR\", error: 'AUTH_ERROR' }\n HTTP/1.1 200 OK //Нет активного заказа\n{ \"status\": \"ERROR\",    \"error\": \"NO_ACTIVE_ORDER\"}\n HTTP/1.1 200 OK // Неверный статус заказа\n{ \"status\": \"ERROR\",    \"error\": \"ORDER_STATUS_ERROR\"}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/specialty/list_detailed",
    "title": "Список специальностей (детальный)",
    "name": "SpecialtyDetailedList",
    "group": "Specialty",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"configs\": {\n            \"senior_order_count_needed\": 10,\n            \"middle_order_count_needed\": 3\n        },\n        \"specialties\": [\n            {\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"enabled\": true,\n                \"_id\": \"5de8bb8d05158d1b6d10eb6f\"\n            },\n            {\n                \"name\": \"GR1\",\n                \"info\": \"Info field\",\n                \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n                \"enabled\": true,\n                \"_id\": \"5de8bb90e6f7501b98db2ec4\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/specialties.js",
    "groupTitle": "Specialty"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/specialty/:id",
    "title": "Детали специальности",
    "name": "SpecialtyInfo",
    "group": "Specialty",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": {\n        \"name\": \"GR1\",\n        \"info\": \"Info field\",\n        \"group_id\": \"5de8ba7ed8533e18410ed35c\",\n        \"enabled\": true,\n        \"_id\": \"5de8bb8d05158d1b6d10eb6f\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/specialties.js",
    "groupTitle": "Specialty"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/specialty/list",
    "title": "Список специальностей",
    "name": "SpecialtyList",
    "group": "Specialty",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"name\": \"GR1\",\n            \"info\": \"Info field\",\n            \"group_id\": \"5de8ba7ed8533e18410ed35c\"\n        },\n        {\n            \"name\": \"GR1\",\n            \"info\": \"Info field\",\n            \"group_id\": \"5de8ba7ed8533e18410ed35c\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/specialties.js",
    "groupTitle": "Specialty"
  },
  {
    "type": "get",
    "url": "/mobile_api/v1/specialty/group_list",
    "title": "Список групп специальностей",
    "name": "SpecialtyList",
    "group": "Specialty",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"status\": \"OK\",\n    \"error\": null,\n    \"data\": [\n        {\n            \"name\": \"123\",\n            \"_id\": \"5de8ba7ed8533e18410ed35c\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/mobile/v1/specialties.js",
    "groupTitle": "Specialty"
  }
] });
