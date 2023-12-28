/**
 * SettingsController
 *
 * @description :: Server-side logic for managing Settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

// const Services = require("../models/Services.js");


module.exports = {

    test: function(req, res) {
        console.log("UNITSELLER req.body ", req.body)
             return res.ok({
                 code: 0
             });
     },

    notification: async function(req, res) {
        try{
            console.log("UNITSELLER req.body ", req.body)
            let body = req.body;

            if(body.Status === 'authorized'){
                if(body.Order_ID.indexOf('ncard_')===0){
                    //adding card
                    let customer_id = body.Order_ID.replace('ncard_','');
                    customer_id = parseInt(customer_id.substr(0, customer_id.indexOf('_')));
                    console.log("customer_id ",customer_id)
                    let target_customer = await Customers.findOne({
                        id: customer_id
                    })
                        if(target_customer){
                            await Cards.create({
                                cardnumber: body.CardNumber, 
                                transaction: body.Order_ID, 
                                customer: customer_id
                            })
    
                                console.log('card created')
                                return res.ok({
                                    code: 0
                                }); 
                        }
                        else{    
                            return res.ok({
                                code: 500
                            });
                        }     
                }
                else
                if(body.Order_ID.indexOf('order_')===0){

                    let order_id = body.Order_ID.replace('order_','');
                    order_id = parseInt(order_id.substr(0, order_id.indexOf('_')));
                    console.log("order_id ",order_id)

                    let  order = await Orders.findOne({
                        id: order_id
                    })
                    if(!order ||  order.status !== 90)
                            return res.ok({
                                code: 500
                            });


                    let customer_id = order.customer;
                    console.log(customer_id)
                    let target_customer = await Customers.findOne({
                        id: customer_id
                    })
                    if(!target_customer)
                        return res.ok({
                            code: 500
                        });
                    

                    let params = new Object();
                    params.order = order;
                    params.text = 'Оплата по безналичному расчету произведена на сумму ' + body.Total + 'р. за заказ номер ' + order_id + '. Номер транзакции: ' + body.Order_ID + '.  Заявка успешно закрыта.';
                    params.for_taxometer = false;
                    let customer_transaction = await CustomerTransactions.findOne({
                        order: order.id
                    })

                    await Orders.update({
                        id: order.id
                    }, {
                        status: 100,
                        paytype: 2
                    })

                    await Drivers.update({
                        id: order.driver
                    }, {
                        active_order: null,
                        status: 1
                    });

                    let rooms = sails.sockets.rooms();
                    sails.sockets.emit(rooms, 'orders_' + order.id, {
                        id: order.id,
                        status: 100,
                        pay_type: 2,
                    });
                            
                    if (target_customer.os == "android" || target_customer.os == "ios") {
                        const token = target_customer.push_token;
                        const push_type = target_customer.os;
                        const title = 'Ваша заявка успешно выполнена';
                        const push = require("./../services/pushCustomer.js");
                        push.sendMessage(push_type, token, title, 'body', function(err, result) {});
                    }
                                    
                    let service_donor = await Services.findOne({
                        id: order.service
                    });
                    var report_params = new Object();
                    report_params.service = order.service;
                    report_params.order = order.id;
                    report_params.driver = order.driver;
                    report_params.doc = 'type:2';
                    report_params.summ = customer_transaction.value;
                    report_params.comission = customer_transaction.value * service_donor.percent / 100;
                    report_params.type = false;

                    await OrderReports.create(report_params);
                
                    let ballance = service_donor.saldo + (customer_transaction.value - customer_transaction.value * service_donor.percent / 100);
                    await Services.update({id: order.service}, {saldo: ballance})
                    await StatusActivities.create(params)

                    let ind_driver_transaction_params = new Object();
                    ind_driver_transaction_params.driver = order.driver;
                    ind_driver_transaction_params.order = order.id;
                    ind_driver_transaction_params.type = 'order';
                    ind_driver_transaction_params.payment_type = "Заказ №"+order.id;
                    ind_driver_transaction_params.value = customer_transaction.value - customer_transaction.value * service_donor.percent / 100;
                    await IndividualDriverTransactions.create(ind_driver_transaction_params);

                    return res.ok({
                        code: 0
                    });
                }
                else
                if(body.Order_ID.indexOf('drbal_')===0){

                    let driver_id = body.Order_ID.replace('drbal_','');
                    driver_id = parseInt(driver_id.substr(0, driver_id.indexOf('_')));
                    console.log('driver id ',driver_id)
                    let target_driver = await Drivers.findOne({
                        id: driver_id
                    })
                    console.log("target_driver id ", target_driver.id)
                    
                    console.log("target_driver.service  ", target_driver.service)
                    let service = await Services.findOne({
                        id: target_driver.service
                    })
                    console.log("service id ", service.id)
                    let summ = parseFloat(body.Total);
                    if(!target_driver || !summ || !service)
                        return res.ok({
                            code: 500
                        });
                   
                    await  Services.update({
                        id: service.id
                    }, {
                        saldo: service.saldo + parseInt(summ)
                    })
    
                    await IndividualDriverTransactions.create({
                        driver: target_driver,
                        order: null,
                        type: "card",
                        payment_type: "Карта",
                        value: parseInt(summ)
                    });
    
                    return res.ok({
                        code: 0
                    });
                }
            }
            
            return res.ok({
                code: 0
            });
        }
        catch(e){
            console.log('uniteller notification error ',e)
            return;
        }
        
     },

    backendSuccess: async function(req, res) {
       console.log("SUCCESS req.body ", req.body)
       let body = req.body;

       try{
            let additional_data = JSON.parse(body.Data);
            if(additional_data.payment_type === 'add_card' ){
                //var ret = "data-123".replace('data-','');
                let customer_id = parseInt(body.AccountId.replace('customer_',''));
                let target_customer = await Customers.findOne({
                    id: customer_id
                })
                    if(target_customer){
                        await Cards.create({cardnumber: body.CardFirstSix+'XXXXXX'+body.CardLastFour, transaction: body.Token, customer: customer_id})

                            console.log('card created')
                            return res.ok({
                                code: 0
                            }); 
                    }
                    else{
                        console.log(err)

                        return res.ok({
                            code: 500
                        });
                    }     
            }
            else
            if(additional_data.payment_type === 'add_driver_balance'){
                let driver_id = parseInt(body.AccountId.replace('driver_',''));
                let target_driver = await Drivers.findOne({
                    id: driver_id
                })
                let service = await Services.findOne({
                    id: target_driver.service_id
                })
                let summ = parseInt(additional_data.summ);
                if(!target_driver || !summ || !service)
                    return res.ok({
                        code: 500
                    });
               
                await  Services.update({
                    id: service.id
                }, {
                    saldo: service.saldo + summ
                })

                await DriverTransactions.create({
                    driver: target_driver,
                    order: null,
                    payment_type: "Карта",
                    value: summ
                });

                return res.ok({
                    code: 0
                });
            }
            else 
            if(additional_data.payment_type === 'order_charge' && additional_data.order_id){
                //var ret = "data-123".replace('data-','');
                let customer_id = parseInt(body.AccountId.replace('customer_',''));
                let target_customer = await Customers.findOne({
                    id: customer_id
                })
                if(!target_customer)
                        return res.ok({
                            code: 500
                });
                let  order = await Orders.findOne({
                    id: parseInt(additional_data.order_id)
                })
                if(!order ||  order.status !== 90)
                        return res.ok({
                            code: 500
                        });


                        var params = new Object();
                        params.order = order;
                        params.text = 'Оплата по безналичному расчету произведена на сумму ' + req.param('total') + 'р. за заказ номер ' + req.param('order_id') + '. Номер транзакции: ' + req.param('transaction_id') + '.  Заявка успешно закрыта.';
                        params.for_taxometer = false;
                        let customer_transaction = await CustomerTransactions.findOne({
                            order: order.id
                        })

                        await Orders.update({
                            id: order.id
                        }, {
                            status: 100,
                            paytype: 2
                        })

                        await Drivers.update({
                            id: order.driver
                        }, {
                            active_order: null,
                            status: 1
                        });

                        var rooms = sails.sockets.rooms();
                        sails.sockets.emit(rooms, 'orders_' + order.id, {
                            id: order.id,
                            status: 100,
                            pay_type: 2,
                        });
                        
                if (target_customer.os == "android" || target_customer.os == "ios") {
                    var token = target_customer.push_token;
                    var push_type = target_customer.os;
                    var title = 'Ваша заявка успешно выполнена';
                    var push = require("./../services/pushCustomer.js");
                    push.sendMessage(push_type, token, title, 'body', function(err, result) {});
                }
                                 
                let service_donor = await Services.findOne({
                    id: order.service
                });
                var report_params = new Object();
                report_params.service = order.service;
                report_params.order = order.id;
                report_params.driver = order.driver;
                report_params.doc = 'type:2';
                report_params.summ = customer_transaction.value;
                report_params.comission = customer_transaction.value * service_donor.percent / 100;
                report_params.type = false;

                await OrderReports.create(report_params);
            
                let ballance = service_donor.saldo + (customer_transaction.value - customer_transaction.value * service_donor.percent / 100);
                await Services.update({id: order.service}, {saldo: ballance})
                await StatusActivities.create(params)

                return res.ok({
                    code: 0
                });
                   
            }
        }catch(e){
            console.log(e)
            return res.ok({
                code: 500
            });
        }
    },
    backendCheck: async function(req, res) {
        console.log("CHECK req.body ", req.body)
        let body = req.body;
        try{
            let additional_data = JSON.parse(body.Data);
            if(additional_data.payment_type === 'add_card' ){
                //var ret = "data-123".replace('data-','');
                let customer_id = parseInt(body.AccountId.replace('customer_',''));
                let target_customer = await Customers.findOne({
                    id: customer_id
                })
                    if(target_customer)
                        return res.ok({
                            code: 0
                        });
                    else
                        return res.ok({
                            code: 500
                        });
               
            } 
            else
            if(additional_data.payment_type === 'add_driver_balance'){
                let driver_id = parseInt(body.AccountId.replace('driver_',''));
                let target_driver = await Drivers.findOne({
                    id: driver_id
                })
                if(!target_driver)
                    return res.ok({
                        code: 500
                    });

                return res.ok({
                    code: 0
                });
            }
            else 
            if(additional_data.payment_type === 'order_charge' && additional_data.order_id){
                //var ret = "data-123".replace('data-','');
                let customer_id = parseInt(body.AccountId.replace('customer_',''));
                let target_customer = await Customers.findOne({
                    id: customer_id
                })
                if(!target_customer)
                        return res.ok({
                            code: 500
                });
                let target_order = await Orders.findOne({
                    id: parseInt(additional_data.order_id)
                })
                if(!target_order || target_order.status !== 90)
                        return res.ok({
                            code: 500
                        });

                return res.ok({
                    code: 0
                });
                   
            }
        }catch(e){
            return res.ok({
                code: 500
            });
        }
             
     },
    backendFail: function(req, res) {
        console.log("FAIL req.body ", req.body)
             return res.ok({
                 code: 0
             });
     },
    backendConfirm: function(req, res) {
        console.log("CONFIRM req.body ", req.body)
             return res.ok({
                 code: 0
             });
     }
};

