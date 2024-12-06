var jwt = require('jsonwebtoken');
var Router = require('restify-router').Router;
const router = new Router();

router.post('/login', async (req, res) => {
    var {username = "", password = ""} = req.params;
    if ((username.length == 0)
        || (password.length == 0)
    ) {
        res.send({
            success: false,
            code: 401,
            message: "Invalid username or password"
        })
    }

    // TODO: truy vấn csdl để kiểm tra đăng nhập thực sự
    if( ((username == "admin") && (password=="1234") )
        || ((username == "manager01") && (password == "1234"))
        || ((username == "manager02") && (password == "1234"))
        || ((username == "customer01") && (password == "1234"))
        || ((username == "customer02") && (password == "1234"))
    ){
        const token = jwt.sign({
            username: username ,
            role: (username == "admin") ? "admin" 
                : ((username == "manager01") || (username == "manager02") ) ? "manager"
                : "customer"
        }, secret, { expiresIn: '1h' });
        res.send({
            success: true,
            code: 200,
            message: "Login successfully",
            token: token
        })
    } else {
        res.send({
            success: false,
            code: 401,
            message: "Invalid username or password"
        });
    }    
});

module.exports = router;