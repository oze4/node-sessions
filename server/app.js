const express = require('express');
const app = express();
const config = require('../config/config.js');
const middleware = require('../utils/middleware.js');
const session = require('express-session');
const morgan = require('morgan');

const UserController = require('../controllers/user.controller.js');
const HomeController = require('../controllers/home.controller.js');


// set up main routes
app.use('/', HomeController)
app.use('/', UserController);

// set app port
app.set('port', config.port);

// morgan for logging
app.use(morgan('dev'));

// initialize express-session to allow us track the logged-in user across sessions.

app.use(session({
    key: 'user_sid',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600 //600000
    }
}));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
//app.use(middleware.cookieChecker);

// route for handling 404 requests(unavailable routes)
app.use(middleware.routeNotFound);



module.exports = app;