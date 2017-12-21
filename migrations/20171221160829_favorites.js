
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('favorites', function (table) {
    table.integer('user').references('users.id');
    table.integer('project').references('projects.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
