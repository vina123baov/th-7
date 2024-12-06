const Router = require('restify-router').Router;
const BookingDetail = require('../models/BookingDetail');
const router = new Router();

router.patch('/booking-detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDetail = await BookingDetail.update(id, req.body);
        res.send(200, { message: 'Booking detail updated', detail: updatedDetail });
    } catch (error) {
        res.send(500, { error: 'Internal server error' });
    }
});
router.del('/booking-detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await BookingDetail.delete(id);
        res.send(204);
    } catch (error) {
        res.send(500, { error: 'Internal server error' });
    }
});

module.exports = router;
