const fs = require('fs');
// const config = require('../knexfile.js')['development'];
const config = require('../knexfile.js')[process.env.ENVIRONMENT];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const mime = require('mime-types');
const crypto = require('crypto');
const bodyParser = require('body-parser');
// const admin = require("firebase-admin");
// const serviceAccount = require("../../json/color-palette-picker.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://color-palette-picker-48bf1.firebaseio.com"
// });
// const db = admin.database();

router
  .use(bodyParser.json({limit: '50MB'}))
  .post('/upload/file', function (req, res, next) {
    console.log('in post');

    let userRef = res.locals.db.ref(req.session.username);
    let projectRef = userRef.child(req.session.projectName);
    let pathHash = crypto.createHash('md5').update('/index.html').digest("hex");
    let fileRef = projectRef.child(pathHash);
    console.log('user is:', req.session.username);
    console.log('project is:', req.session.projectName);
    console.log('file path is: /index.html');
    console.log('path hash is:', pathHash);
    console.log('file is:', req.body.file);

    knex('projects')
    .update('palette', req.body.palette)
    .where({
      user_id: req.session.userid,
      project_name: req.session.projectName
    })
    .then(function() {
      fileRef.set({
        file: req.body.file
      })

      res.sendStatus(200);
    })
  })
  .post('/upload/directory', function (req, res, next) {
    console.log('in post');

    req.body.files.forEach(function(file) {
      let userRef = res.locals.db.ref(req.session.username);
      let projectRef = userRef.child(req.body.projectName);
      let pathHash = crypto.createHash('md5').update(file.path).digest("hex");
      let fileRef = projectRef.child(pathHash);
      fileRef.set({
        file: file.content
      })
      console.log('uploaded:', file.path);
      console.log('hash is:', pathHash);
    })

    knex('projects')
    .insert({
      user_id: req.session.userid,
      project_name: req.body.projectName,
      palette: JSON.stringify({
        primary: {
          targets: [],
          color: '#000000'
        },
        secondary: {
          targets: [],
          color: '#000000'
        },
        primary_contrast: {
          targets: [],
          color: '#000000'
        },
        secondary_contrast: {
          targets: [],
          color: '#000000'
        },
        highlight: {
          targets: [],
          color: '#000000'
        }
      })
    })
    .returning('id')
    .then(function(data) {
      console.log('inserted:', data);
      res.sendStatus(200);
    })
  })

module.exports = router;
