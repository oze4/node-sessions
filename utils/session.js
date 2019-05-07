const session = require('express-session');
const config = require('../utils/config.js');
const MongoStore = require('connect-mongo')(session);
const mongoConnection = require('../database/db.js');
const sessionDb = mongoConnection.useDb('Users');


const sessionStore = new MongoStore({ 
    mongooseConnection: sessionDb 
});


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

    sessionStore: sessionStore
}



module.exports = sessionInfo;