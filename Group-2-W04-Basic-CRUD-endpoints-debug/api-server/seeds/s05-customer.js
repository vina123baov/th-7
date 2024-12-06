exports.seed = async function(knex) {
  await knex('customer').del();

  await knex('customer').insert([
      {
          username: 'user1',
          fullname: 'Vo Huynh Thai Bao',
          email: 'user1e@example.com',
          tel: '123456789'
      },
      {
          username: 'user2',
          fullname: 'Pham Phuoc Minh Hieu',
          email: 'user2@example.com',
          tel: '987654321'
      },
      {
          username: 'user3',
          fullname: 'Pham Minh Khoa',
          email: 'user3@example.com',
          tel: '555555555'
      }
  ]);
};
