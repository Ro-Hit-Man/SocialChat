const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const Request = require('../models/request');
const Message = require('../models/message');
const Conversation = require('../models/conversation');

router.post('/getUID',bodyParser.json(), async (req,res)=>{
  try{
    const user = await User.findOne({googleId : req.body.gid});
    res.send({status:'201', data:user._id});
  } catch (err) {
    res.send({status:'500', data:err});
  }
});

router.post('/getUsers',bodyParser.json(), async (req,res)=>{
    try {
        const user = await User.find({});
        res.send({status:'201', data:user});
      } catch (err) {
        res.send({status:'500', data:err});
      }
});

router.post('/getUser',bodyParser.json(), async (req,res)=>{
  try {
      const user = await User.findById({_id:req.body.id});
      res.send({status:'201', data:user});
    } catch (err) {
      res.send({status:'500', data:err});
    }
});

router.post('/request',bodyParser.json(),async (req,res)=>{
    try{
      const user = await User.findOne({googleId : req.body.by});
      var by = user._id;
      const newRequest = new Request({
        requestedTo : req.body.to ,
        requestedBy : by
      });
      await newRequest.save();
      res.send({status:'201', data: true})
    }catch(err){
      res.send({status:'500', data:err});
    }
});

router.post('/getRequested',bodyParser.json(), async (req,res)=>{
  try{
    const user = await User.findOne({googleId:req.body.gid});
    var uid = user._id;
    const request = await Request.find({requestedBy : uid});
    if(!request){
    res.send({status:'201', data:"No requests"});
    }else{
    res.send({status:'201', data:request});
    }
  } catch (err) {
    console.log(err);
    res.send({status:'500', data:err});
  }
});

router.post('/gotRequested',bodyParser.json(), async (req,res)=>{
  try{
    const user = await User.findOne({googleId:req.body.gid});
    var uid = user._id;
    const request = await Request.find({requestedTo : uid});
    if(!request){
    res.send({status:'201', data:"No requests"});
    }else{
    res.send({status:'201', data:request});
    }
  } catch (err) {
    console.log(err);
    res.send({status:'500', data:err});
  }
});

router.post('/discard',bodyParser.json(), async (req,res)=>{
    try{
      await Request.findOneAndDelete({requestedTo:req.body.id});
      res.send({status:201});
    } catch(err){
      res.send({status:'500', data:err});
    }
});

router.post('/deny',bodyParser.json(), async (req,res)=>{
  try{
    await Request.findOneAndDelete({requestedBy:req.body.id});
    res.send({status:201});
  } catch(err){
    res.send({status:'500', data:err});
  }
});

router.post('/accept',bodyParser.json(), async (req,res)=>{
  try{
    const user = await User.findOne({googleId:req.body.gid});
    var uid = user._id;
    const newConversation = new Conversation({
        member1: uid,
        member2: req.body.id
    });
    const conversation = await newConversation.save();
    res.send({status:'201', data:conversation })
  }catch(err){
    res.send({status:'500', data:err});
  }
});

router.post('/getConversation1',bodyParser.json(), async (req,res)=>{
  try{
      const user = await User.findOne({googleId:req.body.gid});
      var uid = user._id;
      const conversation = await Conversation.find({member1 : uid});
      if(!conversation){
        res.send({status:'201', data:"No conversation"});
      }else{
        res.send({status:'201', data:conversation});
      }
    } catch (err) {
        console.log(err);
        res.send({status:'500', data:err});
    }
});

router.post('/getConversation2',bodyParser.json(), async (req,res)=>{
  try{
      const user = await User.findOne({googleId:req.body.gid});
      var uid = user._id;
      const conversation = await Conversation.find({member2 : uid});
      if(!conversation){
        res.send({status:'201', data:"No conversation"});
      }else{
        res.send({status:'201', data:conversation});
      }
    } catch (err) {
      console.log(err);
        res.send({status:'500', data:err});
    }
});

router.post('/sendMessage', bodyParser.json(), async (req,res)=>{
  try{
      const user = await User.findOne({googleId:req.body.gid});
      var by = user._id;
      const newMessage = new Message({
          sendBy : by,
          conversationId : req.body.cid,
          message : req.body.message
      });
      await newMessage.save();
    res.send({status:'201', data:newMessage});
  }catch(err){
    res.send({status:'500', data:err});
  }
});

router.post('/messages', bodyParser.json(), async (req,res)=>{
  try{
      const messages = await Message.find({conversationId:req.body.cid});
      res.send({status:'201' , data:messages});
  }catch(err){
    res.send({status:'500', data:err});
  }
});

module.exports = router;