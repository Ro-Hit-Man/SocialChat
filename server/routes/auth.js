const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/user');

router.post('/loginUser',bodyParser.json(), async (req,res)=>{
    try {
        const user = await User.findOne({ googleId : req.body.googleId });
        if(!user){
          res.send({status:'404', data:"user not found"});
        }else{
          res.send({status:'201', data:user});
        }
      } catch (err) {
        res.send({status:'500', data:err});
      }
});

router.post('/registerUser',bodyParser.json(), async (req,res)=>{
    try {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          googleId: req.body.googleId,
          img: req.body.img,
        });
        const user = await newUser.save();
        res.send({status:'201', data:user})
      } catch (err) {
        res.send({status:'500', data:err})
      }
});

module.exports = router;