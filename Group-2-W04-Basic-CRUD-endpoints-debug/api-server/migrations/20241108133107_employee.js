/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table) {
      table.increments('id').primary();
      table.string('fullname').notNullable();
      table.string('email').notNullable().unique();
      table.string('tel').notNullable();
      table.string('address').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('employees');
  };
  