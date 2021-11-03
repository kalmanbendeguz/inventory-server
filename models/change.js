const db = require('../config/db');
const Schema = require('mongoose').Schema;

const ChangeSchema = new Schema({
    quantity: Number
},
{
    timestamps: true
})

const Change = db.model('Change', ChangeSchema);

module.exports = Change;