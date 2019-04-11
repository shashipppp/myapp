const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

exports.user_signup = (req,res,next)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    username = req.body.username;
    email = req.body.email;
    institute = req.body.institute;
    password = req.body.password;

    bcrypt.hash(password,12).then(hashPwd=>{
      const new_user = new User({
        username:username,
        email:email,
        password:hashPwd,
        institute:institute
      });
      return new_user.save();
    })
    .then(result=>{
      res.status(201).json({"message":"User created", "UserID":"result._id"})
    })
    .catch(err=>{
      if(!err.statusCode){
                err.statusCode = 500;
      }
      next(err);
    });
};

exports.user_login = (req,res,next)=>{

  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({email:email},(err,loaded_user)=>{
    if(err){
      return res.status(401).json({message:'given username is not registered'});
    }
    return bcrypt.compare(password, loaded_user.password)
             .then(equal=>{
                     if(!equal){
                       return res.status(401).json({message:'Password given is incorrect'});
                     }
                    const token = jwt.sign({
                      email:loaded_user.email,
                      userid: loaded_user._id.toString(),
                      username:loaded_user.username
                    }, 'this is the screatekey HMAC',{ expiresIn:'1h'});

                    return res.status(200).json({Token: token, USERID:loaded_user._id.toString()});
             })
             .catch(err=>{console.log('login '+err)})
 });
};