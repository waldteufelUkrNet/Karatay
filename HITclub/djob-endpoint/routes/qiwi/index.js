var express = require('express');
var router = express.Router();
let callback = require('./callback');
let test = require('./test');

router.use('/callback', callback);
router.use('/test', test);

module.exports = router;
