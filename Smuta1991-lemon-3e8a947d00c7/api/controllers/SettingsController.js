/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    /**
     * @api {get} /settings/banner Получить баннер приложения
     * @apiGroup Settings
     * @apiVersion 0.1.0
     * @apiDescription Получить баннер приложения
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
    *{
    *    "url":SOME URL"
    *}
     */
    getBanner: function(req, res) {
            Config.findOne({name:'banner'}).exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }
            Config.findOne({name:'banner_link'}).exec(function(s_err, s_result){
                return res.ok({url:result.value || null, link:s_result.value || null});
            });
        });
     },

     /**
     * @api {get} /settings/help_categories Получить категории помощи
     * @apiGroup Settings
     * @apiVersion 0.1.0
     * @apiDescription Получить категории помощи
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *
    *[
    *{
    *    "id": 1,
    *    "name": "test 1",
    *    "data": "<p><strong>Мовамба</strong> - это удобный сервис для быстрого вызова грузового такси и отслеживания перевозки на карте без необходимости звонить перевозчикам. Заказ грузовой машины можно оставить через мобильное приложение для смартфона или на сайте.</p>\n<p>Заказы перенаправляются официально работающим на рынке грузоперевозок перевозчикам. Именно они являются исполнителями заказа. Мы внимательно следим за качеством услуг, предоставляемых нашими партнерами.</p>\n<p>Наши преимущества:</p>\n<p>- удобный вызов машины без звонка диспетчеру</p>\n<p>- движение машины видно онлайн на карте</p>\n<p>- онлайн-таксометр позволяет оценивать расходы на перевозку</p>\n<p>- прозрачные и простые тарифы без нагромождения условий и сносок мелким шрифтом</p>\n<p>- оплата наличными или картой</p>\n<p>- работа с юридическими лицами по безналичному расчету</p>\n<p>- быстрый поиск машины</p>"
    *},
    *{
    *    "id": 2,
    *    "name": "test 2",
    *    "data": "<p><strong>Мовамба</strong> - это удобный сервис для быстрого вызова грузового такси и отслеживания перевозки на карте без необходимости звонить перевозчикам. Заказ грузовой машины можно оставить через мобильное приложение для смартфона или на сайте.</p>\r\n<p>Заказы перенаправляются официально работающим на рынке грузоперевозок перевозчикам. Именно они являются исполнителями заказа. Мы внимательно следим за качеством услуг, предоставляемых нашими партнерами.</p>\r\n<p>Наши преимущества:</p>\r\n<p>- удобный вызов машины без звонка диспетчеру</p>\r\n<p>- движение машины видно онлайн на карте</p>\r\n<p>- онлайн-таксометр позволяет оценивать расходы на перевозку</p>\r\n<p>- прозрачные и простые тарифы без нагромождения условий и сносок мелким шрифтом</p>\r\n<p>- оплата наличными или картой</p>\r\n<p>- работа с юридическими лицами по безналичному расчету</p>\r\n<p>- быстрый поиск машины</p>"
    *}
    *]
     */
    getHelpCategories: function(req, res) {
        DriverHelp.find({}).exec(function(err, data){
            
            return res.ok(data);
        });
    },

    /**
     * @api {get} /settings/customer Данные о приложении
     * @apiGroup Settings
     * @apiVersion 0.1.0
     * @apiDescription Получить данные о приложении
     */
    getCustomerSettings: function(req, res) {

    	Settings.getValues(['site','contacts','agreement'], function(values){
    		res.ok(values);
    	});
    },

    /**
     * @api {get} /settings/tariffs Получить тарифы
     * @apiGroup Settings
     * @apiVersion 0.1.0
     * @apiDescription Получить тарифы
     */
    getTarrifs: function(req, res){

        Tariffs.find({}).populate('transport').exec(function(err, data){
            console.log(err)
            return res.serialize(data, 'customer', 200);
        });
    },

    /**
     * @api {get} /settings/tariffs_by_region/:id Получить тарифы по ID региона
     * @apiGroup Settings
	 * @apiParam {Number} [id] ID региона
     * @apiVersion 0.1.0
     * @apiDescription Получить тарифы по ID региона
     */
    getTarriffsByRegion: function(req, res){

        Tariffs.find({region: req.param('id')}).populate('transport').exec(function(err, data){
            console.log(err)
            return res.serialize(data, 'customer', 200);
        });
    },

    /**
     * @api {get} /settings/support_info Получить данные службы поддержки
     * @apiGroup Settings
     * @apiVersion 0.1.0
     * @apiDescription Получить данные службы поддержки
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *[
    *{
    *    "id": 1,
    *    "name": "Номер службы поддержки",
    *   "type": "phone",
    *    "value": "8 800 505 2945"
    *},
    *{
    *    "id": 2,
    *    "name": "App Site",
    *    "type": "web",
    *    "value": "http://google.com"
    *}
    *]
     */
    getSupportInfo: function(req, res){

        SupportInfo.find({}).exec(function(err, data){
            
            return res.serialize(data, 'customer', 200);
        });
    },


    /**
     * @api {get} /settings/transport Виды транспорта
     * @apiGroup Settings
     * @apiVersion 0.1.0
     * @apiDescription Получить доступные виды транспорта
     */
    getTransport: function(req, res){

        Transport.find({}).populate('group').exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }

            if (result==undefined){
                return res.notFound({msg: "NO_ANY_TRANSPORT"});
            }
            return res.serialize(result, 'customer', 200);
        });
    },
		getDriverAgreement: function(req, res){
			   Config.findOne({name:'driver_agreement'}).exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }

          return res.ok({text:result.value, code: 200, err:err});
        });
		},
		getClientAgreement: function(req, res){
			   Config.findOne({name:'agreement_text'}).exec(function(err, result){

            if (err){
                return res.badRequest(err);
            }

          return res.ok({text:result.value, code: 200, err:err});
        });
        },
        getGlobalAgreement: function(req, res){
            Config.findOne({name:'agreement_text'}).exec(function(err, result){

         if (err){
             return res.badRequest(err);
         }

       return res.ok(result.value);
     });
     },
		getAboutApp: function(req, res){
			   Config.findOne({name:'about_app'}).exec(function(err, result1){
Config.findOne({name:'support_phone_number'}).exec(function(err, result2){
	Config.findOne({name:'dispetcherskaja_phone'}).exec(function(err, result3){
            if (err){
                return res.badRequest(err);
            }
var site="http://www.movamba.com";
          return res.ok({text:result1.value, support_phone_number:result2.value, dispetcherskaja_phone:result3.value, site:site, code: 200, err:err});
		   });
           });
		   });
		}
    
};

