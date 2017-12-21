const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

let users = [
  Sophia,
  Jackson,
  Olivia,
  Liam,
  Emma,
  Noah,
  Ava,
  Aiden,
  Isabella
]

exports.seed = function(knex, Promise) {
  users = users.map(function(name) {
    return {
      name: name,
      passwored: bcrypt.hashSync(name, salt)
    }
  })

  return knex('users').insert(users);
};
