const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);
const express = require('express');
const router = express.Router();


router
  .get('/logout', function(req, res, next) {
    delete req.session.username;

    res.redirect('/');
  })






module.exports = router;
