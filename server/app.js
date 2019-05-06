const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// utils
const config = require('../utils/config.js');
const middleware = require('../utils/middleware.js');
const session = require('../utils/session.js');

// controllers/routes
const HomeController = require('../controllers/home.controller.js');
const UserController = require('../controllers/user.controller.js');




// set view engine for templating
app.set('view engine', 'ejs');


// set app port
app.set('port', config.port);


// morgan for logging
app.use(morgan('dev'));


// allows us to easily parse the request body
app.use(bodyParser.urlencoded({ extended: true }));


// allow us to easily parse session cookies
app.use(cookieParser());


// allows us to track logged in user across sessions
app.use(session);


// helps keep session cookie clean
app.use(middleware.cookieChecker);


// set up main routes
app.use('/', HomeController)
app.use('/', UserController);


// 404 middleware
app.use(middleware.routeNotFound);




module.exports = app;