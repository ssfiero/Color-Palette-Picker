
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('projects', function (table) {
    table.increments();
    table.integer('user_id').references('users.id');
    table.text('project_name');
    table.text('html');
    table.text('css');
    table.text('palette');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};
