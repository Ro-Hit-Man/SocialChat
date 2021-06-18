const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://myhome:myhome@cluster0.zj3m5.mongodb.net/chat?retryWrites=true&w=majority',{useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log("Database Connected");
    }
    else{
        console.log(err);
    }
});

app.use('/auth', authRoutes);
app.use('/', userRoutes);

app.listen(4000,()=>{
    console.log("App is listning at port 4000");
});