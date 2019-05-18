let config;


try {
    
    config = require('../config/config.js')
    
} catch {
    
    config = {
        db: {
            connectionString: process.env.MONGO_STRING,
            authenticationDatabase: process.env.MONGO_AUTH_DB,
        },
        secret: process.env.SECRET,
        port: process.env.PORT
    }
    
}


module.exports = config;
