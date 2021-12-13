const db = require('../config/db');

const Image = db.model('Image', {
    code: String,
    image: String,
});

module.exports = Image;