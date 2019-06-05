const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user_schema = new schema({

    username: String,
    password: String,
    email: String,
    cart:[]
});

module.exports = mongoose.model('user',user_schema,'users');