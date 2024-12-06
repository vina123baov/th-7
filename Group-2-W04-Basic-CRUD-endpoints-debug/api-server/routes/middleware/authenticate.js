const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

module.exports.authenticated = function (req, res, next) {
    try {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            const { username, role } = jwt.verify(token, secret);
            req.user = { username, role };
            return next();
        }
        res.send(401, {
            success: false,
            code: 401,
            message: 'Unauthorized access - No token provided',
        });
        return next(false);
    } catch (err) {
        res.send(401, {
            success: false,
            code: 401,
            message: 'Unauthorized access - Invalid token',
        });
        return next(false);
    }
};
