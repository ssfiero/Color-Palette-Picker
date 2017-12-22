
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('favorites', function (table) {
    table.integer('user_id').references('users.id');
    table.integer('project_id').references('projects.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
