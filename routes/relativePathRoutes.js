const fs = require('fs');
const config = require('../knexfile.js')[process.env.ENVIRONMENT];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const mime = require('mime-types');
const admin = require("firebase-admin");
const crypto = require('crypto');
const bodyParser = require('body-parser');

router
  .use(bodyParser.json({limit: '50MB'}))
  .use(function(req,res,next){
    console.log('in relpath route');
    console.log('path is', req.path);
    next();
  })
  .get(/(.*?)/, function(req, res, next) {
    console.log('in path route');
    let userRef = res.locals.db.ref(req.session.username);
    let projectRef = userRef.child(req.session.projectName);
    let pathHash = crypto.createHash('md5').update(req.path).digest("hex");
    let fileRef = projectRef.child(pathHash);
    console.log('TRYING TO LOAD PATH:');
    console.log('user:', req.session.username);
    console.log('project:', req.session.projectName);
    console.log('hash:', pathHash);
    fileRef.on("value", function(snapshot) {
      let fileData = snapshot.val()['file'];
      let buf = Buffer.from(fileData, 'base64');
      let type = mime.lookup(req.path);

      console.log('file changed');

      if (!res.headersSent) {
        res.contentType(type);
        res.send(buf);
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });

module.exports = router;
