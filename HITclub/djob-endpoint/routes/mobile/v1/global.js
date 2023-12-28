var express = require('express');
var router = express.Router();
var publisher = require('../../../libs/publisher');


/** @api {get} /mobile_api/v1/global/faq FAQ
 * @apiName GetFaqList
 * @apiGroup Global
 * @apiVersion 1.0.0
 *
 * @apiParam {String} type CUSTOMER/EXECUTOR

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.get('/faq', async function (req, res, next) {
    publisher.sendTask( 'get_faq', req, res, {});
});

/** @api {get} /mobile_api/v1/global/privacy_policy get Privacy Policy
 * @apiName getPrivacyPolicy
 * @apiGroup Global
 * @apiVersion 1.0.0
  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.get('/privacy_policy', async function (req, res, next) {
    publisher.sendTask( 'get_privacy_policy', req, res, {});
});


/** @api {get} /mobile_api/v1/global/terms_of_conditions get Terms Of Conditions
 * @apiName getTermsOfConditions
 * @apiGroup Global
 * @apiVersion 1.0.0
  * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.get('/terms_of_conditions', async function (req, res, next) {
    publisher.sendTask( 'get_terms_of_conditions', req, res, {});
});

/** @api {post} /mobile_api/v1/global/report Отправить жалобу
 * @apiName MakeReport
 * @apiGroup Global
 * @apiVersion 1.0.0
 *
 * @apiParam {String} order_id ID заказа
 * @apiParam {String} text Текст жалобы
 * @apiParam {String} [photo] приложенное фото

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.post('/report', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
        let input_data = req.body;
        if(!req.body  || !req.body.order_id ) {
            return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
          }
    publisher.sendTask( 'make_report', req, res, input_data);
});



/** @api {post} /mobile_api/v1/global/report Отправить жалобу
 * @apiName MakeReport
 * @apiGroup Global
 * @apiVersion 1.0.0
 *
 * @apiParam {String} order_id ID заказа
 * @apiParam {String} text Текст жалобы
 * @apiParam {String} [photo] приложенное фото

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.post('/report', async function (req, res, next) {
    if (!req.input_user || !req.input_user.user)
        return res.status(401).json({status: "ERROR", error: 'AUTH_ERROR'});
        let input_data = req.body;
        if(!req.body  || !req.body.order_id ) {
            return res.status(400).json({ status:"ERROR", error: 'MISSING_INPUT_PARAMETERS' });
          }
    publisher.sendTask( 'make_report', req, res, input_data);
});

/** @api {post} /mobile_api/v1/global/support_request Отправить запрос в тех. поддержку
 * @apiName MakeSupportRequest
 * @apiGroup Global
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email Email
 * @apiParam {String} text Текст обращения
 * @apiParam {String} phone Номер телефона

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 */
router.post('/support_request', async function (req, res, next) {
   

    let input_data = req.body;

    publisher.sendTask( 'send_support_request', req, res, input_data);
});
module.exports = router;
