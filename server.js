/**
 * File: src/server.js
 * Author: Daniel Carlos Hovadick Félix
 *
 * Configure the node server.
 */

var express  = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var database = require('./config/database.js');
var favicon = require('serve-favicon');

/* Setup. */

app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

// Connect to database:
mongoose.connect(database.url);

// Configure passport:
require('./config/passport')(passport);

// View engine setup:
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

// Express basic set up:
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// required for passport
app.use(session({
  secret: 'dfelix.dcc.ufmg.br/js-e-store',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Load our routes and pass in our app and fully configured passport:
require('./app/routes.js')(app, passport);

// Launch application:
app.listen(port);
console.log('Application listening on port ' + port);
