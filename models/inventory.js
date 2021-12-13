const db = require('../config/db');

const Inventory = db.model('Inventory', {
    key: String,
    value: String,
});

module.exports = Inventory;