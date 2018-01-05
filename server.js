const config = require('./knexfile.js')[process.env.ENVIRONMENT];
  // console.log('Envir: ', process.env.ENVIRONMENT);
const knex = require('knex')(config);
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8001;
const session = require('express-session');
const bcrypt = require('bcryptjs');
const admin = require("firebase-admin");
// const serviceAccount = require("../json/color-palette-picker.json");
const serviceAccount = JSON.parse(process.env.firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-palette-picker-48bf1.firebaseio.com"
});

// const io = require('socket.io')();
//var http = require('http').Server(app);
//var io = require('socket.io')(app);

app.use(function(req, res, next) {
  res.locals.db = admin.database();
  next();
})

// middleware
let morgan = require('morgan');
let bodyParser = require('body-parser');


app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));


// access static resources (images/css) in the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));


// access the templating view files in the 'view folder'
app.set('views', './views');
// use the templating engine ejs
app.set('view engine', 'ejs');


let loginRoute = require('./routes/loginRoute.js');
let signupRoutes = require('./routes/signupRoutes.js');
let projectsRoutes = require('./routes/projectsRoutes.js');
let uploadRoutes = require('./routes/uploadRoutes.js');
let workbenchRoutes = require('./routes/workbenchRoutes.js');
let logoutRoute = require('./routes/logoutRoute.js');
let paletteRoutes = require('./routes/paletteRoutes.js');


// render home page
app.get('/', function(req, res) {
  res.render('home.ejs');
});


// default password = user's name
app.use(session({
  secret: 'as2OaDcE83sLd9aiFk4Px',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(function(req, res, next) {
  console.log('Session is: ', req.session);
  next();
});


app.use(loginRoute);
app.use(signupRoutes);
app.use(paletteRoutes);


app.use(function(req, res, next) {
  if(!req.session.username) {
    console.log('redirecting');
    res.redirect('/')
  } else {
    console.log('not redirecting');
    next();
  }
});


app.use(projectsRoutes);
app.use(uploadRoutes);
app.use(workbenchRoutes);
app.use(logoutRoute);


app.use(function(req, res) {
  res.sendStatus(404);
});


let server = app.listen(port, function() {
  console.log('Listening on port', port);
});

// let io = require('socket.io').listen(server);
//
// io.on('connection', function(socket){
//   socket.join(req.session.username);
//   console.log('****** a user connected ********');
// });


module.exports = app;
