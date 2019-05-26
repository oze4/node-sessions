const session         = require('express-session');
const MongoStore      = require('connect-mongo')(session);
const mongoConnection = require('../database/db.js');
const sessionDb       = mongoConnection.useDb('Users');
const config          = require('../utils/config.js');


const sessionInfo = {
    sessionConfig: session({
        key: 'user_sid',
        secret: config.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000 // 10 minutes
        },
        store: sessionStore
    }),

    sessionStore: new MongoStore({ 
        mongooseConnection: sessionDb 
    })
}


module.exports = sessionInfo;
