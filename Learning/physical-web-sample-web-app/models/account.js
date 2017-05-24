const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

/*
 * Mongoose model for user account
 */
const Account = new Schema({
    username: String,
    password: String
});

// Use passport's local login service 
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
