const {getKnex} = require('../models/db.js');
const {rowFilter} = require('./security/row.js');

const table = 'manager';
const columns = ['username', 'fullname', 'base_salary']

const getAll = async (req) => {
    let knex = getKnex()(table)
        .select(columns);
    knex = rowFilter(knex, "getAll", table, req.user);
    const result = await knex;
    return result;
} 

module.exports = {
    getAll,
}

