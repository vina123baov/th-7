exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE customer(
            username text NOT NULL PRIMARY KEY,
            fullname text,
            email text NOT NULL UNIQUE,
            tel text
        );
        COMMENT ON TABLE customer IS 'Khách hàng';
        COMMENT ON COLUMN customer.username IS 'Tên đăng nhập';
        COMMENT ON COLUMN customer.fullname IS 'Tên đầy đủ';
        COMMENT ON COLUMN customer.email IS 'Email khách hàng';
        COMMENT ON COLUMN customer.tel IS 'Số điện thoại khách hàng';
    `);
};

exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE customer;
    `);
};
