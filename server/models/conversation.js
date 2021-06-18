const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    member1:String,
    member2:String
});

module.exports = mongoose.model("conversation",conversationSchema);