const db = require('../config/db');
const Schema = require('mongoose').Schema;

const ItemSchema = new Schema({
    code: String,
    name: String,
    category: Schema.Types.ObjectId,
    quantity: Number
},
{
    timestamps: true
})

const Item = db.model('Item', ItemSchema);

module.exports = Item;