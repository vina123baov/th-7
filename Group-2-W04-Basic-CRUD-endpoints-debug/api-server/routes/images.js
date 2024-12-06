const restify = require('restify');
var Router = require('restify-router').Router;
const router = new Router();
const { uuid } = require('uuidv4');
const fs = require('fs');

//TODO: thêm endpoint /private/img/* cho ảnh cần phải đăng nhập và ảnh phân quyền
router.get('/public/img/*', restify.plugins.serveStatic({
    directory: './public/img',
    default: 'default.png',
    appendRequestPath: false
}))

// Copy file sang một thư mục khác
function move(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}

router.post('/upload', (request, response, next) => {
    var names = [];
    for (var key in request.files) { console.log(key);
        if (request.files.hasOwnProperty(key)) {
            var file = request.files[key];
            
            // Tạo tên mới không trùng bằng uuid
            var extension = file.name.match(/\.[0-9a-z]{1,5}$/i);
            var newName = `../public/img/${uuid()}${extension}`;
            var newPath = `${__dirname}/${newName}`;
            
            move(file.path, newPath, error => {
                console.log("Có lỗi khi di chuyển file ảnh qua thư mục đích:");
                console.log(error);
            });

            names.push(newName);
        }
    }

    response.send(202, { message: 'Images uploaded', names: names });
});

module.exports = router;