var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');

router.get('/', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'organization_executors_list', req, res, req.query);
});

router.get('/info/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'organization_executor_info', req, res, {id});
});

router.put('/:id', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    let {id} = req.params;

    publisher.sendTask( 'organization_executors_update', req, res, {id, data: req.body});
});

router.post('/', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'organization_executors_add', req, res, req.body);
});

router.post('/check', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });

    publisher.sendTask( 'organization_executors_check', req, res, req.body);
});

router.post('/invite', async function (req, res) {
    if(!req.input_user || !req.input_user.user )
        return res.status(401).json({ status:"ERROR", message: 'AUTH_ERROR' });
        // phone
    publisher.sendTask( 'organization_invite_executor', req, res, req.body);
});
module.exports = router;
