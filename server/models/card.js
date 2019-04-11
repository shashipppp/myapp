const mongoose = require('mongoose');
const schema = mongoose.Schema;

const card_Schema = new schema({
    title: String,
    content:String,
    summary:String,
    created_date:String,
    created_by:String,
    category:String,
    approved:Boolean,
    parental_view:Boolean,
    imageUrl:String
});

module.exports = mongoose.model('card',card_Schema,'cards')