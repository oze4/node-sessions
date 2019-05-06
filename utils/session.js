const session = require('express-session');
const config = require('../utils/config.js');


const sessionConfig = session({
    key: 'user_sid',
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000 // 10 minutes
    }
});


module.exports = sessionConfig;