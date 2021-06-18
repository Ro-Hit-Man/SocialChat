const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestedTo : String,
    requestedBy : String
});

module.exports = mongoose.model('request',requestSchema);