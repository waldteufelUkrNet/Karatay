var express = require('express');
var router = express.Router();
var root_api = require('./root');
var executors_api = require('./executors');
var specialities_api = require('./specialities');
var orders_api = require('./orders');

router.use('/', root_api);
router.use('/executor', executors_api);
router.use('/specialities', specialities_api);
router.use('/orders', orders_api);

module.exports = router;
