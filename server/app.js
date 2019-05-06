const express = require('express');
const app = express();
const config = require('../utils/config.js');
const middleware = require('../utils/middleware.js');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const UserController = require('../controllers/user.controller.js');
const HomeController = require('../controllers/home.controller.js');



// set app port
app.set('port', config.port);


// morgan for logging
app.use(morgan('dev'));


// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));


// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());


// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));


// cookie checker app middleware
app.use(middleware.cookieChecker);


// set up main routes
app.use('/', HomeController)
app.use('/', UserController);


// route not found middleware
app.use(middleware.routeNotFound);


module.exports = app;
