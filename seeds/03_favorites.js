
exports.seed = function(knex, Promise) {
  let users = [];
  let projects = [];
  let favorites = [];
  let duplicateCheck = [];

  return knex('favorites').del()
  .then(function () {
    return knex('users').select('id');
  })
  .then(function (userIds) {
    users = userIds.map((userId) => {
      return userId.id;
    })

    return knex('projects').select('id');
  })
  .then(function (projectIds) {
    projects = projectIds.map((projectId) => {
      return projectId.id;
    })

    let loopGuard = 0;
    while (favorites.length < 40) {
      let user = users[Math.floor(Math.random() * users.length)];
      let project = projects[Math.floor(Math.random() * projects.length)];

      if (!duplicateCheck.includes(user + ',' + project)) {
        duplicateCheck.push(user + ',' + project);

        favorites.push({
          user_id: user,
          project_id: project
        })
      }

      loopGuard++;
      if (loopGuard > 1000) {
        console.log('in an infinite loop');
        return;
      }
    }

    return knex('favorites').insert(favorites);
  })
};
