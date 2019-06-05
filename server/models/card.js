const mongoose = require('mongoose');
const schema = mongoose.Schema;

const card_Schema = new schema({
    card_type: String,
    card_summary:String,
    imageUrl:String,
    design:Array
});

module.exports = mongoose.model('card',card_Schema,'cards')