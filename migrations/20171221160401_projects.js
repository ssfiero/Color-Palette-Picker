
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('projects', function (table) {
    table.increments();
    table.integer('user_id').references('users.id');
    table.text('html');
    table.text('css');
    table.text('palet');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};
