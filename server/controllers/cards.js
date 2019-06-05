const mongoose = require('mongoose');
const Card = require('../models/card');
const Joi = require('joi');
const validationResult = require('express-validator/check');

exports.cards_get_all = (req,res,next)=>{
   
    Card.find().select({card_type:1,card_summary:1,imageUrl:1}).exec().then(docs=>{
        const response = {
            count: docs.length,
            Cards: docs.map(doc=>{
                return {
                    type: doc.card_type,
                    summary: doc.card_summary,
                    photoPath: doc.imageUrl,
                    id: doc._id
                }
            })

        }
        res.status(200).json(response);
        //console.log(response);
    })
    .catch(err=>{ throw err});
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
        newCard.imageUrl = req.file.filename;
        newCard.parental_view = req.body.parental_view;
        newCard.approved = false;
        newCard.category = req.body.category;
        
        console.log('req.file: '+req.file.filename);
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

exports.getCard_byType = (req,res,next)=>{
    const card_id = req.get('selected_card');
    const color = req.get('selected_color');
    
    Card.findOne({_id:card_id}).select({design:{$elemMatch:{"color":color}}}).exec()
         .then((doc)=>{console.log(doc);res.status(200).json(doc.design[0]); })
         .catch(err=>console.log('error in fecthing white color '+err));
}

