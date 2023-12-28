define({ "api": [
  {
    "type": "get",
    "url": "/company_customer/order_track/:order_id",
    "title": "Получить маршрут передвижения авто по заказу",
    "group": "CompanyCustomers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Получить маршрут передвижения авто по заказу</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n [\n{\n   \"lat\": 47.9668,\n   \"lon\": 37.7767\n},\n{\n    \"lat\": 47.9668,\n    \"lon\": 37.7767\n},\n{\n    \"lat\": 47.9668,\n    \"lon\": 37.7767\n},\n    ....\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "CompanyCustomers",
    "name": "GetCompany_customerOrder_trackOrder_id"
  },
  {
    "type": "get",
    "url": "/company_customer/finance_transactions",
    "title": "История финансовых транзакций",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Получить историю транзакций</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    [ {\n\"id\": 13,\n\"value\": -100,\n \"createdAt\": \"2017-05-17T04:42:02.000Z\",\n\"comment\": \"test\"\n},\n      ...\n    ]",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "GetCompany_customerFinance_transactions"
  },
  {
    "type": "get",
    "url": "/customer/:id",
    "title": "Получение профиля",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Получение профиля клиента</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"1\",\n  \"phone\": \"+78315734802\",\n  \"company_phone\": \"+78315734802\",\n  \"company_name\": \"Co & Co\",\n  \"fax\": \"+78315734802\",\n  \"is_company\": true\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "id",
            "description": "<p>ID клиента</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "GetCustomerId"
  },
  {
    "type": "get",
    "url": "/customer/register",
    "title": "Регистрация",
    "group": "Customers",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"id\": \"1\",\n  \"token\": \"HVOMXMSIBMDJLVSMQGHMX7AJ2UBP2YEY3UPWYHZ6KI22WY3LS6HKIZBYYG4BSR6L5GHUZOFRNW7\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Регистрация нового клиента</p>",
    "version": "0.1.0",
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "GetCustomerRegister"
  },
  {
    "type": "get",
    "url": "/customer/transactions",
    "title": "История транзакций",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Получить историю транзакций</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": \"1\",\n  \"value\": \"125\",\n  \"createdAt\": \"2015-09-13T22:35:10.780Z\",\n  \"order\": {\n     \"id\": \"1\",\n     \"from\": \"Место1',\n     \"to: \"Место2\",\n     \"description\": \"Доп описание\",\n     \"additional_phone\": \"Доп. телефон\",\n     \"start_lat\": \"0.000\",\n     \"start_lon\": \"0.000\",\n     \"finish_lat\": \"0.000\",\n     \"finish_lon\": \"0.000\",\n     \"starttime\": \"2015-09-13T22:35:10.780Z\",\n     \"laststatus\": \"20\",\n     \"paytype\": \"1\",\n     \"for_now\": \"false\",\n     \"need_boxes\": \"true\",\n     \"need_loader\": \"true\",\n     \"moving_apartments\": \"текст\",\n     \"photos\": [],\n     \"status\": 10\n  },\n  ...\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "GetCustomerTransactions"
  },
  {
    "type": "post",
    "url": "/customer/code",
    "title": "Получить код",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Получить код</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"Смс с кодом отправлена на указанный номер\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
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
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PostCustomerCode"
  },
  {
    "type": "put",
    "url": "/company_customer/discard",
    "title": "Внешнее пополнение счета",
    "group": "Customers",
    "version": "0.1.0",
    "description": "<p>Подтвердить н. телефона</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Токен пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>Ключ доступа</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "customer_id",
            "description": "<p>ID пользователя</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "value",
            "description": "<p>сумма пополнения</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Комментарий</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n   {\n\"data\": \"OK\"\n  }",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PutCompany_customerDiscard"
  },
  {
    "type": "put",
    "url": "/customer/approve",
    "title": "Подтверждение н. телефона",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Подтвердить н. телефона</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Номер телефона</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Пароль из СМС</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"1\",\n  \"phone\": \"+78315734802\",\n  \"company_phone\": \"+78315734802\",\n  \"company_name\": \"Co & Co\",\n  \"fax\": \"+78315734802\",\n  \"is_company\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PutCustomerApprove"
  },
  {
    "type": "put",
    "url": "/customer/:id",
    "title": "Редактирование профиля",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "description": "<p>Редактирование профиля клиента.</p>",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID клиента</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Телефон</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Факс</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "company_name",
            "description": "<p>Название компании</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "is_company",
            "description": "<p>Юр/Физ лицо</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "region",
            "description": "<p>ID региона</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"1\",\n  \"phone\": \"+78315734802\",\n  \"company_phone\": \"+78315734802\",\n  \"company_name\": \"Co & Co\",\n  \"fax\": \"+78315734802\",\n  \"is_company\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PutCustomerId"
  },
  {
    "type": "put",
    "url": "/customer/:id/position",
    "title": "Координаты клиента",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "description": "<p>Задать координаты клиента</p>",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID клиента</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Широта</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lon",
            "description": "<p>Долгота</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PutCustomerIdPosition"
  },
  {
    "type": "put",
    "url": "/customer/report",
    "title": "Оставить жалобу",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Оставить жалобу</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reason",
            "description": "<p>Причина жалобы</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Текст жалобы</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t\t\"id\": 1,\n\t\t\t\"reason\": \"12345\",\n\t\t\t\"text\": \"test text\"\n\t}",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PutCustomerReport"
  },
  {
    "type": "put",
    "url": "/customer/set_push_token",
    "title": "Токен клиента",
    "group": "Customers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "description": "<p>Задать координаты клиента</p>",
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID клиента</p>"
          }
        ]
      }
    },
    "filename": "api/controllers/CustomersController.js",
    "groupTitle": "Customers",
    "name": "PutCustomerSet_push_token"
  },
  {
    "type": "get",
    "url": "/drivers/active/:id",
    "title": "текущие заказы",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID водителя</p>"
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
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "GetDriversActiveId"
  },
  {
    "type": "get",
    "url": "/drivers/:id",
    "title": "Профиль водителя",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID водителя</p>"
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
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "GetDriversId"
  },
  {
    "type": "get",
    "url": "/drivers/individual_driver/transactions",
    "title": "История транзакций индивидуального водителя",
    "group": "Drivers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Получить историю транзакций</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n     [\n\t\t\t\t{\n\t\t\t\t\t\t\"id\": 2,\n\t\t\t\t\t\t\"value\": 433,\n\t\t\t\t\t\t\"createdAt\": \"2021-05-02T21:00:00.000Z\",\n        \t\t\"order\": 8647\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\t\"id\": 1,\n\t\t\t\t\t\t\"value\": -234,\n\t\t\t\t\t\t\"createdAt\": \"2021-05-12T21:00:00.000Z\"\n\t\t\t\t}\n\t\t]",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "GetDriversIndividual_driverTransactions"
  },
  {
    "type": "post",
    "url": "/drivers/login",
    "title": "Логин водителя",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "callsign",
            "description": "<p>Позывной</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Код службы</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Пароль</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    \"data\": {\n\t        \"id\": 1,\n\t        \"phone_num\": \"+766677776\",\n\t        \"lat\": 0.001,\n\t        \"lon\": 0.001,\n\t        \"color\": \"red\",\n\t        \"reg_number\": \"ВА374О\"\n\t   },\n\t   \"access\": {\n\t       \"token\": \"UZOIHIABNRY4TMEGU6CZ4GS27TIOHGMNBLHXQARA4SJW7PLYNELXL2CPYP43DOGWS2WENWPCADNTDRXBK6XO2U7CDUCMNIOOOKVFUQK3O\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "PostDriversLogin"
  },
  {
    "type": "post",
    "url": "/drivers/map",
    "title": "Водители на карте",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "top_left_lat",
            "description": "<p>Широта верхней левой точки карты</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "top_left_lon",
            "description": "<p>Долгота верхней левой точки карты</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "btm_right_lat",
            "description": "<p>Широта нижней правой точки карты</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "btm_right_lon",
            "description": "<p>Долгота нижней правой точки карты</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "not_in",
            "description": "<p>Массив ID исключающихся из выдачи</p>"
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
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "PostDriversMap"
  },
  {
    "type": "put",
    "url": "/drivers/position",
    "title": "Смена координат",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lon",
            "description": ""
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
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "PutDriversPosition"
  },
  {
    "type": "put",
    "url": "/drivers/status",
    "title": "Смена статуса водителя",
    "group": "Drivers",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": ""
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
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/DriverController.js",
    "groupTitle": "Drivers",
    "name": "PutDriversStatus"
  },
  {
    "type": "get",
    "url": "/orders/:id",
    "title": "Получить инф. о заказе",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID заказа</p>"
          }
        ]
      }
    },
    "description": "<p>Получить информацию о заказе <br> Коды статусов:</p> <ul> <li>10 - Ожидает исполнения</li> <li>20 - поиск в первом круге</li> <li>30 - поиск во втором круге</li> <li>40 - свободный заказ</li> <li>50 - водитель откликнулся ( экипаж назначен)</li> <li>60 - экипаж выехал на заказ (подача авто)</li> <li>70 - экипаж прибыл </li> <li>80 - заказ выполняется </li> <li>90 - поездка окончена. Оплата </li> <li>100 - заказ закрыт ( оплата произведена )</li> <li>110 - заказ отменен (исполнитель не найден/ авто не найдено)</li> <li>120 - заказ отменен (заказчиком)</li> <li>130 - заказ отменен (исполнителем)</li> <li>140 - заказ перехвачен диспетчером (до назначения водителю)</li> </ul>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersId"
  },
  {
    "type": "get",
    "url": "/orders/:id",
    "title": "Получить инф. о заказе",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID заказа</p>"
          }
        ]
      }
    },
    "description": "<p>Получить информацию о заказе <br></p>",
    "filename": "api/models/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersId"
  },
  {
    "type": "get",
    "url": "/orders/:id/close",
    "title": "Закрыть заказ",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "time_inside",
            "description": "<p>Время в черте города (в секундах)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "time_outside",
            "description": "<p>Время за городом (в секундах)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "price_inside",
            "description": "<p>К оплате по городу</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "price_outside",
            "description": "<p>К оплате за городом</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "general_time",
            "description": "<p>Общее время</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "general_price",
            "description": "<p>Всего к оплате</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "tariff",
            "description": "<p>ID тарифа</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Закрыть заказ (для водителя) Переподит заказ из статуса 90 (поездка окончена. Оплата ) в 100 (заказ закрыт, оплата произведена )</p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersIdClose"
  },
  {
    "type": "get",
    "url": "/orders/:id/close",
    "title": "Закрыть заказ",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "time_inside",
            "description": "<p>Время в черте города (в секундах)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "time_outside",
            "description": "<p>Время за городом (в секундах)</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "price_inside",
            "description": "<p>К оплате по городу</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "price_outside",
            "description": "<p>К оплате за городом</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "general_time",
            "description": "<p>Общее время</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "general_price",
            "description": "<p>Всего к оплате</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "tariff",
            "description": "<p>ID тарифа</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Закрыть заказ (для водителя) Переподит заказ из статуса 90 (поездка окончена. Оплата ) в 100 (заказ закрыт, оплата произведена )</p>",
    "filename": "api/models/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersIdClose"
  },
  {
    "type": "get",
    "url": "/orders/:id/take",
    "title": "Взять заказ",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID заказа</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Взять заказ</p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersIdTake"
  },
  {
    "type": "get",
    "url": "/orders/list",
    "title": "Cписок заказов",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Список активных заказов для водителя</p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersList"
  },
  {
    "type": "get",
    "url": "/orders/list",
    "title": "Cписок заказов",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Список активных заказов для водителя</p>",
    "filename": "api/models/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersList"
  },
  {
    "type": "get",
    "url": "/orders/reasons",
    "title": "Причины отмены заказа",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Поучение возможных причин отмены заказа</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n\t \"name\": \"Текст причины\",\n },\n ...]",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersReasons"
  },
  {
    "type": "get",
    "url": "/orders/reasons",
    "title": "Причины отмены заказа",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Поучение возможных причин отмены заказа</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n\t \"name\": \"Текст причины\",\n },\n ...]",
          "type": "json"
        }
      ]
    },
    "filename": "api/models/OrdersController.js",
    "groupTitle": "Orders",
    "name": "GetOrdersReasons"
  },
  {
    "type": "post",
    "url": "/orders/create",
    "title": "Создание заказа",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "description": "<p>Создание заказа</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from",
            "description": "<p>Точка отправлния (адрес)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to",
            "description": "<p>Точка прибытия (адрес)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Дополнительное описание</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_lat",
            "description": "<p>Широта (Координаты места отправления)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "start_lon",
            "description": "<p>Долгота (Координаты места отправления)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "finish_lat",
            "description": "<p>Широта (Координаты места прибытия)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "finish_lon",
            "description": "<p>Долгота (Координаты места прибытия)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "additional_phone",
            "description": "<p>Дополнительный н. телефона</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "paytype",
            "description": "<p>Тип оплаты Коды оплаты:</p> <ul> <li>1 - наличный расчет</li> <li>2 - безналичный расчет</li> <li>3 - расчет по счету предприятия ( только для юр. лиц)</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "cartype",
            "description": "<p>Тип авто</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "region_id",
            "description": "<p>Region ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "for_now",
            "description": "<p>На сейчас</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "need_boxes",
            "description": "<p>Нужны коробки</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "need_loader",
            "description": "<p>Нужен грузчик</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "services",
            "description": "<p>Массив с ID служб</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "moving_apartments",
            "description": "<p>Комментарии по переезду</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "source",
            "description": "<p>Дополнительное поле для создания заказов со сторонних сервисов</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "starttime",
            "description": "<p>Время выполнения 2015-09-13T22:35:10.780Z</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "PostOrdersCreate"
  },
  {
    "type": "post",
    "url": "/orders/:id/uploads",
    "title": "Фото к заказу",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
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
            "field": "id",
            "description": "<p>ID заказа</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Загрузка фотографий к заказу <br> Пример запроса через CURL: <bt> <code>curl -X POST -H &quot;auth_token: ...&quot; &quot;http://[host]:[port]/api/orders/1/uploads&quot; <br> -F images=@&quot;/.../photo1.jpg&quot; -F images=@&quot;/.../photo2.jpg&quot; -F images=@&quot;/.../photo3.jpg&quot; </code></p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "PostOrdersIdUploads"
  },
  {
    "type": "put",
    "url": "/orders/:id/assignto/:did",
    "title": "Назначение заказа",
    "group": "Orders",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "did",
            "description": "<p>ID водителя</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Назначить заказ водителю (для диспетчера)</p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "PutOrdersIdAssigntoDid"
  },
  {
    "type": "put",
    "url": "/orders/:id/cancel",
    "title": "Отмена заказа",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
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
            "field": "id",
            "description": "<p>ID заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "Sting",
            "optional": false,
            "field": "reason",
            "description": "<p>Причина закрытия</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Отменить заказ</p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "PutOrdersIdCancel"
  },
  {
    "type": "put",
    "url": "/orders/:id/cancel",
    "title": "Отмена заказа",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
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
            "field": "id",
            "description": "<p>ID заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "Sting",
            "optional": false,
            "field": "reason",
            "description": "<p>Причина закрытия</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Отменить заказ</p>",
    "filename": "api/models/OrdersController.js",
    "groupTitle": "Orders",
    "name": "PutOrdersIdCancel"
  },
  {
    "type": "put",
    "url": "/orders/:id/status",
    "title": "Статус заказа",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "id",
            "description": "<p>ID заказа</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "status",
            "description": "<p>Статус заказа Коды статусов:</p> <ul> <li>10 - Ожидает исполнения</li> <li>20 - поиск в первом круге</li> <li>30 - поиск во втором круге</li> <li>40 - свободный заказ</li> <li>50 - водитель откликнулся ( экипаж назначен)</li> <li>60 - экипаж выехал на заказ (подача авто)</li> <li>70 - экипаж прибыл </li> <li>80 - заказ выполняется </li> <li>90 - поездка окончена. Оплата </li> <li>100 - заказ закрыт ( оплата произведена )</li> <li>110 - заказ отменен (исполнитель не найден/ авто не найдено)</li> <li>120 - заказ отменен (заказчиком)</li> <li>130 - заказ отменен (исполнителем)</li> <li>140 - заказ перехвачен диспетчером (до назначения водителю)</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": true,
            "field": "service_id",
            "description": "<p>ID службы</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "description": "<p>Изменить статус заказа (для водителя)</p>",
    "filename": "api/controllers/OrdersController.js",
    "groupTitle": "Orders",
    "name": "PutOrdersIdStatus"
  },
  {
    "type": "get",
    "url": "/regions",
    "title": "Список регионов",
    "group": "Regions",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "description": "<p>Список регионов</p>",
    "version": "0.1.0",
    "filename": "api/controllers/RegionController.js",
    "groupTitle": "Regions",
    "name": "GetRegions"
  },
  {
    "type": "get",
    "url": "/regions/:id",
    "title": "Регион",
    "group": "Regions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID региона</p>"
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
            "field": "auth_token",
            "description": "<p>Ключ авторизации</p>"
          }
        ]
      }
    },
    "description": "<p>Получение региональных настроек</p>",
    "version": "0.1.0",
    "filename": "api/controllers/RegionController.js",
    "groupTitle": "Regions",
    "name": "GetRegionsId"
  },
  {
    "type": "get",
    "url": "/regions/:id/services",
    "title": "Список служб в регионе",
    "group": "Regions",
    "description": "<p>Список служб в регионе</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID региона</p>"
          }
        ]
      }
    },
    "version": "0.1.0",
    "filename": "api/controllers/RegionController.js",
    "groupTitle": "Regions",
    "name": "GetRegionsIdServices"
  },
  {
    "type": "get",
    "url": "/settings/customer",
    "title": "Данные о приложении",
    "group": "Settings",
    "version": "0.1.0",
    "description": "<p>Получить данные о приложении</p>",
    "filename": "api/controllers/SettingsController.js",
    "groupTitle": "Settings",
    "name": "GetSettingsCustomer"
  },
  {
    "type": "get",
    "url": "/settings/support_info",
    "title": "Получить данные службы поддержки",
    "group": "Settings",
    "version": "0.1.0",
    "description": "<p>Получить данные службы поддержки</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n{\n   \"id\": 1,\n   \"name\": \"Номер службы поддержки\",\n  \"type\": \"phone\",\n   \"value\": \"8 800 505 2945\"\n},\n{\n   \"id\": 2,\n   \"name\": \"App Site\",\n   \"type\": \"web\",\n   \"value\": \"http://google.com\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "filename": "api/controllers/SettingsController.js",
    "groupTitle": "Settings",
    "name": "GetSettingsSupport_info"
  },
  {
    "type": "get",
    "url": "/settings/tariffs",
    "title": "Получить тарифы",
    "group": "Settings",
    "version": "0.1.0",
    "description": "<p>Получить тарифы</p>",
    "filename": "api/controllers/SettingsController.js",
    "groupTitle": "Settings",
    "name": "GetSettingsTariffs"
  },
  {
    "type": "get",
    "url": "/settings/transport",
    "title": "Виды транспорта",
    "group": "Settings",
    "version": "0.1.0",
    "description": "<p>Получить доступные виды транспорта</p>",
    "filename": "api/controllers/SettingsController.js",
    "groupTitle": "Settings",
    "name": "GetSettingsTransport"
  }
] });
