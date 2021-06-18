const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    googleId : String,
    img : String,
    email : String
},
{ timestamps: true }
);

module.exports = mongoose.model("user", userSchema);