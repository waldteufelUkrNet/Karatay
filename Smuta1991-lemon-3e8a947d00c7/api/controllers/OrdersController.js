/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
require('crashreporter').configure({
    mailEnabled: true,
    mailTransportName: 'SMTP',
    mailTransportConfig: {
        service: 'Gmail',
        auth: {
            user: "nigatif1991@gmail.com",
            pass: "u6xh3hnj"
        }
    },
    mailSubject: 'advanced.js crashreporter test',
    mailFrom: 'crashreporter <nigatif1991@gmail.com>',
    mailTo: 'nigatif1991@gmail.com'
});
module.exports = {

    /**
     * @api {post} /orders/create Создание заказа
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiDescription Создание заказа
     *
     * @apiParam {String} from Точка отправлния (адрес)
     * @apiParam {String} to Точка прибытия (адрес)
     * @apiParam {String} description Дополнительное описание
     * @apiParam {Number} start_lat Широта (Координаты места отправления)
     * @apiParam {Number} start_lon Долгота (Координаты места отправления)
     * @apiParam {Number} finish_lat Широта (Координаты места прибытия)
     * @apiParam {Number} finish_lon Долгота (Координаты места прибытия)
     * @apiParam {String} additional_phone Дополнительный н. телефона
     * @apiParam {Number} paytype Тип оплаты
     * Коды оплаты:
     * <ul>
     * <li>1 - наличный расчет</li>
     * <li>2 - безналичный расчет</li>
     * <li>3 - расчет по счету предприятия ( только для юр. лиц)</li>
     * </ul>
     * @apiParam {Number} cartype Тип авто
     * @apiParam {Number} region_id Region ID
     * @apiParam {Boolean} for_now На сейчас
     * @apiParam {Boolean} [need_boxes] Нужны коробки
     * @apiParam {Boolean} [need_loader] Нужен грузчик
     * @apiParam {String[]} services  Массив с ID служб
     * @apiParam {String} [moving_apartments] Комментарии по переезду
     * @apiParam {String} [source] Дополнительное поле для создания заказов со сторонних сервисов
     * @apiParam {String} [starttime] Время выполнения 2015-09-13T22:35:10.780Z
     *
     * @apiVersion 0.1.0
     */
    create: function(req, res) {
		
		console.log('create request ',  req.allParams());
        var http = require('http');
        var randtoken = require('rand-token').generator({
            chars: 'base32'
        });

        var u_key = randtoken.generate(20);
        http.post = require('http-post');
        var new_order_params = req.allParams();
        var any_drivers = false;
		console.log('sent params ',  new_order_params);
        for (name in new_order_params) {

            if (new_order_params[name] == "" && name != 'starttime' ) {

                delete new_order_params[name];
            } else {
                if (name == 'starttime') {
                    new_order_params[name] = new Date(new_order_params[name]);
                }
                else  if (name == 'region_id') {
                    new_order_params[name] = parseInt(new_order_params[name]);
                }
            }
        }

        Drivers.find({ pass: {'!': "fake"}, car: new_order_params['cartype'],
            status: 1
        }).exec(function(err, num) {


            console.log(err);
            if (num.length > 0) any_drivers = true;
        });

      /*   Customers.findOne({
            id: req.customer.id
        }).exec(function(err, c) {
            if (c.phone.substring(1, 7) != '7(000)') {

               Config.findOne({
                    name: 'real_order_notification_tel_num'
                }).exec(function(err, conf) {

                    if (err) {
                        console.log(err);
                    }
                    //http.post('http://smsc.ru/sys/send.php', { login:'spsl', psw:'todopampam', mes:'РЕАЛЬНЫЙ пользователь создал заказ на сервере! ', phones:conf.value, charset:'utf-8' }, function(r){});
                    NotificationService.sendSms("REAL_USER_CREATED_ORDER", conf.value, {}, function(r) {});

                });

            }
        });*/
        new_order_params['customer'] = req.customer.id;
        new_order_params['status'] = 20; // Waiting for execute
        new_order_params['round'] = 1;
        new_order_params['u_key'] = u_key;
        //2110
        new_order_params['region_id'] = req.customer.region.id;
        if (!new_order_params['loader_count']){
            new_order_params['loader_count'] = 0;
        }
        if (!new_order_params['finish_lat'] || !new_order_params['finish_lon']) {
            new_order_params['finish_lat'] = 0;
            new_order_params['finish_lon'] = 0;
        }

        if(new_order_params['is_fixed_price'] && new_order_params['fixed_price']){
        }
        else {
            new_order_params['is_fixed_price'] = false;
            new_order_params['fixed_price'] = null;
        }
        var services = new_order_params['services'];
        delete new_order_params['services'];

        async.waterfall([
            function(callback) {

                Orders.create(new_order_params).exec(function(err, created) {

                    if (err) {
                        console.log(err);
                        return callback(err);
                    }
                    var params = new Object();
                    params.customer = req.customer;
                    params.order = created;
                    params.text = 'Заказ создан. Поиск по первому кругу.';
                    params.for_taxometer = false;
                    StatusActivities.create(params).exec(function(err, created_SA) {});
                    console.log('start of first circle order #' + created.id);
					console.log('sent params ',  new_order_params);
					console.log('created order params ',  created);
					
					Customers.findOne({id: req.customer.id}).exec(function(err, c) { 
					    if (c.phone.substring(1, 7) != '7(000)') {
                            NotificationService.sendNewRealOrderNotification( {order_id:created.id, source:created.source}, function(r) {});
                        }
                    });
                callback(null, created);
            });
            },
            function(new_order, callback) {
                Customers.update({
                    id: req.customer.id
                }, {
                    active_order: new_order.id
                }, function(err, customer) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, new_order);
                });
            },
            function(new_order, callback) {
                if (!new_order.finish_lat || !new_order.finish_lon) {
                    new_order.finish_lat = 0;
                    new_order.finish_lon = 0;
                }
                callback(null, new_order);

            },
            function(new_order, callback) {
                RegionSettings.findOne({
                    region: req.customer.region.id
                }, function(err, settings) {

                    if (err) {
                        return callback(err);
                    }

                    //if(!req.param('for_now')||!any_drivers){
                    if (!any_drivers) {
                        settings.first_circle_time = 0;
                        settings.second_circle_time = 0;
                    } else {
                        ///////////////PUSH рассылка ////////////////////////////////////////////////////
                        Orders.query('CALL findFreeCrewsInRadius("' + new_order.start_lat + '","' + new_order.start_lon + '","' + settings.first_circle_radius + '","' + new_order_params['cartype'] + '") ', function(err, drv_tmp_result) {
                            var drv_tmp_num = drv_tmp_result[0];
                            console.log("Drivers in radius 1", drv_tmp_num);

                            Services.find({
                                region: new_order.region_id
                            }).exec(function(err, push_to_services) {

                                let service_ids_list = [];
                                for(let service_index =0; service_index< push_to_services.length; service_index++)
                                    service_ids_list.push(push_to_services[service_index].id)

                                   console.log("service_ids_list ",service_ids_list)

                                if (drv_tmp_num.length > 0 && settings.first_circle_time!==0) {
                                    var push_first_circle = require("./../services/pushDriver.js");

                                    

                                    drv_tmp_num.forEach(function(target_driver) {
                                        console.log("Driver one", target_driver);
                                        console.log("target_driver.service ",target_driver.service_id)
                                        if ((target_driver.os == "android" || target_driver.os == "ios") && service_ids_list.indexOf(target_driver.service_id) >= 0) {
                                            console.log("Driver id1", target_driver.id);
                                            var token = target_driver.push_token;
                                            var push_type = target_driver.os;
                                            var title = 'Доступен новый заказ';
                                            console.log("push type", target_driver.os);
                                            console.log("push token", target_driver.push_token);
                                            console.log("PUSH SENDED");
                                            push_first_circle.sendMessage(push_type, token, title, 'body', function(err, result) {
                                                if (err)
                                                    console.log("push err", err);
                                            });
                                        }
                                    });

                                }
                            });

                        });
                        //////////////////////////////////////////////////////////////////////////////
                    }




                    return callback(null, new_order, settings);
                });
            }
        ], function(err, order, settings) {

            if (err) {
                return res.badRequest(err);
            }

            async.waterfall([

                function(callback) {

                    setTimeout(function() {
                        console.log('end of first circle order #' + order.id);

                        Orders.update({
                            id: order.id,
                            status: 20,
                            round: 1,
                            u_key: u_key
                        }, {
                            status: 30,
                            round: 2
                        }).exec(function(err, orders) {


                            if (err) {
                                console.log(err);
                                return callback(err);
                            }

                            ///////////////PUSH рассылка ////////////////////////////////////////////////////
                            Orders.query('CALL findFreeCrewsInRadius("' + order.start_lat + '","' + order.start_lon + '","' + settings.second_circle_radius + '","' + new_order_params['cartype'] + '") ', function(err, drv_tmp_result) {
                               if(drv_tmp_result){
							   var drv_tmp_num = drv_tmp_result[0];
                                console.log("Drivers in radius 2", drv_tmp_num);

                                Services.find({
                                    region: order.region_id
                                }).exec(function(err, push_to_services) {
    
                                    let service_ids_list = [];
                                    for(let service_index =0; service_index< push_to_services.length; service_index++)
                                        service_ids_list.push(push_to_services[service_index].id)
    
                                       console.log("service_ids_list ",service_ids_list)
                                    
                                       
                                        if (drv_tmp_num.length > 0 && settings.second_circle_time!==0) {
                                            var push_first_circle = require("./../services/pushDriver.js");

                                            drv_tmp_num.forEach(function(target_driver) {
                                                console.log("Driver id2", target_driver.id);
                                                if ((target_driver.os == "android" || target_driver.os == "ios") && service_ids_list.indexOf(target_driver.service) >= 0) {
                                                    var token = target_driver.push_token;
                                                    var push_type = target_driver.os;
                                                    var title = 'Доступен новый заказ';
                                                    console.log("push type", target_driver.os);
                                                    console.log("push token", target_driver.push_token);
                                                    console.log("PUSH SENDED");
                                                    push_first_circle.sendMessage(push_type, token, title, 'body', function(err, result) {

                                                    });
                                                }
                                            });

                                        }
                                });


							   }
                            });
                            //////////////////////////////////////////////////////////////////////////////

                            if (orders.length < 1) {
                                return callback({
                                    msg: 'Order not found',
                                    code: 404
                                });
                            }

                            console.log('start of second circle order #' + order.id);

                            order = orders[0];
                            //ЛОГ//
                            //////////////////////////////////////////////////////////////////
                            var params = new Object();
                            params.customer = order.customer;
                            params.order = order;
                            params.text = 'Поиск по второму кругу';
                            params.for_taxometer = false;
                            StatusActivities.create(params).exec(function(err, created_SA) {});
                            //////////////////////////////////////////////////////////////////
                            var rooms = sails.sockets.rooms();
                            sails.sockets.emit(rooms, 'orders_' + order.id, {
                                id: order.id,
                                status: order.status
                            });


                            console.log('update index of order #' + order.id);
                            callback(null, order, settings);
                        });

                    }, settings.first_circle_time * 60 * 1000);
                },
                function(order, settings, callback) {

                    setTimeout(function() {

                        console.log('end of second circle for order #' + order.id);

                        Orders.update({
                            id: order.id,
                            status: 30,
                            round: 2,
                            u_key: u_key
                        }, {
                            status: 40,
                            round: 0,
                            operator_got_time: new Date()
                        }).exec(function(err, orders) {

                            if (err) {
                                console.log(err);
                                return callback(err);
                            }

                            if (orders.length < 1) {
                                return callback({
                                    msg: 'Order not found',
                                    code: 404
                                })
                            }

                            order = orders[0];
                            //ЛОГ//
                            //////////////////////////////////////////////////////////////////
                            var params = new Object();
                            params.customer = order.customer;
                            params.order = order;
                            params.text = 'Свободный заказ';
                            params.for_taxometer = false;
                            StatusActivities.create(params).exec(function(err, created_SA) {});
                            //////////////////////////////////////////////////////////////////
                            console.log('order #' + order.id + ' is free');

                            var rooms = sails.sockets.rooms();
                            sails.sockets.emit(rooms, 'orders_' + order.id, {
                                id: order.id,
                                status: order.status
                            });


                            console.log('update index of order #' + order.id);
                            callback(null, order, settings);
                        });

                    }, settings.second_circle_time * 60 * 1000);

                },
                function(order, settings, callback) {

                    setTimeout(function() {
                        Orders.find({
                            id: order.id,
                            status: 40,
                            round: 0
                        }).exec(function(err, found_orders) {
                            var current_status = 40;
                            if (found_orders.length < 1)
                                current_status = 140;
                            Orders.update({
                                id: order.id,
                                status: current_status,
                                round: 0,
                                u_key: u_key
                            }, {
                                status: 110
                            }).exec(function(err, orders) {

                                if (err) {
                                    return callback(err);
                                }

                                if (orders.length < 1) {
                                    return callback({
                                        msg: 'Order not found',
                                        code: 404
                                    })
                                }

                                order = orders[0];

                                Customers.findOne({
                                    id: order.customer
                                }).exec(function(err, target_customer) {
                                    if (target_customer.os == "android" || target_customer.os == "ios") {
                                        var token = target_customer.push_token;
                                        var push_type = target_customer.os;
                                        var title = 'К сожалению, мы не смогли найти авто по Вашей заявке.';
                                        var push = require("./../services/pushCustomer.js");
                                        push.sendMessage(push_type, token, title, 'body', function(err, result) {

                                        });
                                    }
                                    if (target_customer.phone.substring(1, 7) != '7(000)') {
                                        //   http.post('http://smsc.ru/sys/send.php', { login:'spsl', psw:'todopampam', mes:'К сожалению, мы не смогли найти авто по Вашей заявке.', phones:target_customer.phone.substring(1), charset:'utf-8' }, function(resp){});
                                        NotificationService.sendSms("DRIVER_ORDER_CANCEL", target_customer.phone.substring(1), {
                                            order_id: order.id
                                        }, function(r) {});
                                    }
										NotificationService.sendCustomerEmail("ORDER_CANCEL",  {user_id:order.customer, order_id: order.id}, function(resp) {});
                                });
                                //ЛОГ//
                                //////////////////////////////////////////////////////////////////
                                var params = new Object();
                                params.customer = order.customer;
                                params.order = order;
                                params.text = 'Заказ отменен (исполнитель не найден/ авто не найдено)';
                                params.for_taxometer = false;
                                StatusActivities.create(params).exec(function(err, created_SA) {});
                               //////////////////////////////////////////////////////////////////

                                var rooms = sails.sockets.rooms();
                                sails.sockets.emit(rooms, 'orders_' + order.id, {
                                    id: order.id,
                                    status: order.status
                                });


                                console.log('index of order #' + order.id + ' removed');


                            });
                        });

                    }, settings.free_time_for_order * 60 * 1000);

                }
            ], function(err, result) {

                if (err) {
                    console.log(err);
                    return err;
                }
                //	console.log(result);
                return result;
            });

            return res.serialize(order, 'customer', 201);
        });
    },



    /**
     * @api {post} /orders/check_distance Check fixed price distance
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiDescription Check fixed price distance
     *
     * @apiParam {Number} start_lat Широта (Координаты места отправления)
     * @apiParam {Number} start_lon Долгота (Координаты места отправления)
     * @apiParam {Number} finish_lat Широта (Координаты места прибытия)
     * @apiParam {Number} finish_lon Долгота (Координаты места прибытия)
     * @apiVersion 0.1.0
     */
    getDistanceByCoords: async function(req, res) {
		
		console.log('create request ',  req.allParams());
        var http = require('http'); 
        http.post = require('http-post');
        var new_order_params = req.allParams();
        let price = 0;
        if (!new_order_params['finish_lat'] || !new_order_params['finish_lon'] || !new_order_params['start_lat'] || !new_order_params['start_lon']) {
            
            return res.ok({status:"ERROR"}, 200);
        }


        return res.ok({status:"OK", data: {
            distance: 41
        }}, 200);
    },
    /**
     * @api {post} /orders/:id/uploads Фото к заказу
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiParam {Number} id ID заказа
     *
     * @apiVersion 0.1.0
     * @apiDescription Загрузка фотографий к заказу <br>
     * Пример запроса через CURL: <bt>
     * <code>curl -X POST -H "auth_token: ..." "http://[host]:[port]/api/orders/1/uploads" <br>
     * -F images=@"/.../photo1.jpg" -F images=@"/.../photo2.jpg" -F images=@"/.../photo3.jpg" </code>
     */
    uploadFiles: function(req, res) {

        Customers.findOne({
            token: req.headers['auth_token']
        }, function(err, customer) {

            if (err) {
                return res.notFound(err);
            }

            Orders.findOne({
                id: req.param('id'),
                customer: customer.id
            }, function(err, order) {

                if (err) {
                    console.log('order error ' + order);
                    return res.notFound(err);
                }

                req.file('images').upload({
                    dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/orders')
                }, function(err, uploadedFiles) {
                    if (err) return res.negotiate(err);


                    async.each(['0'], function(file, callback) {
                        var index = 0;

                        while (index < uploadedFiles.length) {
                            var abs_path = uploadedFiles[index]['fd'];
                            var img_name = abs_path.substr(abs_path.lastIndexOf('/') + 1);
                            OrdersPhoto.create({
                                path: 'uploads/orders/' + img_name,
                                request: req.param('id')
                            }).exec(function(err, created) {

                                if (err) {
                                    callback(err);
                                }
                            });
                            index++;
                        }
                        callback();
                    }, function(err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            return res.badRequest(err);
                        }

                        Orders.findOne({
                            id: req.param('id')
                        }).populate('photos').exec(function(err, changed) {

                            return res.serialize(changed, 'customer', 200);
                        });
                    });
                });
            });
        });
    },

    /**
     * @api {put} /orders/:id/cancel Отмена заказа
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiParam {Number} id ID заказа
     * @apiParam {Sting} reason Причина закрытия
     * @apiVersion 0.1.0
     * @apiDescription Отменить заказ
     */
    cancel: function(req, res) {
        var http = require('http');
        http.post = require('http-post');
        var role = null;
        var criteria = {
            id: req.param('id')
        };
        var params = {
            cancel_reason: req.param('reason')
        };

        if (req.customer) {
            role = 'customer';
            criteria.customer = req.customer.id;
            params.status = 120;

        } else if (req.driver) {
            role = 'driver';
            criteria.driver = req.driver.id;
            params.status = 130;

        }

        var rooms = sails.sockets.rooms();
        sails.sockets.emit(rooms, 'orders_' + criteria.id, {
            id: criteria.id,
            cancel_reason: params.cancel_reason,
            status: params.status
        });

        Orders.update(criteria, params).exec(function(err, orders) {

            if (err) {
                return res.badRequest(err);
            }

            if (orders == undefined) {
                return res.notFound({
                    msg: 'ORDER_NOT_FOUND'
                });
            }

            if (orders.length < 1) {
                return res.notFound({
                    msg: 'ORDER_NOT_FOUND'
                });
            }

            var order = orders[0];
            var global_order = order;
            //ЛОГ//
            //////////////////////////////////////////////////////////////////
            if (req.customer) {

                var params = new Object();
                params.customer = req.customer;
                params.order = order;
                params.text = 'Заказ отменен заказчиком';
                params.for_taxometer = false;
                StatusActivities.create(params).exec(function(err, created_SA) {});

                if (order.driver)
                    Drivers.findOne({
                        id: order.driver
                    }).exec(function(err, target_driver) {
                        if (target_driver.os == "android" || target_driver.os == "ios") {
                            var token = target_driver.push_token;
                            var push_type = target_driver.os;
                            var title = 'К сожалению, заявка, которая выполняется в текущий момент, отменена заказчиком';
                            var push = require("./../services/pushDriver.js");
                            push.sendMessage(push_type, token, title, 'body', function(err, result) {});

                            if (target_driver.phone_num.substring(1, 7) != '7(000)') {
                                NotificationService.sendSms("CUSTOMER_ORDER_CANCEL", target_driver.phone_num.substring(1), {}, function(r) {});
                            }
	                           
                            Customers.findOne({ id: order.customer}).exec(function(err, target_customer) { if (target_driver.phone_num.substring(1, 7) != '7(000)') {
                                    NotificationService.sendSms("DRIVER_ORDER_CANCEL", target_customer.phone.substring(1), { order_id: order.id }, function(r) {});
                                }
                            });



                        }
                    });


            } else if (req.driver) {
                var params = new Object();
                params.driver = req.driver;
                params.order = order;
                params.text = 'Заказ отменен исполнителем';
                params.for_taxometer = false;
                StatusActivities.create(params).exec(function(err, created_SA) {});

                Customers.findOne({
                    id: order.customer
                }).exec(function(err, target_customer) {
                    if (target_customer.os == "android" || target_customer.os == "ios") {
                        var token = target_customer.push_token;
                        var push_type = target_customer.os;
                        var title = 'К сожалению, заявка, которая выполняется в текущий момент, отменена исполнителем. Новый исполнитель по-вашему заказу будет назначен в ближайшее время.';
                        var push = require("./../services/pushCustomer.js");
                        push.sendMessage(push_type, token, title, 'body', function(err, result) {});
                    }
                    if (target_customer.phone.substring(1, 7) != '7(000)') {
                NotificationService.sendSms("DRIVER_ORDER_CANCEL", target_customer.phone.substring(1), {
                            order_id: order.id
                        }, function(r) {});
                    }
                NotificationService.sendCustomerEmail("ORDER_CANCEL",  {user_id:order.customer, order_id: order.id}, function(resp) {});
                });
            }
            if (global_order.status != 130) {
                if (order.driver && order.driver != null) {
                    Drivers.update({
                        id: order.driver
                    }, {
                        status: 1
                    }).exec(function(err, active_drivers) {
                        return res.serialize(order, role, 200);
                    });
                } else {
                    return res.serialize(order, role, 200);
                }
            } else {
                var randtoken = require('rand-token').generator({
                    chars: 'base32'
                });
                var u_key = randtoken.generate(20);
                async.waterfall([function(callback) {
                    Orders.update({
                        id: global_order.id
                    }, {
                        status: 20,
                        round: 1,
                        driver: null,
                        u_key: u_key
                    }).exec(function(err, updated) {
                        if (err) {
                            return callback(err);
                        }
                        var rooms = sails.sockets.rooms();
                        sails.sockets.emit(rooms, 'orders_' + updated[0].id, {
                            id: updated[0].id,
                            status: updated[0].status
                        });

                        var params = new Object();
                        params.order = updated[0];
                        params.text = 'Заказ отменен исполнителем во время выполнения. Заказ пересоздан. Поиск по первому кругу.';
                        params.for_taxometer = false;
                        StatusActivities.create(params).exec(function(err, created_SA) {});


                        callback(null, updated[0]);
                    });
                }, function(new_order, callback) {

                    callback(null, new_order);

                }, function(new_order, callback) {


                    RegionSettings.findOne({
                        region: 3
                    }, function(err, settings) {

                        if (err) {
                            return callback(err);
                        }

                        if (!new_order.for_now) {
                            settings.first_circle_time = 0;
                            settings.second_circle_time = 0;
                        }




                        return callback(null, new_order, settings);
                    });
                }], function(err, order, settings) {

                    if (err) {
                        //return res.badRequest(err);
                    }

                    async.waterfall([

                        function(callback) {

                            setTimeout(function() {


                                console.log(order);

                                Orders.update({
                                    id: order.id,
                                    status: 20,
                                    round: 1,
                                    u_key: u_key
                                }, {
                                    status: 30,
                                    round: 2
                                }).exec(function(err, orders) {


                                    if (err) {
                                        return callback(err);
                                    }
                                    if (orders.length < 1) {
                                        return callback({
                                            msg: 'Order not found',
                                            code: 404
                                        });
                                    }


                                    order = orders[0];
                                    //ЛОГ//
                                    //////////////////////////////////////////////////////////////////
                                    var params = new Object();
                                    params.customer = order.customer;
                                    params.order = order;
                                    params.text = 'Поиск по второму кругу';
                                    params.for_taxometer = false;
                                    StatusActivities.create(params).exec(function(err, created_SA) {});
                                    //////////////////////////////////////////////////////////////////
                                    var rooms = sails.sockets.rooms();
                                    sails.sockets.emit(rooms, 'orders_' + order.id, {
                                        id: order.id,
                                        status: order.status
                                    });


                                    console.log('update index of order #' + order.id);
                                    callback(null, order, settings);

                                });

                            }, settings.first_circle_time * 60 * 1000);
                        },
                        function(order, settings, callback) {

                            setTimeout(function() {

                                console.log('end of second circle for order #' + order.id);

                                Orders.update({
                                    id: order.id,
                                    status: 30,
                                    round: 2,
                                    u_key: u_key
                                }, {
                                    status: 40,
                                    round: 0
                                }).exec(function(err, orders) {

                                    if (err) {
                                        return callback(err);
                                    }

                                    if (orders.length < 1) {
                                        return callback({
                                            msg: 'Order not found',
                                            code: 404
                                        })
                                    }

                                    order = orders[0];
                                    //ЛОГ//
                                    //////////////////////////////////////////////////////////////////
                                    var params = new Object();
                                    params.customer = order.customer;
                                    params.order = order;
                                    params.text = 'Свободный заказ';
                                    params.for_taxometer = false;
                                    StatusActivities.create(params).exec(function(err, created_SA) {});
                                    //////////////////////////////////////////////////////////////////


                                    var rooms = sails.sockets.rooms();
                                    sails.sockets.emit(rooms, 'orders_' + order.id, {
                                        id: order.id,
                                        status: order.status
                                    });


                                    console.log('update index of order #' + order.id);
                                    if (err) {
                                        return callback(err);
                                    }
                                    callback(null, order, settings);

                                });

                            }, settings.second_circle_time * 60 * 1000);

                        },
                        function(order, settings, callback) {

                            setTimeout(function() {
                                Orders.find({
                                    id: order.id,
                                    status: 40,
                                    round: 0,
                                    u_key: u_key
                                }).exec(function(err, found_orders) {
                                    var current_status = 40;
                                    if (found_orders.length < 1)
                                        current_status = 140;
                                    Orders.update({
                                        id: order.id,
                                        status: current_status,
                                        round: 0,
                                        u_key: u_key
                                    }, {
                                        status: 110
                                    }).exec(function(err, orders) {

                                        if (err) {
                                            return callback(err);
                                        }

                                        if (orders.length < 1) {
                                            return callback({
                                                msg: 'Order not found',
                                                code: 404
                                            })
                                        }

                                        order = orders[0];

                                        Customers.findOne({
                                            id: order.customer
                                        }).exec(function(err, target_customer) {
                                            if (target_customer.os == "android" || target_customer.os == "ios") {
                                                var token = target_customer.push_token;
                                                var push_type = target_customer.os;
                                                var title = 'К сожалению, мы не смогли найти авто по Вашей заявке.';
                                                var push = require("./../services/pushCustomer.js");
                                                push.sendMessage(push_type, token, title, 'body', function(err, result) {});
                                            }

                                            if (target_customer.phone.substring(1, 7) != '7(000)') {
                                                // http.post('http://smsc.ru/sys/send.php', { login:'spsl', psw:'todopampam', mes:'К сожалению, мы не смогли найти авто по Вашей заявке.', phones:target_customer.phone.substring(1), charset:'utf-8' }, function(resp){});
                                                NotificationService.sendSms("DRIVER_ORDER_CANCEL", target_customer.phone.substring(1), {
                                                    order_id: order.id
                                                }, function(r) {});
                                            }
	                                         NotificationService.sendCustomerEmail("ORDER_CANCEL",  {user_id:order.customer, order_id: order.id}, function(resp) {});



                                        });
                                        //ЛОГ//
                                        //////////////////////////////////////////////////////////////////
                                        var params = new Object();
                                        params.customer = order.customer;
                                        params.order = order;
                                        params.text = 'Заказ отменен (исполнитель не найден/ авто не найдено)';
                                        params.for_taxometer = false;
                                        StatusActivities.create(params).exec(function(err, created_SA) {});
                                        //////////////////////////////////////////////////////////////////
                                        var rooms = sails.sockets.rooms();
                                        sails.sockets.emit(rooms, 'orders_' + order.id, {
                                            id: order.id,
                                            status: order.status
                                        });

                                        console.log('index of order #' + order.id + ' removed');

                                        callback(null, order, settings);


                                    });
                                });

                            }, settings.free_time_for_order * 60 * 1000);

                        }
                    ], function(err, result) {

                        if (err) {
                            console.log(err);
                            return err;
                        }

                        return result;
                    });

                });

                if (order.driver && order.driver != null) {


                    Drivers.update({
                        id: global_order.driver
                    }, {
                        status: 1,
                        blocked: true,
                        block_reason: 'Отмена заказа в статусе "на исполнении"'
                    }).exec(function(err, active_drivers) {
                        var rooms = sails.sockets.rooms();
                        sails.sockets.emit(rooms, 'driver_' + active_drivers[0].id, {
                            id: active_drivers[0].id,
                            action: "BANNED"
                        });
                        return res.serialize(global_order, role, 200);
                    });

                }




            }




        });
    },

    /**
     * @api {get} /orders/reasons Причины отмены заказа
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Поучение возможных причин отмены заказа
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * [{
     *   "id": 1,
     *	 "name": "Текст причины",
     *  },
     *  ...]
     */
    cancelReasons: function(req, res) {

        var type = 'customer';
        if (req.driver != undefined) {
            type = 'driver';
        }

        OrdersReason.find({
            rtype: type
        }).exec(function(err, response) {

            if (err) {
                return res.badRequest(err);
            }
            if (response == undefined) {
                return res.badRequest({
                    msg: "QUERY_ERROR"
                });
            }

            return res.serialize(response, type, 200);
        });
    },


    /**
     * @api {get} /orders/:id Получить инф. о заказе
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiParam {Number} id ID заказа
     * @apiDescription Получить информацию о заказе <br>
     * Коды статусов:
     * <ul>
     * <li>10 - Ожидает исполнения</li>
     * <li>20 - поиск в первом круге</li>
     * <li>30 - поиск во втором круге</li>
     * <li>40 - свободный заказ</li>
     * <li>50 - водитель откликнулся ( экипаж назначен)</li>
     * <li>60 - экипаж выехал на заказ (подача авто)</li>
     * <li>70 - экипаж прибыл </li>
     * <li>80 - заказ выполняется </li>
     * <li>90 - поездка окончена. Оплата </li>
     * <li>100 - заказ закрыт ( оплата произведена )</li>
     * <li>110 - заказ отменен (исполнитель не найден/ авто не найдено)</li>
     * <li>120 - заказ отменен (заказчиком)</li>
     * <li>130 - заказ отменен (исполнителем)</li>
     * <li>140 - заказ перехвачен диспетчером (до назначения водителю)</li>
     * </ul>
     */
    get: function(req, res) {
        Orders.findOne({
                id: req.param('id')
            })
            .populate('photos')
            .populate('customer')
            //.populate('curtype')
            .exec(function(err, order) {




                if (err) {
                    return res.badRequest(err);
                }

                if (order == undefined) {
                    return res.notFound({
                        msg: "ORDER_NOT_FOUND",
                        code: 404
                    });
                }


                OrdersPhoto.find({
                        request: order.id
                    })

                    .exec(function(err, ordersphotos) {
                        if (err) {
                            return res.badRequest(err);
                        }

                        order.photos = ordersphotos;
						
                        return res.serialize(order, 'driver', 200);
                    });

            });
    },

	   testEmail: function(req, res) {
     var request = require("request");
  // NotificationService.sendEmail("ORDER_WAITING", 'nigatif1991@gmail.com', {order_id: 8371}, function(resp) {});
	//		  NotificationService.sendEmail("ORDER_CANCEL", 'nigatif1991@gmail.com', {order_id: 8371}, function(resp) {});
	//		  NotificationService.sendEmail("ORDER_ACTIVE", 'nigatif1991@gmail.com', { order_id: 8371}, function(resp) {});
 // NotificationService.sendEmail("CUSTOMER_BILL_ADDED", 'nigatif1991@gmail.com', {summ: 8371}, function(resp) {});												
								var http = require('http');


/*
request("http://b2b.movamba.com/api/user_info/66755/FRJSQQPBA3DG5KD4JX57MLX6QUKSOWKEGHXLX6O6OONGV6ASKAMPBHTULWPHFZFIB2UJCQJCTMS", function(error, response, body) {
  console.log(body);
  parsedBody = JSON.parse(body);
  console.log(parsedBody);
  if(parsedBody.error){
	  
  }
  else{
	  
  }
});		*/
												NotificationService.sendCustomerEmail("ORDER_DONE_COMPANY",  {
                                                    order_id:  8476, user_id: 82185
                                                }, function(resp) {
												
												});
											
													return res.ok({status:"OK"}, 200);
    },
    /**
     * @api {get} /orders/list Cписок заказов
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiVersion 0.1.0
     * @apiDescription Список активных заказов для водителя
     */
    list: function(req, res) {


        var not_in = [0];
        Services.findOne({
            id: req.driver.service.id
        }).populate('region').exec(function(err, service) {

            if (err) {
                return res.badRequest(err);
            }

            RegionSettings.findOne({
                region: service.region.id
            }, function(err, settings) {


                if (err) {
                    return res.badRequest(err);
                }

                var rounds = [settings.first_circle_radius, settings.second_circle_radius];
                roundids1 = [];
                roundids2 = [];
                var i = 0;
                async.each(rounds, function(round, callback) {
                    i++;
                    Orders.query('CALL ordersinradius("' + req.driver.lat + '","' + req.driver.lon + '","' + round + '","' + i + '") ', function(err, result) {
                        //	console.log("number_"+i);	//console.log(result);
                        if (err) {
                            callback(err);
                        } else {
                            var localids = result[0];


                            localids.forEach(function(item, z, localids) {
                                if (i == 1)
                                    roundids1.push(item.id);
                                if (i == 2)
                                    roundids2.push(item.id);
                            });
                            //console.log(roundids1);
                            //	console.log(roundids2);
                            callback();
                        }
                    });




                }, function(err) {

                    if (err) {
                        return res.badRequest(err);
                    }
                    //roundids1=roundids1+roundids2;
                    var roundids = roundids1.concat(roundids2);
                    //console.log(roundids1);


                    if (service.code == "0777" || service.code == "0007" || service.code == "3333")
                        Orders.find({
                            status: [20, 30, 40]
                        }).exec(function(err, found) {


                            return res.serialize(found, 'driver', 200);
                        });

                    else
                        Orders.find({
                            id: roundids,
                            cartype: req.driver.car,
                            status: [20, 30]
                        }).exec(function(err, found) {


                            return res.serialize(found, 'driver', 200);
                        });




                });

            });

        });




    },

    /**
    * @api {get} /orders/:id/take Взять заказ
    * @apiGroup Orders

    * @apiHeader {String} auth_token Ключ авторизации
    * @apiParam {Integer} id ID заказа
    * @apiVersion 0.1.0
    * @apiDescription Взять заказ
    */
    take: function(req, res) {


        Orders.findOne({
            id: req.param('id')
        }).exec(function(err, dubled_one) {
            if (err) {
                return res.badRequest({
                    err: 'another driver'
                });
            }
            if (dubled_one.driver) {
                return res.badRequest({
                    err: 'another driver'
                });
            }

            async.waterfall([
                function(callback) {

                    Orders.update({
                        id: req.param('id')
                    }, {
                        status: 50,
                        driver: req.driver.id,
                        service: req.driver.service
                    }).exec(function(err, orders) {

                        if (err) {
                            return callback({
                                msg: "Update error",
                                code: 404
                            });
                            return callback(err);
                        }

                        if (orders.length < 1) {
                            return callback({
                                msg: "Order not found",
                                code: 404
                            });
                        }

                        var order = orders[0];

                        Customers.findOne({
                            id: order.customer
                        }).exec(function(err_push, target_customer) {
                            if (target_customer.os == "android" || target_customer.os == "ios") {
                                var token = target_customer.push_token;
                                var push_type = target_customer.os;
                                var title = 'Водитель откликнулся на заявку !';
                                var push = require("./../services/pushCustomer.js");
                                push.sendMessage(push_type, token, title, 'body', function(err_push, result_push) {
                                });
                            }
                        });



                        console.log('update index of order #' + order.id);
                        if (err) {

                            return callback(err);
                        }

                        callback(null, order);

                    });
                },
                function(order, callback) {
			console.log("Setting active order for driver "+order.id)
                    Drivers.update({
                        id: req.driver.id
                    }, {
                        active_order: order.id,
                        status: 2
                    }).exec(function(err, drivers) {

                        if (err) {

                            return callback(err);
                        }

                        var driver = drivers[0];
                        //ЛОГ//
                        //////////////////////////////////////////////////////////////////
                        var params = new Object();
                        params.driver = driver;
                        params.order = order;
                        params.text = 'Водитель откликнулся (экипаж назначен)';
                        params.for_taxometer = false;
                        StatusActivities.create(params).exec(function(err, created_SA) {});
                        //////////////////////////////////////////////////////////////////
                        var rooms = sails.sockets.rooms();
                        sails.sockets.emit(rooms, 'orders_' + order.id, {
                            id: order.id,
                            status: order.status,
                            driver: {
                                id: driver.id,
                                callsign: driver.callsign,
                                name: driver.name,
                                lat: driver.lat,
                                lon: driver.lon,
                                car: driver.car,
                                color: driver.color,
                                reg_number: driver.reg_number,
                                region_number: driver.region_number,
                                phone_num: driver.phone_num
                            }
                        });
						NotificationService.sendCustomerEmail("ORDER_WAITING",  {user_id:order.customer, order_id: order.id}, function(resp) {});

                        callback(null, order);
                    });
                }
            ], function(err, result) {

                if (err) {

                    return res.badRequest(err);
                }

                return res.serialize(result, 'driver', 200);
            });

        });
    },

    /**
     * @api {put} /orders/:id/status Статус заказа
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiParam {Integer} id ID заказа
     * @apiParam {Integer} status Статус заказа
     * Коды статусов:
     * <ul>
     * <li>10 - Ожидает исполнения</li>
     * <li>20 - поиск в первом круге</li>
     * <li>30 - поиск во втором круге</li>
     * <li>40 - свободный заказ</li>
     * <li>50 - водитель откликнулся ( экипаж назначен)</li>
     * <li>60 - экипаж выехал на заказ (подача авто)</li>
     * <li>70 - экипаж прибыл </li>
     * <li>80 - заказ выполняется </li>
     * <li>90 - поездка окончена. Оплата </li>
     * <li>100 - заказ закрыт ( оплата произведена )</li>
     * <li>110 - заказ отменен (исполнитель не найден/ авто не найдено)</li>
     * <li>120 - заказ отменен (заказчиком)</li>
     * <li>130 - заказ отменен (исполнителем)</li>
     * <li>140 - заказ перехвачен диспетчером (до назначения водителю)</li>
     * </ul>
     * @apiParam {Integer} [service_id] ID службы
     * @apiVersion 0.1.0
     * @apiDescription Изменить статус заказа (для водителя)
     */
    status: function(req, res) {
		
        var http = require('http');
        http.post = require('http-post');
        var status = req.param('status');
        var sa_params = new Object();
        switch (status) {
            case 10:
                sa_params.text = 'Заказ создан. Ожидает исполнения.';
                sa_params.for_taxometer = false;
                break;
            case 20:
                sa_params.text = 'Поиск в первом круге';
                sa_params.for_taxometer = false;
                break;
            case 30:
                sa_params.text = 'Поиск во втором круге';
                sa_params.for_taxometer = false;
                break;
            case 40:
                sa_params.text = 'Свободный заказ';
                sa_params.for_taxometer = false;
                break;
            case 50:
                sa_params.text = 'Водитель откликнулся ( экипаж назначен)';
                sa_params.for_taxometer = false;
                break;
            case 60:
                sa_params.text = 'Экипаж выехал на заказ (подача авто)';
                sa_params.for_taxometer = false;
                break;
            case 70:
                sa_params.text = 'Экипаж прибыл (посадка/загрузка)';
                sa_params.for_taxometer = false;
                break;
            case 80:
                sa_params.text = 'Заказ выполняется.';
                sa_params.for_taxometer = true;
                break;
            case 90:
                sa_params.text = 'Поездка окончена. Оплата';
                sa_params.for_taxometer = true;
                break;
            case 100:
                sa_params.text = 'Заказ успешно закрыт ( оплата произведена )';
                sa_params.for_taxometer = false;
                break;
            case 110:
                sa_params.text = 'Заказ отменен (исполнитель не найден/ авто не найдено)';
                sa_params.for_taxometer = false;
                break;
            case 120:
                sa_params.text = 'Заказ отменен (заказчиком)';
                sa_params.for_taxometer = false;
                break;
            case 130:
                sa_params.text = 'Заказ отменен (исполнителем)';
                sa_params.for_taxometer = false;
                break;
            case 140:
                sa_params.text = 'Заказ перехвачен диспетчером';
                sa_params.for_taxometer = false;
                break;
            default:
                sa_params.text = 'Чтото не так';
                sa_params.for_taxometer = false;
        }

        if (req.param('pay_type')) {
            if (req.param('pay_type') == 1) {
                sa_params.text = 'Заказ успешно закрыт. Оплата произведена наличными. ';
            }
            if (req.param('pay_type') == 3) {
                sa_params.text = 'Заказ успешно закрыт. Оплата произведена безналичным расчетом с вируального счета юр. лица ';
            }
        }

        var permitted = -1;
        var criteria = {id: req.param('id')};
        var status = req.param('status');
        if (req.customer) {
            criteria.customer = req.customer.id;
        } else if (req.driver) {
            criteria.driver = req.driver.id;
        }
        var params = {
            status: status
        };

        if (status == 40) {
// ищем заказ среди передеанных оператору и переданных оператором водителю на рассмотрение(140)
            Orders.findOne({
                id: req.param('id')
            }).exec(function(err, found_order) {

                if (found_order.status == 40 || found_order.status == 140)
                    Orders.update(criteria, {
                        status: status
                    }).exec(function(err, orders) {
                        if (err) {
                            return res.badRequest(err);
                        }
                        var order = orders[0];
                        var rooms = sails.sockets.rooms();
                        sails.sockets.emit(rooms, 'orders_' + order.id, {
                            id: order.id,
                            status: order.status,
                        });
                        return res.serialize(order, 'driver', 200);
                    });
                else
                    return res.serialize(found_order, 'driver', 200);

            });
        } 
		else
            Orders.update(criteria, {
                status: status
            }).exec(function(err, orders) {
                if (err) {
                    return res.badRequest(err);
                }
                var order = orders[0];
         
                if (status == 60) {
                    Customers.findOne({
                        id: order.customer
                    }).exec(function(err, target_customer) {
                        if (target_customer.os == "android" || target_customer.os == "ios") {
                            var token = target_customer.push_token;
                            var push_type = target_customer.os;
                            var title = 'Водитель приступил к выполнению заявки';
                            var push = require("./../services/pushCustomer.js");
                            push.sendMessage(push_type, token, title, 'body', function(err, result) {
                            });
                        }
                    });
					
					   Drivers.update({id: order.driver }, { status:2, active_order: order.id }).exec(function(err, driver) { });
                }


                if (status == 70) {
                    Customers.findOne({
                        id: order.customer
                    }).exec(function(err, target_customer) {
                        if (target_customer.os == "android" || target_customer.os == "ios") {
                            var token = target_customer.push_token;
                            var push_type = target_customer.os;
                            var title = 'Машина по Вашей заявке подана.';
                            var push = require("./../services/pushCustomer.js");


                            push.sendMessage(push_type, token, title, 'body', function(err, result) {

                            });
                        }


                        if (target_customer.phone.substring(1, 7) != '7(000)') {
                            Drivers.findOne({
                                id: order.driver
                            }).exec(function(err, target_driver) {
                           NotificationService.sendSms("CAR_ARRIVED", target_customer.phone.substring(1), {order_id: order.id,  reg_number: target_driver.reg_number, phone_num: target_driver.phone_num }, function(r) {});
						    NotificationService.sendCustomerEmail("CAR_ARRIVED",  {user_id:order.customer, order_id: order.id}, function(resp) {});
                            })
                        };
                    });
                }

                if (status == 100) {
                    Customers.findOne({
                        id: order.customer
                    }).exec(function(err, target_customer) {
                        if (target_customer.os == "android" || target_customer.os == "ios") {
                            var token = target_customer.push_token;
                            var push_type = target_customer.os;
                            var title = 'Ваша заявка успешно выполнена';
                            var push = require("./../services/pushCustomer.js");
                            push.sendMessage(push_type, token, title, 'body', function(err, result) {});
                        }
                    });
                }

				if (status == 120) {
                    Orders.findOne({
                        id: req.param('id')
                    }).exec(function(err, target_order) {

                        if (target_order.driver.phone.substring(1, 7) != '7(000)') {
                            http.post('http://smsc.ru/sys/send.php', {
                                login:'apptrucktaxi', psw:'paSSword1751700',
                                mes: 'К сожалению, заявка, которая выполняется в текущий момент, отменена.',
                                phones: target_order.driver.phone.substring(1),
                                charset: 'utf-8'
                            }, function(resp) {});
                        }
                    });


                }
                if (status == 130) {
                    Customers.findOne({
                        id: order.customer
                    }).exec(function(err, target_customer) {
                        if (target_customer.os == "android" || target_customer.os == "ios") {
                            var token = target_customer.push_token;
                            var push_type = target_customer.os;
                            var title = 'К сожалению, заявка, которая выполняется в текущий момент, отменена исполнителем';
                            var push = require("./../services/pushCustomer.js");
                            push.sendMessage(push_type, token, title, 'body', function(err, result) {


                            });
                        }

                        if (target_customer.phone.substring(1, 7) != '7(000)') {
                             NotificationService.sendSms("DRIVER_ORDER_CANCEL", target_customer.phone.substring(1), {
                                order_id: order.id
                            }, function(r) {});
                        }
							NotificationService.sendCustomerEmail("ORDER_CANCEL",  {user_id:order.customer, order_id: order.id}, function(resp) {});

                    });
                }
            

     			//ЛОГ//
                if (order.driver) {
                    sa_params.driver = order.driver;
                } else if (order.customer) {
                    sa_params.customer = order.customer;
                }
     			  if (req.param('pay_type') && order.source == "p2p") {
                    sa_params.text = 'Заказ успешно закрыт. Оплата произведена безналичным расчетом с вируального счета юр. лица';
                }
                sa_params.order = order;
                StatusActivities.create(sa_params).exec(function(err, created_SA) {});
                var rooms = sails.sockets.rooms();
				
				
				// Если выставлен счет 
                if (req.param('bill')) {
                    sails.sockets.emit(rooms, 'orders_' + order.id, {
                        id: order.id,
                        status: order.status,
                        bill: req.param('bill'),
                    });
                    var transaction_params = new Object();
                    if(order.driver){
                        transaction_params.driver = order.driver;
                    }
                    transaction_params.customer = order.customer;
                    transaction_params.order = order.id;
                    transaction_params.value = order.is_fixed_price ? order.fixed_price : (req.param('bill').inside_price + req.param('bill').outside_price);

                    let driver_transaction_params = new Object();
                    driver_transaction_params.driver = order.driver;
                    driver_transaction_params.order = order.id;
                    driver_transaction_params.payment_type = "Заказ №"+order.id;
                    if(order.is_fixed_price){
                        driver_transaction_params.value = order.fixed_price;
                        sa_params.text = 'Водитель выставил счет \n ЧЕК: \n ИТОГО К ОПЛАТЕ: ' + transaction_params.value;
                    }
                    else{
                        driver_transaction_params.value = req.param('bill').inside_price + req.param('bill').outside_price;
                        sa_params.text = 'Водитель выставил счет \n ЧЕК: \n Время в пределах города: ' + req.param('bill').inside_time + '\n Стоимость поездки по городу: ' + req.param('bill').inside_price + '\n Время за пределами города: ' + req.param('bill').outside_time + '\n Стоимость поездки за городом: ' + req.param('bill').outside_price + '\n ';
                        if(req.param('bill').loader_price){
                            driver_transaction_params.value += req.param('bill').loader_price;
                            sa_params.text += 'Оплата грузчикам: ' + req.param('bill').loader_price + '\n';
                        }
                        sa_params.text += 'ИТОГО К ОПЛАТЕ: ' + transaction_params.value;
                    }
                    sa_params.for_taxometer = true;
                    StatusActivities.create(sa_params).exec(function(err, created_SA) {});

                    DriverTransactions.create(driver_transaction_params).exec(function(err, created) {});

                    CustomerTransactions.create(transaction_params).exec(function(err, created) {

                        if (err) {
                            return res.badRequest(err);
                        }
                        Orders.update(criteria, {
                            inside_time: req.param('bill').inside_time,
                            outside_time: req.param('bill').outside_time,
                            inside_price: req.param('bill').inside_price,
                            outside_price: req.param('bill').outside_price
                        }).exec(function(err, orders_res) {

                            if (order.pay_type == 3 && order.source && order.source == "p2p") {
                                console.log("p2p service bill!");
                                CustomerTransactions.findOne({
                                    order: order.id
                                }).exec(function(err, customer_transaction) {
                                    if (err) {
                                        console.log("customerTransaction error", err);
                                    }
                                    Customers.findOne({
                                        id: order.customer
                                    }).exec(function(err, target_customer) {
                                        if (err) {
                                            console.log("customer error", err);
                                        }
                                        var final_bill = target_customer.bill - customer_transaction.value;


                                        if (target_customer.phone.substring(1, 7) != '7(000)') {
                                            NotificationService.sendSms("ORDER_CLOSED", target_customer.phone.substring(1), {
                                                order_id: order.id,
                                                summ: customer_transaction.value
                                            }, function(r) {});
                                        }
                                           NotificationService.sendCustomerEmail("ORDER_DONE_COMPANY",  {user_id:order.customer, order_id: order.id}, function(resp) {});
                                        Customers.update({
                                            id: order.customer
                                        }, {
                                            bill: final_bill
                                        }).exec(function(err, orders) {
                                            if (err) {
                                                console.log(err);
                                                return res.badRequest(err);
                                            }


                                            Services.findOne({
                                                id: order.service
                                            }).exec(function(err, service_donor) {

                                                var report_params = new Object();
                                                report_params.service = order.service;
                                                report_params.order = order.id;
                                                report_params.driver = order.driver;
                                                report_params.doc = 'type:3';
                                                report_params.summ = customer_transaction.value;
                                                report_params.comission = customer_transaction.value * service_donor.percent / 100;
                                                report_params.type = false;
                                                if (err) {
                                                    console.log('ERROR:' + err);
                                                    return res.badRequest(err);
                                                }
                                                // создание финансового отчета по заявке
                                                OrderReports.create(report_params).exec(function(err, created) {

                                                    if (err) {
                                                        console.log('ERROR:' + err);
                                                        return res.badRequest(err);
                                                    }
                                                    console.log('Order report ' + created.id + ' created');
                                                });
                                                var company_finance_report = new Object();
                                                company_finance_report.customer = order.customer;
                                                company_finance_report.value = (-1) * customer_transaction.value;
                                                company_finance_report.summ = final_bill;
                                                company_finance_report.dev_key_id = 777;
                                                company_finance_report.comment = "Оплата счета за перевозку № " + order.id;
                                                CompanyTransactions.create(company_finance_report).exec(function(err, transact) {

                                                    if (err) {
                                                        console.log('ERROR:' + err);
                                                        return res.badRequest(err);
                                                    }
                                                    console.log('Company transaction ' + transact.id + ' created');
                                                });
                                                var ballance = service_donor.saldo + (customer_transaction.value - customer_transaction.value * service_donor.percent / 100);
                                                Services.update({
                                                    id: order.service
                                                }, {
                                                    saldo: ballance
                                                }).exec(function(err, service_acceptor) {});

                                                Drivers.update({
                                                    id: order.driver
                                                }, {
                                                    status: 1
                                                }).exec(function(err, active_drivers) {});
                                                Orders.update({
                                                    id: order.id
                                                }, {
                                                    status: 100
                                                }).exec(function(err, upd_orders) {
                                                    if (err) {
                                                        return res.badRequest(err);
                                                    }
                                                });
                                                sails.sockets.emit(rooms, 'orders_' + order.id, {
                                                    id: order.id,
                                                    status: 100,
                                                });

                                            });


                                        });
                                    });
                                });

                            }


                        });
                        console.log('Transaction ' + created.id + ' created');
                    });



                } else
                if (req.param('pay_type')) {
                    sails.sockets.emit(rooms, 'orders_' + order.id, {
                        id: order.id,
                        status: order.status,
                        pay_type: req.param('pay_type'),
                    });

                    Orders.update({
                        id: order.id
                    }, {
                        paytype: req.param('pay_type')
                    }).exec(function(err, orders) {
                        if (err) {
                            return res.badRequest(err);
                        }
                    });


                    // Если оплата по счету ЮР ЛИЦА
                    if (req.param('pay_type') == 3 || order.source == "p2p") {
                        CustomerTransactions.findOne({
                            order: order.id
                        }).exec(function(err, customer_transaction) {
                            Customers.findOne({
                                id: order.customer
                            }).exec(function(err, target_customer) {
                                var final_bill = target_customer.bill - customer_transaction.value;
                                Customers.update({
                                    id: order.customer
                                }, {
                                    bill: final_bill
                                }).exec(function(err, orders) {
                                    if (err) {
                                        return res.badRequest(err);
                                    }
                                        if (target_customer.phone.substring(1, 7) != '7(000)') {
                                            NotificationService.sendSms("ORDER_CLOSED", target_customer.phone.substring(1), {
                                                order_id: order.id,
                                                summ: customer_transaction.value
                                            }, function(r) {});
                                        }
  NotificationService.sendCustomerEmail("ORDER_DONE_COMPANY",  {user_id:order.customer, order_id: order.id}, function(resp) {});
                                    Services.findOne({
                                        id: order.service
                                    }).exec(function(err, service_donor) {

                                        var report_params = new Object();
                                        report_params.service = order.service;
                                        report_params.order = order.id;
                                        report_params.driver = order.driver;
                                        report_params.doc = 'type:3';
                                        report_params.summ = customer_transaction.value;
                                        report_params.comission = customer_transaction.value * service_donor.percent / 100;
                                        report_params.type = false;
                                        if (err) {
                                            console.log('ERROR:' + err);
                                            return res.badRequest(err);
                                        }
                                        // создание финансового отчета по заявке
                                        OrderReports.create(report_params).exec(function(err, created) {

                                            if (err) {
                                                console.log('ERROR:' + err);
                                                return res.badRequest(err);
                                            }
                                            console.log('Order report ' + created.id + ' created');
                                        });
                                        var company_finance_report = new Object();
                                        company_finance_report.customer = order.customer;
                                        company_finance_report.value = (-1) * customer_transaction.value;
                                        company_finance_report.summ = final_bill;
                                        company_finance_report.dev_key_id = 777;
                                        company_finance_report.comment = "Оплата счета за перевозку № " + order.id;
                                        CompanyTransactions.create(company_finance_report).exec(function(err, transact) {

                                            if (err) {
                                                console.log('ERROR:' + err);
                                                return res.badRequest(err);
                                            }
                                            console.log('Company transaction ' + transact.id + ' created');
                                        });
                                        var ballance = service_donor.saldo + (customer_transaction.value - customer_transaction.value * service_donor.percent / 100);
                                        Services.update({
                                            id: order.service
                                        }, {
                                            saldo: ballance
                                        }).exec(function(err, service_acceptor) {
                                        });
                                    });
                                });
                            });
                        });



                        Orders.update({
                            id: order.id
                        }, {
                            paytype: 3
                        }).exec(function(err, orders) {
                            if (err) {
                                return res.badRequest(err);
                            }
                        });




                    } // Если оплата НАЛИЧНЫМИ
                    else if (req.param('pay_type') == 1) {
                        console.log("nal");
                        Services.findOne({
                            id: order.service
                        }).exec(function(err, service_donor) {
                            CustomerTransactions.findOne({
                                order: order.id
                            }).exec(function(err, customer_transaction) {
                                var report_params = new Object();
                                report_params.service = order.service;
                                report_params.order = order.id;
                                report_params.driver = order.driver;
                                report_params.doc = 'type:1';
                                report_params.summ = customer_transaction.value;
                                report_params.comission = customer_transaction.value * service_donor.percent / 100;
                                console.log("commission", report_params.comission);
                                report_params.type = false;
                                if (err) {
                                    console.log('ERROR:' + err);
                                    return res.badRequest(err);
                                }
                                // создание финансового отчета по заявке
                                OrderReports.create(report_params).exec(function(err, created) {

                                    if (err) {
                                        console.log('ERROR:' + err);
                                        return res.badRequest(err);
                                    }
                                    console.log('Order report ' + created.id + ' created');
                                });
                                console.log("saldo_donor", service_donor.saldo);
                                var ballance = service_donor.saldo - customer_transaction.value * service_donor.percent / 100;
                                console.log("ballance", ballance);

                                let ind_driver_transaction_params = new Object();
                                ind_driver_transaction_params.driver = order.driver;
                                ind_driver_transaction_params.order = order.id;
                                ind_driver_transaction_params.type = 'order';
                                ind_driver_transaction_params.payment_type = "Заказ №"+order.id;
                                ind_driver_transaction_params.value = 0 - customer_transaction.value * service_donor.percent / 100;
                                IndividualDriverTransactions.create(ind_driver_transaction_params).exec(function(err, created) {});
                                
                                Services.update({
                                    id: order.service
                                }, {
                                    saldo: ballance
                                }).exec(function(err, service_acceptor) {
                                    if (err)
                                        console.log("err", err);
                                    console.log('remove service saldo part');
                                    if (service_acceptor[0].saldo < 0 && ((-1) * service_acceptor[0].saldo) > service_acceptor[0].credit) {
                                        Drivers.find({
                                            service: service_acceptor[0].id
                                        }).exec(function(err, socket_drivers) {

                                            console.log('mass banning by service');
                                            var drv_rooms = sails.sockets.rooms();
                                            for (i = 0; i < socket_drivers.length; i++)
                                                sails.sockets.emit(drv_rooms, 'driver_' + socket_drivers[i].id, {
                                                    id: socket_drivers[i].id,
                                                    action: "BANNED"
                                                });


                                        });


                                    }




                                });



                            });

                        });


                    }

                } else {

                    sails.sockets.emit(rooms, 'orders_' + order.id, {
                        id: order.id,
                        status: order.status,
                    });
                }
                console.log('update index of order #' + order.id);
                if (order.status == 100) {
                    Drivers.update({
                        id: order.driver
                    }, {
                        status: 1
                    }).exec(function(err, active_drivers) {});
                }
                return res.serialize(order, 'driver', 200);

            });




    },


    /**
     * @api {put} /orders/:id/assignto/:did Назначение заказа
     * @apiGroup Orders
     * @apiParam {Integer} id ID заказа
     * @apiParam {Integer} did ID водителя
     * @apiVersion 0.1.0
     * @apiDescription Назначить заказ водителю (для диспетчера)
     */
    assignTo: function(req, res) {

        Orders.findOne({
            id: req.param('id'),
            status: 140
        }).populate('customer').exec(function(err, order) {
			if (err) {
                return res.badRequest();
            }
			
 OrdersPhoto.find({
                        request: order.id
                    })

                    .exec(function(err, ordersphotos) {
                        if (err) {
                            return res.badRequest(err);
                        }

                        order.photos = ordersphotos;
            

            ///////////////PUSH рассылка ////////////////////////////////////////////////////
            Drivers.find({
                id: req.param('did')
            }).exec(function(err, drv_tmp_num) {
                if (drv_tmp_num.length > 0) {

                    var push = require("./../services/pushDriver.js");
                    var target_driver = drv_tmp_num[0];

                    if (target_driver.os == "android" || target_driver.os == "ios") {
                        var token = target_driver.push_token;
                        var push_type = target_driver.os;
                        var title = 'Диспетчер назначил Вам новый заказ';
                        push.sendMessage(push_type, token, title, 'body', function(err, tmp_result) {

                        });
                    }


                }

            });
            //////////////////////////////////////////////////////////////////////////////
            var now_time = new Date();



            RegionSettings.findOne({
                region: 3
            }, function(err, settings) {

                var close_time = new Date(order.operator_got_time.getTime() + settings.free_time_for_order * 60000);

                var time_to_decide_for_driver = new Date(now_time.getTime() + settings.driver_decite_time_for_order * 60000);
                if (close_time < time_to_decide_for_driver)
                    time_to_decide_for_driver = close_time;

                var timeDiff = Math.abs(time_to_decide_for_driver.getTime() - now_time.getTime());
                var secondsDiff = Math.ceil(timeDiff / 1000);
                var rooms = sails.sockets.rooms();
				
				var order_json=order.toJSON();
				 order_json.photos = ordersphotos;
				console.log(order_json);
                sails.sockets.emit(rooms, 'driver_' + req.param('did'), {
                    type: "orders",
                    data: order_json,
                    seconds_to_stop: secondsDiff
                });
                console.log('seconds to stop ' + secondsDiff + ' and final time ' + close_time);



                setTimeout(function() {

                    Orders.update({
                        id: req.param('id'),
                        status: 140
                    }, {
                        status: 40,
                        service_id: null
                    }).exec(function(err, orders) {

                        if (err) {
                            res.badRequest(err);
                        }

                        var order = orders[0];

                        console.log(orders);

                        if (order == undefined) {
                            console.log({
                                msg: "Order has taken",
                                code: 404
                            });
                            return {
                                msg: "Order has taken",
                                code: 404
                            };
                        }

                        console.log('Manager lost order, order is free ' + order.id);




                    });

                }, secondsDiff * 1000);
            });


            return res.ok({
                msg: 'ORDER_ASSIGNED',
                code: 200
            });
		}); });
    },

    /**
     * @api {get} /orders/:id/close Закрыть заказ
     * @apiGroup Orders
     * @apiHeader {String} auth_token Ключ авторизации
     * @apiParam {Integer} time_inside Время в черте города (в секундах)
     * @apiParam {Integer} time_outside Время за городом (в секундах)
     * @apiParam {Integer} price_inside К оплате по городу
     * @apiParam {Integer} price_outside К оплате за городом
     * @apiParam {Integer} general_time Общее время
     * @apiParam {Integer} general_price Всего к оплате
     * @apiParam {Integer} tariff ID тарифа
     * @apiVersion 0.1.0
     * @apiDescription Закрыть заказ (для водителя)
     * Переподит заказ из статуса 90 (поездка окончена. Оплата ) в 100 (заказ закрыт, оплата произведена )
     */
    close: function(req, res) {

        async.waterfall([
            function(callback) {

                Orders.update({
                    id: req.param('id'),
                    status: 90,
                    driver: req.driver.id
                }, {
                    status: 100
                }).exec(function(err, orders) {

                    if (err) {
                        return callback(err);
                    }

                    var order = orders[0];


                    console.log('update index of order #' + order.id + ' (closing)');
                    if (err) {
                        console.log(err);
                        return err;
                    }

                    callback(null, order);

                });
            },
            function(order, callback) {

                Drivers.update({
                    id: req.driver.id
                }, {
                    active_order: null,
                    status: 1
                }).exec(function(err, driver) {

                    if (err) {
                        return callback(err);
                    }

                    callback(null, order);
                });
            },
            function(order, callback) {

                Drivers.update({
                    id: req.driver.id
                }, {
                    active_order: null,
                    status: 1
                }).exec(function(err, driver) {

                    if (err) {
                        return callback(err);
                    }

                    callback(null, order);
                });
            }
        ], function(err, result) {

            if (err) {
                return res.badRequest(err);
            }

            var bill = {
                time_inside: req.param('time_inside'),
                time_outside: req.param('time_outside'),
                price_inside: req.param('price_inside'),
                price_outside: req.param('price_outside'),
                general_time: req.param('general_time'),
                general_price: req.param('general_price'),
                tariff: req.param('tariff')
            }

            var rooms = sails.sockets.rooms();
            sails.sockets.emit(rooms, 'orders_' + result.id, {
                id: result.id,
                status: result.status,
                bill: bill
            });

            Customers.findOne({
                id: result.customer
            }).exec(function(err, target_customer) {
                if (target_customer.phone.substring(1, 7) != '7(000)') {
                    NotificationService.sendSms("ORDER_CLOSED", target_customer.phone.substring(1), {
                        order_id: result.id,
                        summ: tariff
                    }, function(r) {});
                }
				  NotificationService.sendCustomerEmail("ORDER_DONE_COMPANY",  {user_id:result.customer, order_id: result.id}, function(resp) {});
            });

            return res.serialize(result, 'driver', 200);
        });
    },
    crossCityLine: function(req, res) {
        var sa_params = new Object();
	console.log(req.param)
        sa_params.for_taxometer = true;

        if (req.param('toCity') == false) {
            sa_params.text = 'Пересечена граница города. Активирован тарифф "За городом"';
        } else if (req.param('toCity') == true) {
            sa_params.text = 'Пересечена граница города. Активирован тарифф "По городу"';
        }
        console.log("river closed order ", req.param('order'));
        Orders.findOne({
            id: req.param('order')
        }).exec(function(err, order) {
            if (err)
                console.log(err);
            sa_params.order = order;
            sa_params.driver = order.driver;


            StatusActivities.create(sa_params).exec(function(err, created_SA) {});
        });


        return res.ok({
            msg: 'LOG ADDED',
            code: 200
        });




    },
    rate: function(req, res) {


        Drivers.findOne({
            id: req.param('driver')
        }).exec(function(err, driver) {

            var rate = driver.ratingup + req.param('rate');
            var count = driver.ratingdown + 1;

            Drivers.update({
                id: req.param('driver')
            }, {
                ratingup: rate,
                ratingdown: count
            }).exec(function(err, edit_driver) {
                return res.ok({
                    msg: 'RATED',
                    code: 200
                });
            });
        });

    },
    addReport: function(req, res) {
        var report_params = new Object();
        report_params.text = req.param('text');
		

        if (req.param('targetOrder')) {
            Orders.findOne({
                id: req.param('targetOrder')
            }).exec(function(err, order) {
                report_params.order = req.param('targetOrder');
            });
        }
        if (req.param('targetDriver')) {
            Drivers.findOne({
                id: req.param('targetDriver')
            }).exec(function(err, driver) {
                report_params.driver = driver;
            });
        }
        if (req.param('targetCustomer')) {
            Customers.findOne({
                id: req.param('targetCustomer')
            }).exec(function(err, customer) {
                report_params.customer = customer;
            });
        }
        setTimeout(function() {
            UserReport.create(report_params).exec(function(err, created) {
			var body = {};
			var notification_alert;
			body.text = req.param('text');
			body.email = "info@movamba.com";
			 body.target_id ="не указан";
			
		if (req.param('targetOrder')) {
           body.target_id =req.param('targetOrder');
		   notification_alert="ORDER_REPORT";
        }
	    else if (req.param('targetDriver')) {
           body.target_id =req.param('targetDriver');
		   notification_alert="DRIVER_REPORT";
        }
		else if (req.param('targetCustomer')) {
           body.target_id =req.param('targetCustomer');
		   notification_alert="CUSTOMER_REPORT";
        }
		else
			{
            notification_alert="NOT_TARGETED_REPORT";
        }
             /*   var http = require('http');
                http.post = require('http-post');
                
                body.text = req.param('text');
                http.post('http://admin.movamba.com/web/sendReportToTD', body, function(resp) {

                });
*/
NotificationService.sendTechEmail(notification_alert,  body, function(resp) {});

					return res.ok({
						msg: 'LOG ADDED',
						code: 200,
						err: err
					});
				
            });
        }, 500);




    },
    sendPush: function(req, res) {

        var title = 'Прием!';

        var token = 'APA91bH9zExT1B6oyDWHnFlkHn-KpFqhoLpgUNogt1n42jrNKqwaZIWWI6nAfOmIPgZwjZbqXl8xYFF9TKX85yPxxKSA3kpFET0BIrDJ410Wr9UQrtqU8NBhmifilQthwYdZ3Ljpu8lH';

        var push = require("./../services/pushCustomer.js");
        push.sendMessage('android', token, title, 'body', function(err, result) {

            if (err) {
                return res.ok({
                    msg: 'ERROR',
                    code: 200,
                    err: err
                });
            } else {
                return res.ok({
                    msg: 'OK',
                    code: 200,
                    result: result
                });
            }


        });




    },


    payWithCard: async function(req, res) {
        
        
        const axios = require('axios');
        var http = require('http');
        http.post = require('http-post');
        const md5 = require('md5');         
        const randomstring = require("randomstring");
    
        let order_id = req.param('order_id'),
        card_id = req.param('card_id');

       
        let found_order = await Orders.findOne({
            id: order_id
        });
        console.log("found_order", found_order)
        if(!found_order)
        return res.serialize({ error: "NO_SUCH_PAYMENT", message:''}, 'driver', 200);
        
        if(found_order.status !== 90)
            return res.serialize({ error: "WRONG_STATUS", message:''}, 'driver', 200);

        let found_card = await Cards.findOne({id: card_id, customer: req.customer.id});
        if(!found_card)
                return res.serialize({ error: "NO_SUCH_CARD", message:''}, 'driver', 200);

        const Order_IDP = 'order_'+found_order.id+'_'+randomstring.generate(),
            Shop_IDP = '00028513',
            Subtotal_P = parseFloat(found_order.inside_price + found_order.outside_price).toFixed(2),
            Parent_Order_IDP = found_card.transaction,
            password = 'efepspUXil08RnMpdT1MHPr7danSmT9jTKKKb7451ExtTRMcHxLGcbi5MHaW8BiqbV4EJ9k2VdNCsgfD',
            CallbackFields = 'AcquirerID Card_IDP CardNumber Customer_IDP Total';
            let Signature = md5(Shop_IDP) + 
                '&' + md5(Order_IDP) +
                '&' + md5(Subtotal_P) + 
                '&' + md5(Parent_Order_IDP) + 
                '&' + md5(password);
                console.log("sig 1 ",Signature )
                Signature = md5(Signature)
                console.log("sig 2 ",Signature )
                Signature = Signature.toUpperCase();
                console.log("sig 3 ",Signature )
                
                const data = 	{
                    Shop_IDP,
                    Order_IDP,
                    Subtotal_P,
                    Parent_Order_IDP,
                    CallbackFields,
                    URL_RETURN: 'https://google.com',
                    Signature
                }
                const body = new URLSearchParams(data);
            
                const response = await axios.post(
                    'https://wpay.uniteller.ru/recurrent/',
                    body
                );

                console.log("response DATA", response.data)
               // if(response.data && response.data.Success){
                if(true){
                    return res.serialize({status: "OK", error: null, message: ''},'customer',200);
                }
                else
                    return res.serialize({status: "ERROR", error: 'TRANSACTION_ERROR', message: ''},'customer',200);

    },



    testFly: function(req, res) {

        Orders.findOne({
            id: parseInt(req.param('order_id'))
        }).exec(function(err, order) {
            var params = new Object();
            params.order = order;
            params.text = 'Оплата по безналичному расчету произведена на сумму ' + req.param('total') + 'р. за заказ номер ' + req.param('order_id') + '. Номер транзакции: ' + req.param('transaction_id') + '.  Заявка успешно закрыта.';
            params.for_taxometer = false;
            CustomerTransactions.findOne({
                order: order.id
            }).exec(function(err, customer_transaction) {

                //var product_id = '007577-0001-0001';
                //var sharedsec = 't6z0scT17Js8rgz3';
		var product_id = '008538-0001-0001';
                var sharedsec = 'DSt1A6ZQ5ZyE3wUk';

                var product_price = customer_transaction.value;
                var data = product_id + '-' + product_price + '-' + sharedsec;
console.log("testfly data", data)
                var crypto = require('crypto');

                var key = crypto.createHash('md5').update(data).digest("hex");
                // if(key==req.param('sign')){
                if (true) {
                    Orders.update({
                        id: parseInt(req.param('order_id'))
                    }, {
                        status: 100,
                        paytype: 2
                    }).exec(function(err, orders) {

                        if (err) {
                            res.badRequest(err);
                        }


                        Drivers.update({
                            id: order.driver
                        }, {
                            active_order: null,
                            status: 1
                        }).exec(function(err, driver) {

                            if (err) {
                                return callback(err);
                            }


                        });


                        var rooms = sails.sockets.rooms();


                        sails.sockets.emit(rooms, 'orders_' + order.id, {
                            id: order.id,
                            status: 100,
                            pay_type: 2,
                        });


                        Customers.findOne({
                            id: order.customer
                        }).exec(function(err, target_customer) {
                            if (target_customer.os == "android" || target_customer.os == "ios") {
                                var token = target_customer.push_token;
                                var push_type = target_customer.os;
                                var title = 'Ваша заявка успешно выполнена';
                                var push = require("./../services/pushCustomer.js");
                                push.sendMessage(push_type, token, title, 'body', function(err, result) {});
                            }
                        });

                        Customers.update({
                            id: order.customer
                        }, {
                            init_transaction: req.param('transaction_id'),
                            creditcardnumber: req.param('creditcardnumber')
                        }).exec(function(err, target_customer) {});


                        Services.findOne({
                            id: order.service
                        }).exec(function(err, service_donor) {
                            var report_params = new Object();
                            report_params.service = order.service;
                            report_params.order = order.id;
                            report_params.driver = order.driver;
                            report_params.doc = 'type:2';
                            report_params.summ = customer_transaction.value;
                            report_params.comission = customer_transaction.value * service_donor.percent / 100;
                            report_params.type = false;
                            if (err) {
                                console.log('ERROR:' + err);
                                return res.badRequest(err);
                            }
                            // создание финансового отчета по заявке
                            OrderReports.create(report_params).exec(function(err, created) {

                                if (err) {
                                    console.log('ERROR:' + err);
                                    return res.badRequest(err);
                                }
                                console.log('Order report ' + created.id + ' created');
                            });


                            var ballance = service_donor.saldo + (customer_transaction.value - customer_transaction.value * service_donor.percent / 100);
                            Services.update({
                                id: order.service
                            }, {
                                saldo: ballance
                            }).exec(function(err, service_acceptor) {

                            });

                        });




                        StatusActivities.create(params).exec(function(err, created_SA) {

                            return res.ok({
                                msg: 'PAY DONE!',
                                code: 200,
                                err: err
                            });

                        });

                    });

                } else {

                    res.badRequest({
                        err: 'sign error'
                    });

                };


            });


        });
    }


};