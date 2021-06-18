const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sendBy : String,
    conversationId : String,
    message : String
},
{ timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);