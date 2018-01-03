const fs = require('fs');
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();
const mime = require('mime-types');
const admin = require("firebase-admin");
const crypto = require('crypto');
const bodyParser = require('body-parser');
const serviceAccount = require("../../json/color-palette-picker.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-palette-picker.firebaseio.com"
});
const db = admin.database();

let user = 'Sophia';
let project = 'awsome-project1';

router
  .use(bodyParser.json({limit: '50MB'}))
  .post(/(.*?)/, function (req, res, next) {
    console.log('in post');
    console.log('body is:', req.body);
    console.log('files is:', req.files);

    res.sendStatus(200);
  })
  .get('/workbench/storeafile', function (req, res, next) {
    let ref = db.ref(user);
    let stored = ref.child(project);
    let file = fs.readFileSync('./Apollo.jpg', 'base64');
    let fileHash = crypto.createHash('md5').update(req.path).digest("hex");
    stored.set({
      'Apollo-jpg': file
    })
    console.log('stored file:', file);
    res.sendStatus(200);
  })
  // .get('/workbench/readafile', function (req, res, next) {
  //   let ref = db.ref(user);
  //   let stored = ref.child(project);
  //   stored.on("value", function(snapshot) {
  //     //console.log('data is:', snapshot.val()['file']);
  //     let fileData = snapshot.val()['file'];
  //     let buf = Buffer.from(fileData, 'base64');
  //     let type = mime.lookup("/userFiles/Apollo.jpg");
  //
  //     res.contentType(type);
  //     res.send(buf);
  //   }, function (errorObject) {
  //     console.log("The read failed: " + errorObject.code);
  //   });
  // })
  .get(/(.*?)/, function(req, res, next) {
    console.log('in path route');
    let fileHash = crypto.createHash('md5').update(req.path).digest("hex");
    console.log('path is:', filePath);
    let ref = db.ref(user);
    let stored = ref.child(project);
    stored.on("value", function(snapshot) {
      let fileData = snapshot.val()[fileHash];
      let buf = Buffer.from(fileData, 'base64');
      let type = mime.lookup("test.jpg");

      res.contentType(type);
      res.send(buf);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });

module.exports = router;
