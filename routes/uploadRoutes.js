const fs = require('fs');
const config = require('../knexfile.js')['development'];
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

let user = 'Sophia';
let project = 'awsome-project1';

router
  .use(bodyParser.json({limit: '50MB'}))
  .post(/(.*?)/, function (req, res, next) {
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
          color: '#FFFFFF'
        }
      })
    })
    .returning('id')
    .then(function(data) {
      console.log('inserted:', data);
      res.sendStatus(200);
    })
  })
  .get('/storeafile', function (req, res, next) {
    console.log('storing file');
    let ref = db.ref(user);
    let stored = ref.child(project);
    let file = fs.readFileSync('./Apollo.jpg', 'base64');
    let fileHash = crypto.createHash('md5').update('/Apollo.jpg').digest("hex");
    let data = {};
    data[fileHash] = file;
    stored.set(data)
    console.log('stored file:', file);
    res.sendStatus(200);
  })

module.exports = router;
