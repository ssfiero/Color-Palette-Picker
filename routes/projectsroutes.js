const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();



router.get('/projects', function(req, res) {
  res.render('projects.ejs');
});





module.exports = router;
