const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const relativePathRoutes = require('./relativePathRoutes.js');



router
  .get('/workbench', function(req, res) {
    res.render('workbench.ejs');
  })
  .use(/^\/workbench/, relativePathRoutes)


module.exports = router;
