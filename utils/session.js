const session         = require('express-session');
const MongoStore      = require('connect-mongo')(session);
const mongoConnection = require('../database/db.js');
const sessionDb       = mongoConnection.useDb('Users');
const config          = require('../utils/config.js');

const sessionStore    = new MongoStore({ 
    mongooseConnection: sessionDb 
})


const sessionInfo = {
    sessionConfig: session({
        key: 'user_sid',
        secret: config.secret,
        resave: true,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            secure: true,
            expires: 600000 // 10 minutes
        },
        store: sessionStore
    }),

    sessionStore: sessionStore
}


module.exports = sessionInfo;
