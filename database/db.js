const config = require('../utils/config.js');
const mongoose = require('mongoose');
const mongoBaseUrl = `${config.db.connectionString}/${config.db.authenticationDatabase}`;

mongoose.set('useCreateIndex', true)
const mongoDB = mongoose.createConnection(mongoBaseUrl, { useNewUrlParser: true });



module.exports = mongoDB;