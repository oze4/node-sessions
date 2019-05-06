const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const mongoConnection = require('../database/db.js');
const usersDatabase = mongoConnection.useDb('Users');




const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})


// salt password before saving
User.pre('save', function (next) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})


// validate password
User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}




module.exports = usersDatabase.model('Users', User, 'users'); // (database, schema, collection)
