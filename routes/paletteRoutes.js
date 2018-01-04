const config = require('../knexfile.js')[process.env.ENVIRONMENT];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();

router
  .get('/palettes', function(req, res) {
    knex('projects')
    .select('palette')
    .where({
      user_id: req.session.userid,
      project_name: req.session.projectName
    })
    .then(function(data) {
      res.send(data[0].palette);
    })
  })

module.exports = router;
