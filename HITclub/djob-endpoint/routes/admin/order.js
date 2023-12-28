var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.get('/', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_orders_list', req, res, req.query);
});

router.get('/count', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'admin_orders_list_count', req, res, req.query);
});

router.get('/fullinfo/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'admin_order_fullinfo', req, res, {id});
});

router.get('/history/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'admin_order_history', req, res, {id});
});

module.exports = router;
