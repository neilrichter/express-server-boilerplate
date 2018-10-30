
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('write_test')
    .then(exists => {
      if (!exists) {
        knex.schema.createTable('write_test', table => {
          table.increments('id');
					table.timestamp('created_at').defaultTo(knex.fn.now());
					knex.dropTableIfExists('write_test');
        });
      }
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('write_test');
};
