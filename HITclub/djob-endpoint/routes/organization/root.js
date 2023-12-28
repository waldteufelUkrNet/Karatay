var express = require('express');
var router = express.Router();
var publisher = require('../../libs/publisher');
var fileLib = require('../../libs/file');
let fs = require('fs');
let multiparty = require('connect-multiparty');
let multipartyMiddleware = multiparty();

router.post('/signin', async function (req, res) {
    if(!req.body  || !req.body.email || !req.body.password) {
        return res.status(400).json({ status:"ERROR", message: 'MISSING_INPUT_PARAMETERS' });
    }

    publisher.sendTask( 'organization_login', req, res,
        {
            email: req.body.email,
            password: req.body.password
        });
});

router.put('/account', async function (req, res) {
    publisher.sendTask( 'organization_edit_account', req, res, req.body);
});

router.post('/account/image', multipartyMiddleware, async function (req, res) {
    if (req.files && req.files.file) {
        fileLib.upload(req.files.file, async function (data) {
            return res.status(200).json({status: "OK", error: null, data: data});
        });
    } else {
        return res.status(400).json({status: "ERROR", error: 'FILE_NOT_RECEIVED', data: null});
    }
});

module.exports = router;
