const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user_schema = new schema({

    username: String,
    password: String,
    email: String,
    institute: String
});

module.exports = mongoose.model('user',user_schema,'users');