const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inventory', { useNewUrlParser: true });

module.exports = mongoose;