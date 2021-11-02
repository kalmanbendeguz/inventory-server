const db = require('../config/db');
const Schema = require('mongoose').Schema;

const Item = db.model('Item', {
    code: String,
    name: String,
    category: Schema.Types.ObjectId,
    quantity: Number
});

module.exports = Item;