const { authenticated } = require('./middleware/authenticate');
const { authorized } = require('./middleware/authorize');
const Booking = require('../models/booking');
const BookingDetail = require('../models/bookingdetail');
const Router = require('restify-router').Router;
const Joi = require('joi'); // For validation
const router = new Router();

const bookingSchema = Joi.object({
    username: Joi.string().required(),
    booking: Joi.object().required(),
    details: Joi.array().items(Joi.object()).required(),
});

const updatesSchema = Joi.object().required();

router.get('/customer/:username/booking', [authenticated, authorized(['admin', 'customer'])], async (req, res, next) => {
    const { username } = req.params;
    const { username: tokenUsername } = req.user;
    if (req.user.role !== 'admin' && username !== tokenUsername) {
        return res.send(403, { error: 'Forbidden' });
    }
    try {
        const bookings = await Booking.findByCustomer(username);
        res.send(200, bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        res.send(500, { error: 'Internal server error', details: error.message });
    }
});

router.get('/booking/:id', [authenticated, authorized(['admin', 'customer'])], async (req, res, next) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.send(404, { error: 'Booking not found' });
        }
        if (req.user.role !== 'admin' && booking.username !== req.user.username) {
            return res.send(403, { error: 'Forbidden' });
        }
        res.send(200, booking);
    } catch (error) {
        console.error('Error fetching booking by ID:', error.message);
        res.send(500, { error: 'Internal server error', details: error.message });
    }
});

router.post('/booking', [authenticated, authorized(['customer', 'manager', 'admin'])], async (req, res, next) => {
    try {
        const { error } = bookingSchema.validate(req.body);
        if (error) {
            return res.send(400, { error: 'Invalid input', details: error.details });
        }
        const { username, booking, details } = req.body;
        const newBooking = await Booking.create(username, booking, details);
        res.send(201, { message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('Error creating booking:', error.message);
        res.send(500, { error: 'Internal server error', details: error.message });
    }
});

router.patch('/booking/:id', [authenticated, authorized(['customer', 'admin'])], async (req, res, next) => {
    const { id } = req.params;
    try {
        const { error } = updatesSchema.validate(req.body);
        if (error) {
            return res.send(400, { error: 'Invalid updates', details: error.details });
        }
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.send(404, { error: 'Booking not found' });
        }
        if (req.user.role !== 'admin' && booking.username !== req.user.username) {
            return res.send(403, { error: 'Forbidden' });
        }
        const updatedBooking = await Booking.update(id, req.body);
        res.send(200, { message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error updating booking:', error.message);
        res.send(500, { error: 'Internal server error', details: error.message });
    }
});

router.del('/booking/:id', [authenticated, authorized(['customer', 'admin'])], async (req, res, next) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.send(404, { error: 'Booking not found' });
        }
        if (req.user.role !== 'admin' && booking.username !== req.user.username) {
            return res.send(403, { error: 'Forbidden' });
        }
        await Booking.delete(id);
        res.send(204);
    } catch (error) {
        console.error('Error deleting booking:', error.message);
        res.send(500, { error: 'Internal server error', details: error.message });
    }
});

router.del('/detail/:id', [authenticated, authorized(['admin', 'customer'])], async (req, res, next) => {
    const { id } = req.params;
    try {
        const detail = await BookingDetail.findById(id);
        if (!detail) {
            return res.send(404, { error: 'Detail not found' });
        }
        if (req.user.role !== 'admin' && detail.username !== req.user.username) {
            return res.send(403, { error: 'Forbidden' });
        }
        await BookingDetail.delete(id);
        res.send(204);
    } catch (error) {
        console.error('Error deleting detail:', error.message);
        res.send(500, { error: 'Internal server error', details: error.message });
    }
});

module.exports = {
    applyRoutes: (server) => router.applyRoutes(server, '/api'),
};
