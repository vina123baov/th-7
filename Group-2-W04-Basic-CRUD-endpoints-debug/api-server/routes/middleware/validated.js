let Validator = require('validatorjs');
let rules = {
    "/room/:id": {
        "GET":  {
            id: "required|integer|min:1"
        },
        "DELETE": {
            id: "required|integer|min:1"
        },
        "PATCH": {
		        id: "required|integer|min:1",
            name: "string",
            price: "integer|min:0"   
        }
    },
    "/room": {
        "POST": {
            name: "required|string",
            price: "required|integer|min:0"
        }
    },
    "/manager:username": {
        "PATCH": {
		        username: "string",
            fullname: "string",
            base_salary: "integer|min:0"
        }
    }
};

module.exports.validated = function (req, res, next) {
    let {method, path} = req.getRoute();
    let rule = rules[path][method];
    let validation = new Validator(req.params, rule);

    if (validation.fails()) {
        res.send({"success":false,"code":400,"message":"Bad request",
            "data":{
                "errors":{
                    "name":["The name field is required."],
                    "price":["The price field is required."]
        }	}	},
        {"success":false,"code":400,"message":"Bad request","data":{
            "errors":{
                "price":["The price must be at least 0."]
        }}},
        {"success":false,"code":400,"message":"Bad request","data":{"errors":{
            "id":[
                "The id must be an integer.",
                "The id must be at least 1."
            ]
        }}}
    ); return next(false);
    }

    return next();
}