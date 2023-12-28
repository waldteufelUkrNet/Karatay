const router          = require('express').Router();
// var paymentService = require('../../services/qiwi.js');


/*router.get('/params', async function (req, res, next) {
    let resp = await paymentService.getToken(req.query.id);
    return res.status(200).json({status:"OK", message:"", data: resp});
});

router.get('/holding', async function (req, res, next) {
    if(req.query.id){
        let resp = await paymentService.holding(req.query.id, 5, 2.5, 16);
        return res.status(200).json({status:"OK", message:"", data: resp});
    }
});

router.get('/cancel', async function (req, res, next) {
    if(req.query.id) {
        let resp = await paymentService.cancel(req.query.id);
        return res.status(200).json({status: "OK", message: "", data: resp});
    }
});

router.get('/confirm', async function (req, res, next) {
    if(req.query.id) {
        let resp = await paymentService.confirm(req.query.id);
        return res.status(200).json({status: "OK", message: "", data: resp});
    }
});*/

module.exports = router;

