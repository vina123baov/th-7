const { getKnex } = require('../models/db');

const BookingDetail = {
    findById: async (id) => {
        const knex = getKnex();
        return await knex('booking_detail').where({ booking_detail_id: id }).first();
    },

    update: async (detailId, bookingId, username, updates) => {
        const knex = getKnex();
        return await knex('booking_detail')
            .where({ booking_detail_id: detailId, booking_id: bookingId })
            .update(updates)
            .returning('*');
    },

    delete: async (id) => {
        const knex = getKnex();
        return await knex('booking_detail').where({ booking_detail_id: id }).del();
    },
};

module.exports = BookingDetail;
