const express = require('express');
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt-as-promised');

// default password = user's name


app.use(session({
  secret: 'as2OaDcE83sLd9aiFk4Px',
  resave: false,
  saveUnitialized: true,
  cookie: {
    secure: false
  }
}))



app.use(function(req, res, next) {
  if(!req.session.user) {
    res.redirect('index.html')
  } else {
    next();
  }
});








module.exports = app;
