const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

// default password = user's name



router.get('/signup', function(req, res) {
  res.render('signup.ejs');
})


router.use(function(req, res, next) {
  console.log('In the signup route: ', req.body);
  next();
})


router.post('/signup', function(req, res, next) {
  console.log('Request body is:', req.body);

  knex('users')
    .where('username', req.body.username)
    .then(function(usersData) {

      return knex('users')
      .insert({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt)
      })
      .returning('id')
    })
    .then(function() {
      if(!bcrypt.compareSync(req.body.password, user.password)) throw 400;
      console.log('Password is valid');

      req.session.username = user.username;

      res.redirect('/projects');
    })
    .catch(function(err) {
      console.log(err);
      if (err) {
        res.redirect('/');
      }
      res.sendStatus(500);
    });

});






module.exports = router;
