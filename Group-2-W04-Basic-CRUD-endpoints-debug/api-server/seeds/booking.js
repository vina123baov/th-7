/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('booking').del();

  // Inserts seed entries
  await knex('booking').insert([
    {
      booking_id: 1,
      username: 'user1',
      booking_date: '2024-11-30',
      checkin_date: '2024-12-05',
      checkout_date: '2024-12-10',
      total_payment: 500.00,
    },
    {
      booking_id: 2,
      username: 'user2', 
      booking_date: '2024-11-29',
      checkin_date: '2024-12-10',
      checkout_date: '2024-12-15',
      total_payment: 750.00,
    },
    {
      booking_id: 3,
      username: 'user3',
      booking_date: '2024-11-28',
      checkin_date: '2024-12-20',
      checkout_date: '2024-12-25',
      total_payment: 1200.00,
    },
  ]);
};
