const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const card_controller = require('../controllers/cards');
const user_controller = require('../controllers/auth');
const check_auth = require ('../controllers/check-auth')

//const db = "mongodb://shashipppp:shashi3333@ds141674.mlab.com:41674/crud";
const db="mongodb://shashipppp:shashi3333@ds127736.mlab.com:27736/mytest";
mongoose.Promise = global.Promise;

mongoose.connect(db,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Successfully connected to the Mongosee DB: mytest');
    }
});



router.get('/cards', card_controller.cards_get_all);
router.post('/card/post',check_auth, card_controller.card_post);

router.post('/user/signUp', user_controller.user_signup);
router.post('/user/login', user_controller.user_login);


module.exports = router;