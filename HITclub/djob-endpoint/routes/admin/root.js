var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.post('/signin', async function (req, res) {
    if(!req.body  || !req.body.email || !req.body.password) {
        return res.status(400).json({ status:"ERROR", message: 'MISSING_INPUT_PARAMETERS' });
    }

    publisher.sendTask( 'admin_login', req, res,
        {
            email: req.body.email,
            password: req.body.password
        });

});

router.get('/counters', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_counters', req, res, {});

});

module.exports = router;
