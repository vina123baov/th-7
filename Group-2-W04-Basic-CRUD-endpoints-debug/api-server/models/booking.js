const { getKnex } = require('../models/db');

const Booking = {
    findByCustomer: async (username) => {
        const knex = getKnex();
        return await knex('booking').where({ username });
    },

    findById: async (id) => {
        const knex = getKnex();
        return await knex('booking').where({ booking_id: id }).first();
    },

    create: async (username, booking, details) => {
        const knex = getKnex();
        const [newBookingId] = await knex('booking').insert({ username, ...booking }).returning('booking_id');

        if (details && details.length > 0) {
            const detailEntries = details.map(detail => ({ booking_id: newBookingId, ...detail }));
            await knex('booking_detail').insert(detailEntries);
        }

        return await Booking.findById(newBookingId);
    },

    update: async (id, updates) => {
        const knex = getKnex();
        await knex('booking').where({ booking_id: id }).update(updates);
        return await Booking.findById(id);
    },

    delete: async (id) => {
        const knex = getKnex();
        await knex('booking_detail').where({ booking_id: id }).del();
        return await knex('booking').where({ booking_id: id }).del();
    },
};

module.exports = Booking;
