const express        = require('express');
const app            = express();
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const config         = require('../utils/config.js');
const middleware     = require('../utils/middleware.js');
const session        = require('../utils/session.js');
const HomeController = require('../controllers/home.controller.js');
const UserController = require('../controllers/user.controller.js');
const helmet         = require('helmet');


// tell express we are sitting behind a proxy - this is so we can,
// still use secure cookies. This will trust the first proxy.
app.enable('trust proxy', 1);

// set view engine for templating
app.set('view engine', 'hbs')

// set app port
app.set('port', config.port);

// morgan for logging
app.use(morgan('dev'));

// secure server headers with helmet
app.use(helmet());

// allows us to easily parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

// allow us to easily parse session cookies
app.use(cookieParser());

// allows us to track logged in user across sessions
app.use(session.sessionConfig);

// helps keep session cookie clean
// app.use(middleware.cookieChecker);

// set up main routes
app.use('/', HomeController)
app.use('/', UserController);

// 404 middleware
app.use(middleware.routeNotFound);


module.exports = app;
