const Router = require('restify-router').Router;
const router = new Router();
const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const { validated } = require('./middleware/validated');
const Booking = require('../models/booking');

router.get('/customer/:username/booking', [authenticated], async (req, res) => {
    const { username } = req.params;
    const context = req.user;

    if (context.username !== username && !['admin', 'manager'].includes(context.role)) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    const result = await Booking.findByCustomer(username);
    res.send({ success: true, data: result });
});

router.get('/booking/:id', [authenticated], async (req, res) => {
    const { id } = req.params;
    const context = req.user;

    const booking = await Booking.findById(id);
    if (!booking || booking.username !== context.username) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    res.send({ success: true, data: booking });
});

router.post('/booking', [authenticated, authorized(['customer', 'manager', 'admin'])], async (req, res) => {
    const { username, booking, details } = req.body;
    const context = req.user;

    if (context.username !== username && context.role !== 'admin') {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    const result = await Booking.create(username, booking, details);
    res.send({ success: true, data: result });
});

router.patch('/booking/:id', [authenticated, authorized(['customer'])], async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const context = req.user;

    const booking = await Booking.findById(id);
    if (!booking || booking.username !== context.username) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    const allowedColumns = ['status', 'check_in_date', 'check_out_date'];
    const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([key]) => allowedColumns.includes(key))
    );

    const result = await Booking.update(id, filteredUpdates);
    res.send({ success: true, data: result });
});

router.patch('/customer/:username/booking/:booking_id/detail/:detail_id', [authenticated], async (req, res) => {
    const { username, booking_id, detail_id } = req.params;
    const updates = req.body;
    const context = req.user;

    if (context.username !== username && !['admin', 'manager'].includes(context.role)) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    const booking = await Booking.findById(booking_id);
    if (!booking || booking.username !== username) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    const result = await Booking.updateDetail(detail_id, updates);
    res.send({ success: true, data: result });
});

router.del('/detail/:id', [authenticated], async (req, res) => {
    const { id } = req.params;
    const context = req.user;

    const detail = await Booking.findDetailById(id);
    if (!detail || detail.username !== context.username) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    await Booking.deleteDetail(id);
    res.send({ success: true, message: 'Detail deleted successfully' });
});

router.del('/booking/:id', [authenticated], async (req, res) => {
    const { id } = req.params;
    const context = req.user;

    const booking = await Booking.findById(id);
    if (!booking || booking.username !== context.username) {
        return res.send(403, { success: false, message: 'Forbidden' });
    }

    await Booking.delete(id);
    res.send({ success: true, message: 'Booking deleted successfully' });
});

module.exports = router;
