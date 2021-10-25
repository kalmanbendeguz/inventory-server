const db = require('../config/db');

const Item = db.model('Item', {
    code: String,
    name: String,
    quantity: Number
});

module.exports = Item;