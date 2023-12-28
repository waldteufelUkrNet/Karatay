var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.get('/', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_push_list', req, res, req.query);
});

router.get('/count', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_push_count', req, res, req.query);
});

router.post('/', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_send_push', req, res, req.body);
});

router.post('/personal', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_send_personal_push', req, res, req.body); 
});

module.exports = router;
