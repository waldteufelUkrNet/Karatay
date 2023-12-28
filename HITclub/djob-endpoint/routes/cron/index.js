var express = require('express');
var router = express.Router();
var push_api = require('./push');

router.use('/push', push_api);

module.exports = router;
