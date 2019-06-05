const User = require('../models/user');
const Card = require('../models/card');

exports.get_cart = async (req,res,next)=> {

    try{
    const user_id = req.get('user_id');

    const carts = await User.findOne({_id:'5ca89c317d55eb27988344c9'}).select({cart:1,_id:0}).exec();
    const carts_array = carts.cart; 
    const response = { 
                       count: carts_array.length,
                       products: []};
    console.log(carts_array.length);
    let iterate = 0;

     let wait1 = await new Promise ((resolve,reject)=>{

        carts_array.forEach( async(element) => {
        
            let design = await Card.findOne({_id:element.selected_card}).select({design:{$elemMatch:{"color":element.color}},_id:0}).exec();
            console.log(`${design.design[0].color}`);
            cart_item = design.design[0];
            let output = {
             img_uploaded: element.img_uploaded,
             sample_img: element.sample_img,
             main_img:cart_item.main_img,
             color:cart_item.color,
             price:cart_item.price,
             description:cart_item.description
         }
     
         response.products.push(output);
         iterate = iterate +1;
         if(iterate == carts_array.length){ resolve(response); }
         
         })
     }) 

    Promise.all([wait1]).then(resp=>{res.status(200).json(resp); console.log(resp[0].products);})
    //setTimeout(()=>{res.status(200).json(response);console.log(response);},5000);
   // res.status(200).json(response); console.log(response);
    }

    catch(err){
        console.log('asyn error '+err);
    }
    
   
}