const config = require('../config/config.js') || {
    db: {
        connectionString: process.env.MONGO_CONNECTION_STRING,
        authenticationDatabase: process.env.MONGO_AUTHENTICATION_DATABASE,
    },
    secret: process.env.COOKIE_SECRET,
    port: process.env.PORT
}

module.exports = config;