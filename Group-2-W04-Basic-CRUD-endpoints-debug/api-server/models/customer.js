const { getKnex } = require('../models/db.js');
const { rowFilter } = require('./security/row.js');
const table = 'customer';
const columns = ['username', 'fullname', 'email', 'tel'];

const Customer = {
    findAll: async (user) => {
        const knex = getKnex();
        const filteredKnex = rowFilter(knex, 'getAll', table, user);  
        return await filteredKnex.select(columns).from(table); 
    },

    findByUsername: async (username, user) => {
        const knex = getKnex();
        const filteredKnex = rowFilter(knex, 'getAll', table, user);  
        return await filteredKnex.select(columns).from(table).where({ username });
    },

    create: async (data) => {
        const knex = getKnex();
        return await knex(table).insert(data); 
    },

    delete: async (username) => {
        const knex = getKnex();
        return await knex(table).where({ username }).del();  
    },

    update: async (username, updatedData) => {
        const knex = getKnex();
        return await knex(table).where({ username }).update(updatedData);
    },
};

module.exports = Customer;