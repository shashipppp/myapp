const mongoose = require('mongoose');
const Card = require('../models/card');
const Joi = require('joi');
const validationResult = require('express-validator/check');

exports.cards_get_all = (req,res,next)=>{
   
    Card.find().exec().then(docs=>{
        const response = {
            count: docs.length,
            Cards: docs.map(doc=>{
                return {
                    title: doc.title,
                    content: doc.content,
                    summary: doc.summary,
                    created_date: doc.created_date,
                    created_by: doc.created_by,
                    photoPath: doc.photoPath,
                    id: doc._id
                }
            })

        }
        res.status(200).json(response);
    })
    .catch(err=>{});
}

exports.card_post = (req,res,next)=> {
        //const result = validate(req.body);
        
        //if(result.error){
          //  res.send(result.error.details[0].message);
           // return;
       // }

      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
        // const error = new Error('Validation failed, entered data is incorrect.');
         //error.statusCode = 422;
         //throw error;
       //}
       if (!req.file) {
         const error = new Error('No image provided.');
         error.statusCode = 422;
         throw error;
       }
       
       
       

        var newCard = new Card();
        newCard.title = req.body.title;
        newCard.content = req.body.content;
        newCard.summary = req.body.summary;
        newCard.created_by = req.body.created_by;
        newCard.created_date = new Date().toGMTString();
        newCard.imageUrl = req.file.path;
        newCard.parental_view = req.body.parental_view;
        newCard.approved = false;
        newCard.category = req.body.category;
        
        newCard.save((err,inserted_data)=>{
            
            if(err){
                console.log(`err in uploading data ${err}`);
            }else{
                console.log(inserted_data);
                res.status(200).json({message:'Successfully saved the card',data:inserted_data});
            }
        })

     function validate(reqData){
        const schema = {
            title : Joi.string().min(4).required(),
            content : Joi.string().min(30).required()
    };
    return Joi.validate(reqData,schema);
    }   
}

