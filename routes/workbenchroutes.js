const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();



router.get('/workbench', function(req, res) {
  res.render('workbench.ejs');
});




module.exports = router;
