var express = require('express');
var router = express.Router();
var customer_api = require('./customer');
var executor_api = require('./executor');
var file_api = require('./file');
var global_api = require('./global');
var specialties_api = require('./specialties');
var order_api = require('./order');
var order_for_later_api = require('./order_for_later');

router.use('/customer', customer_api);
router.use('/executor', executor_api);
router.use('/specialty', specialties_api);
router.use('/order', order_api);
router.use('/order', order_for_later_api);
router.use('/global', global_api);
router.use('/', file_api);

module.exports = router;
