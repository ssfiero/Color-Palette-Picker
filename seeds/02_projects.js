const fs = require('fs');
const sampleHTML = fs.readFileSync('./sample/index.html','utf8');
const sampleCSS = fs.readFileSync('./sample/styles.css','utf8');

const names = [
  'mySite',
  'my other website',
  'awsome-project1',
  '!@#$%^&*()(*&^%)'
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
          html: sampleHTML,
          css: sampleCSS,
          palette: JSON.stringify([
            {
              element: '0',
              color: 'c743f9'
            },
            {
              element: '1',
              color: 'bbdd99'
            },
            {
              element: '2',
              color: 'ffbb44'
            }
          ])
        })
      }
    }
    return knex('projects').insert(projects);
  });
};
