const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const relativePathRoutes = require('./relativePathRoutes.js');
const crypto = require('crypto');



router
  .get('/workbench', function(req, res) {
    console.log('params are:', req.query);
    req.session.projectName = req.query.projectName;
    let pathHash = crypto.createHash('md5').update('website/index.html').digest("hex");
    res.render('workbench.ejs', {
      username: req.session.username,
      projectName: req.session.projectName,
      pathHash: pathHash
    });
  })
  .use(/^\/workbench/, relativePathRoutes)


module.exports = router;
