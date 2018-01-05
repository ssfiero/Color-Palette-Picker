// const config = require('../knexfile.js')['development'];
const config = require('../knexfile.js')[process.env.ENVIRONMENT];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();



router.get('/projects', function(req, res) {
  console.log('In projects route: ', req.session.userid);
  knex('projects')
  .where('user_id', req.session.userid)
  .then(function(projects) {
    console.log('got project data: ', projects);
    res.render('projects.ejs', {projects});
  })
});





module.exports = router;
