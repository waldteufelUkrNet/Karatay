var express = require('express');
var router = express.Router();
var v1 = require('./v1/index');
var cluster = require('cluster');
var publisher = require('../../libs/publisher');




if(cluster.isMaster)
  setInterval(async function(){
  publisher.sendTask( 'order_timeout_check', {input_user:{user:{}}}, {}, {});
  publisher.sendTask( 'soon_order_check', {input_user:{user:{}}}, {}, {});
  console.log("TEST INDEX LOG")
}, 5*60000);





router.use('/v1', v1);

module.exports = router;
