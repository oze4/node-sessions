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

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use(middleware.cookieChecker);
/*app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};

// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/user/login');
});
*/

// set up main routes
app.use('/', HomeController)
app.use('/', UserController);


// route for handling 404 requests(unavailable routes)
//app.use(middleware.routeNotFound);
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});



module.exports = app;