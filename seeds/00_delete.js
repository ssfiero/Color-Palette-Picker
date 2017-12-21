
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function() {
      return knex('projects').del();
    })
    .then(function() {
      return knex('users').del();
    })
};
