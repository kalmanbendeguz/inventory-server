const db = require('../config/db');
const Schema = require('mongoose').Schema;

const Category = db.model('Category', {
    name: String,
    parent_category: Schema.Types.ObjectId,
    subcategories: [Schema.Types.ObjectId],
    items: [Schema.Types.ObjectId]
});

module.exports = Category;