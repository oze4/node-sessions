const mongoose = require('mongoose');
const config = require('./config/config.js');

const mongoBaseUrl = `${config.db.connectionString}/${config.db.authenticationDatabase}`;
const mongoDB = mongoose.createConnection(mongoBaseUrl, { useNewUrlParser: true });


module.exports = mongoDB;