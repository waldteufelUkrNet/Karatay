/** @api {post} /mobile_api/v1/executor/status Изменить текущий статус
 * @apiDescription 1 - занят, 0 - свободен
 * @apiName setStatusExecutor
 * @apiGroup ExecutorMain
 * @apiVersion 1.0.0
 *
 *
 *   @apiHeader {String} x-access-token Users access-token.
 * @apiParam {Number} status ID статуса

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *  {status:"OK", error:"", data:{status:1}}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *     HTTP/1.1 200 OK Input error // слишком низкий баланс
 *     { status:"ERROR", error: 'CASH_BALANCE_TOO_LOW' }
 *
 */
 var mongoose = require('mongoose');
var config = require('../../../config');
var api = require('../../../models/api');
var fs = require('fs');
var request = require('request');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var express = require('express');
var router = express.Router();

mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

/** @api {post} /mobile_api/v1/upload Загрузить файл
 * @apiDescription 1 - занят, 0 - свободен
 * @apiName uploadFile
 * @apiGroup Files
 * @apiVersion 1.0.0
 *
 * @apiParam {File} file Факйл фото

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "status": "OK",
    "error": null,
    "data": {
        "fileName": "DWEF7OUQRPD2KWJDG3OMCTQ7TAL4IARP3GKN634ZIQU2NTHNEH3U.jpg"
    }
}
 * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Input error // неверный токен
 *     { status:"ERROR", error: 'AUTH_ERROR' }
 *
 */

router.post('/upload', multipartyMiddleware, async function (req, res) {

    var fileName = '';
   let user;


            if (req.files && req.files.file) {

                uploadFile(req.files.file, async function (data) {
                    fileName = '/' + data.fileName;

                    fileName = fileName.replace(/^\/uploads\//,"");             //created for Dima


                    res.json({ status:"OK", error:null, data:{fileName}});

                });

            }
            else {
                res.json({status:"ERROR", error: "FILE_NOT_RECEIVED"});
            }


});


function checkFileExtensionInUrl(fileName, response, token) {

    // Проверяем наличие расширения вконце url-а.
    var fileExtensions = fileName.split('.').pop();
    console.log('**fileExtensions', fileExtensions);


    // Если расширение в url есть -> Просто добавляю токен и отдаю.
    if (fileExtensions == 'jpeg' ||
        fileExtensions == 'jpg' ||
        fileExtensions == 'gif' ||
        fileExtensions == 'png')
    {
        console.log('File has Extensions:', fileExtensions);
        fileName = token + fileName;
        console.log('**fileName', fileName);
    }
    // Если расширения в url нет -> пытаюсь найти его в header в content-type.
    else {

        var contentType = response.headers["content-type"];
        var typeFromContentType = contentType.split('/').pop();

        // Если расширения нет даже в content-type -> по-умолчанию выставляю 'jpeg'.
        if (typeFromContentType != 'jpeg' ||
            typeFromContentType != 'gif' ||
            typeFromContentType != 'png')
        {
            typeFromContentType = 'jpeg';
        }

        fileName = token + '.' + typeFromContentType;
    }

    return fileName;
}


function uploadFile(file, callback) {
    var dir = './public/uploads';

    if (file) {
        fs.readFile(file.path, function (err, data) {
            if (err) {
                console.log('error');
                return;
            }

            var randtoken = require('rand-token').generator({chars: 'base32'});
            var token = randtoken.generate(52);

            var newPath = './public/uploads/' + token +'.'+ file.name.split(".")[1];
            console.log(newPath)
            fs.writeFile(newPath, data, function (err) {
                if (err)
                    console.log(err);
                callback({fileName: 'uploads/' + token +'.'+ file.name.split(".")[1]}, {fileName: 'uploads/' + token +'.'+ file.name.split(".")[1]});
            });

        });
    }
    else {
        callback('file not found');
    }
}


module.exports = router;
