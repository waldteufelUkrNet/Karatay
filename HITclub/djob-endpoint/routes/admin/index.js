var express = require('express');
var router = express.Router();
var root_api = require('./root');
var customers_api = require('./customers');
var executors_api = require('./executors');
var specialites_api = require('./specialites');
var promo_api = require('./promo');
var order_api = require('./order');
var disputes_api = require('./disputes');
var configs_api = require('./configs');
var push_api = require('./push');
var entities_api = require('./entities');
var support_api = require('./support');
var reports_api = require('./reports');

router.use('/', root_api);
router.use('/customer', customers_api);
router.use('/executor', executors_api);
router.use('/specialites', specialites_api);
router.use('/promo', promo_api);
router.use('/order', order_api);
router.use('/disputes', disputes_api);
router.use('/configs', configs_api);
router.use('/push', push_api);
router.use('/entities', entities_api);
router.use('/support', support_api);
router.use('/reports', reports_api);

module.exports = router;
