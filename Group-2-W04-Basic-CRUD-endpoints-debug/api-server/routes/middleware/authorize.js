// module.exports.authorized = function(user, action, endpoint) {
//     if (user.role == "admin") {
//         return true;
//     } else {
//         return false;
//     }
// }
const table_policies = {
    "/room": {
        admin: { GET: true, POST: true },
        manager: { GET: true, POST: false },
    },
    "/room/:id": {
        admin: { GET: true, DELETE: true, PATCH: true },
        manager: { GET: true, DELETE: false, PATCH: false },
    },
    "/manager": {
        admin: { GET: true },
        manager: { GET: true },
    },
    "/manager/:username": {
        admin: { PATCH: true },
    },
    "/customer": {
        admin: { GET: true, POST: true },
        manager: { GET: true, POST: false },
        customer: { GET: true, POST: false },
        guest: { POST: true },
    },
    "/customer/:username": {
        admin: { GET: true, DELETE: true, PATCH: true },
        manager: { GET: true, DELETE: true, PATCH: true },
        customer: { GET: true, DELETE: false, PATCH: true },
    },
};

module.exports.authorized = function (roles = []) {
    return function (req, res, next) {
        try {
            const method = req.method;
            const path = req.route?.path || req.url;

            if (
                !table_policies[path] ||
                !roles.includes(req.user.role) ||
                !table_policies[path][req.user.role]?.[method]
            ) {
                res.send(403, {
                    success: false,
                    code: 403,
                    message: 'Unauthorized access - Insufficient privilege',
                });
                return next(false);
            }

            return next();
        } catch (error) {
            res.send(500, {
                success: false,
                code: 500,
                message: 'Internal server error during authorization',
            });
            return next(false);
        }
    };
};