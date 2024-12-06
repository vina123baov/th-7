const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');

const Manager = require('../models/manager');

router.get('/manager', [authenticated, authorized(['admin', 'manager'])], async (req, res) => {
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

router.patch('/manager/:username', [authenticated, authorized(['admin']), validated], async (req, res) => {
    try {
        const { username } = req.params;
        const context = req.user;
        const patch = req.body;

        const result = await Manager.update(context, username, patch);
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

module.exports = router;
