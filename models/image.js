const db = require('../config/db');
const Schema = require('mongoose').Schema;
  
const ImageSchema = new Schema({
    item_code: String,
    data: Buffer
});

const Image = db.model('Image', ImageSchema);
  
module.exports = Image