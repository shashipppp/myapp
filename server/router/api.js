const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const card_controller = require('../controllers/cards');
const user_controller = require('../controllers/auth');
const check_auth = require ('../controllers/check-auth');
const cart_controller = require('../controllers/cart');
const winston_log = require('../router/winston');

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



router.get('/cards',winston_log, card_controller.cards_get_all);
router.post('/card/post',winston_log,check_auth, card_controller.card_post);

router.post('/user/signUp',winston_log, user_controller.user_signup);
router.post('/user/login',winston_log, user_controller.user_login);

router.get('/design',winston_log,card_controller.getCard_byType);

router.get('/cart',winston_log ,cart_controller.get_cart);


module.exports = router;