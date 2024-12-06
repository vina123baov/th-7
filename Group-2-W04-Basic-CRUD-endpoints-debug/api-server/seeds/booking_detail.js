/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('booking_detail').del();

  // Inserts seed entries
  await knex('booking_detail').insert([
    {
      booking_detail_id: 1,
      booking_id: 1,
      room_id: '101',
      price_per_day: 100.00,
      total_price: 500.00
    },
    {
      booking_detail_id: 2,
      booking_id: 2,
      room_id: '202',
      price_per_day: 150.00,
      total_price: 750.00
    },
    {
      booking_detail_id: 3,
      booking_id: 3,
      room_id: '303',
      price_per_day: 200.00,
      total_price: 1200.00
    }
  ]);
};
