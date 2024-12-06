const { authenticated } = require('../routes/middleware/authenticate');
const { authorized } = require('../routes/middleware/authorize');
const { validated } = require('../routes/middleware/validated');
const Customer = require('../models/customer');
const Router = require('restify-router').Router;
const router = new Router();

router.get('/customer', [authenticated, authorized(['admin', 'manager'])], async (req, res) => {
    try {
        const result = await Manager.getAll(req);
        res.send({
            success: true,
            code: 200,
            data: result,
        });
    } catch (error) {
        res.send(500, {
            success: false,
            code: 500,
            message: error.message,
        });
    }
});


router.post('/customer', [authenticated, authorized], async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.send(400, { error: 'Username and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await Customer.create({ username, password: hashedPassword, fullname: '', email: '', tel: '' });
    res.send(201, { message: 'Customer created successfully' });
});

router.get('/customer/:username', [authenticated, authorized], function(req, res, next) {
    const { username: paramUsername } = req.params;
    Customer.findByUsername(paramUsername)
        .then(customer => {
            if (!customer) {
                return res.send(404, { error: 'Customer not found' });
            }
            res.send(200, customer);
            next(); // Gọi next để tiếp tục chuỗi middleware
        })
        .catch(error => {
            res.send(500, { error: error.message });
            next(); // Gọi next để tiếp tục chuỗi middleware
        });
});


router.del('/customer/:username', [authenticated, authorized], async (req, res) => {
    const { username } = req.params;
    await Customer.delete(username);
    res.send(204);
});

router.patch('/customer/:username', [authenticated, authorized, validated], async (req, res) => {
    const { username } = req.params;
    const updateData = req.body;

    if (updateData.username) {
        return res.send(400, { error: 'Cannot update username' });
    }

    const result = await Customer.update(username, updateData);
    res.send(200, { message: 'Customer updated successfully', data: result });
});

module.exports = router;
