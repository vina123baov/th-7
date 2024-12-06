/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('employees').del()
    .then(() => {
      return knex('employees').insert([
        { fullname: 'Minh Hieu', email: 'hieu.2201700085@st.umt.edu.vn', tel: '123456789', address: 'HCM' },
        { fullname: 'Thai Bao', email: 'bao.2201700186@st.umt.edu.vn', tel: '987654321', address: 'HCM' },
        { fullname: 'Minh Khoa', email: 'khoa.2201700189@st.umt.edu.vn', tel: '456789123', address: 'HCM' }
      ]);
    });
};
