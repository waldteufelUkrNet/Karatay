const router = require('express').Router();
var publisher = require('../../libs/publisher');
// const crypto = require('crypto');
// var api = require('../../models/api.js');


router.post('/wpf', async function (req, res, next) {
    console.log('wpf: ', req.body);
    publisher.sendTask( 'qiwi_wpf', req, res, req.body);
});

router.post('/holding', async function (req, res, next) {
    console.log('holding: ', req.body);
    publisher.sendTask( 'qiwi_holding', req, res, req.body);
});

router.post('/payout', async function (req, res, next) {
    console.log('payout: ', req.body);
    publisher.sendTask( 'qiwi_payout', req, res, req.body);
});

router.post('/refill', async function (req, res, next) {
    console.log('refill: ', req.body);
    publisher.sendTask( 'qiwi_refill', req, res, req.body);
});


module.exports = router;


