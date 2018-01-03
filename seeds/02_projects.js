const fs = require('fs');

const names = [
  'mySite',
  'myOtherWebsite',
  'awsome-project1',
  'awsome-project2'
]

exports.seed = function(knex, Promise) {
  return knex('projects').del()
  .then(function () {
    return knex('users').select('id')
  })
  .then(function (userIds) {
    let projects = [];

    for (let i = 0; i < userIds.length; i++) {
      for (let j = 0; j < names.length; j++) {
        projects.push({
          user_id: userIds[i].id,
          project_name: names[j],
          palette: JSON.stringify({
            primary: {
              targets: [{element: 1, attribute: 'backgroundColor'}],
              color: '#c743f9'
            },
            secondary: {
              targets: [{element: 2, attribute: 'backgroundColor'}],
              color: '#bbdd99'
            }
          })
        })
      }
    }
    return knex('projects').insert(projects);
  });
};
