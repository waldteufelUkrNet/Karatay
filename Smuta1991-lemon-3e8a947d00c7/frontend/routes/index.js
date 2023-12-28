const express = require('express');
const router = express.Router();
const axios = require('axios');
const AxiosLogger = require('axios-logger');
const api = require('../models/api.js');
const moment = require('moment');
const {Op} = require('sequelize')

router.get('/cloudpayment/:unique_id', async function (req, res, next) {
  const {unique_id} = req.params;

  return res.send(`<!DOCTYPE html>
  <html lang="ru-RU">
     <head>
          <style>
          .blur-text {
              color: transparent !important;
              text-shadow: 0 0 3px rgb(0 0 0);
          }
          img {
              max-width: 320px
          }
          .bot-bar {
              bottom: 0;
              position: absolute;
              width: 100%;
          }

          .loader {
              border: 16px solid #f3f3f3; /* Light grey */
              border-top: 16px solid #059862; 
              border-radius: 50%;
              width: 120px;
              height: 120px;
              animation: spin 2s linear infinite;
              margin: auto;
              margin-top: 150px;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

          </style>
        <meta charSet="utf-8"/>
        <meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="alternate" type="application/rss+xml" href="/rss.xml"/>
        <title>Жабка</title>
        <script src="https://widget.cloudpayments.ru/bundles/cloudpayments"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
     </head>
     <body>

     <script>
     this.pay = function () {
      var widget = new cp.CloudPayments();
         widget.pay('charge', // или 'charge'
             { //options
                 publicId: 'pk_21b64f76d32e317af1de3cb967e51', //id из личного кабинета
                 description: 'Оплата товаров в example.com', //назначение
                 amount: 100, //сумма
                 currency: 'RUB', //валюта
                 //accountId: 'user@example.com', //идентификатор плательщика (необязательно)
                 invoiceId: '1234567', //номер заказа  (необязательно)
                 skin: "mini", //дизайн виджета (необязательно)
                 data: {
                     myProp: 'myProp value'
                 }
             },
             {
                 onSuccess: function (options) { // success
                     //действие при успешной оплате
                 },
                 onFail: function (reason, options) { // fail
                     //действие при неуспешной оплате
                 },
                 onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                     //например вызов вашей аналитики Facebook Pixel
                 }
             }
         )
     };

     this.pay();
     </script>
     </body>
  </html>`);
 
});


router.post('/cloudpayment_notification/success', async function (req, res, next) {
  const body = req.body;
  console.log(" SUCCESS body ", body)
  return res.json({code: 0});
});


router.post('/cloudpayment_notification/check', async function (req, res, next) {
  const body = req.body;
  console.log(" CHECK body ", body)
  return res.json({code: 0});
});


router.post('/cloudpayment_notification/fail', async function (req, res, next) {
  const body = req.body;
  console.log(" FAIL body ", body)
  return res.json({code: 0});
});


router.post('/cloudpayment_notification/confirm', async function (req, res, next) {
  const body = req.body;
  console.log(" CONFIRM body ", body)
  return res.json({code: 0});
});
module.exports = router;
