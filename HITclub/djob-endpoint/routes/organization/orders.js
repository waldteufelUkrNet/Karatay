var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.get('/orders_for_offer', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
        //speciality_ids in req.body ... optional
    publisher.sendTask( 'organization_get_orders_for_offer', req, res, req.query);
});

router.get('/executors_for_order_offer/:order_id', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'organization_get_executors_for_order_offer', req, res, req.params);
});

router.post('/cancel_order_for_later', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'organization_cancel_order_for_later', req, res, req.body);
});



router.post('/create_order_offer', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'organization_create_order_offer', req, res, req.body);
});

router.get('/history', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
    publisher.sendTask( 'organization_get_history', req, res, req.query);
});

router.get('/schedules', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
    publisher.sendTask( 'organization_get_schedules', req, res, req.query);
});

router.get('/order_history/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'organization_get_order_history', req, res, {id});
});

router.get('/info/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'organization_get_order_info', req, res, {id});
});

module.exports = router;
