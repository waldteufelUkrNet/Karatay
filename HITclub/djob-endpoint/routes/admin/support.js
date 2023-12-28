var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.get('/', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'get_support_requests', req, res, req.query);
});

router.get('/count', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'get_support_requests_count', req, res, req.query);
});

router.put('/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user || req.input_user.user.role!=="ADMIN" )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;
    publisher.sendTask( 'update_support', req, res, {id, data: req.body});
});

module.exports = router;
