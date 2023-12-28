let fs = require('fs');

function upload(file, callback) {
    var dir = './public/uploads';
    var im = require('imagemagick');
    let local_name = "";
    if (file) {
        fs.readFile(file.path, function (err, data) {
            if (err) {
                console.log('error');
                return;
            }

            var randtoken = require('rand-token').generator({chars: 'base32'});
            var token = randtoken.generate(24);
            local_name = randomInteger(1, 999) + '.' +  file.name.split('.').pop()   ;
            var newPath = dir + '/full/' + token + local_name;

            let filename = token + local_name;
            console.log(file.type);
            fs.writeFile(newPath, data, function (err) {
                if (err)
                    console.log(err);
                if (file.type.split("/")[0] === "image") {
                    im.resize({
                        srcPath: dir + '/full/' + filename,
                        dstPath: dir + "/thumb/" + filename,
                        width: 200
                    }, function (err, stdout, stderr) {
                        if (err) throw err;
                        console.log('resized image to fit within 200x200px');
                    });
                }

                callback('/uploads/thumb/' + filename);
            });

        });
    } else {
        callback('file not found');
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

var exports = module.exports = {};
exports.upload = upload;
