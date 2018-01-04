const config = require('../knexfile.js')[process.env.ENVIRONMENT];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const relativePathRoutes = require('./relativePathRoutes.js');
const crypto = require('crypto');



router
  .get('/workbench', function(req, res) {
    console.log('params are:', req.query);
    req.session.projectName = req.query.projectName;
    let pathHash = crypto.createHash('md5').update('/index.html').digest("hex");
    knex('projects')
    .select('palette')
    .where({
      user_id: req.session.userid,
      project_name: req.session.projectName
    })
    .then(function(data) {
      res.render('workbench.ejs', {
        username: req.session.username,
        projectName: req.session.projectName,
        pathHash: pathHash,
        palette: data[0].palette
      });
    })
  })
  .use(/^\/workbench/, relativePathRoutes)


module.exports = router;
