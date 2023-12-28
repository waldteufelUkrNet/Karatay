var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.get('/return', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'cron_send_push', req, res, req.query);
});

module.exports = router;
