const express = require('express');
const router =  express.Router();
const { check , validationResult} = require('express-validator');
const Product = require('../models/product');
const auth = require('../middleware/auth');
const User = require('../models/user');
const multer = require('multer');
//create  product
 
// const storage = multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,'../../client/public/uploads');
//     },
//     filename:(req,file,callback)=>{
//         callback(null,file.originalname)
//     }
// })
  
//  const upload = multer({storage:storage})
  router.post('/',auth,async(req,res)=>{
      const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        numReviews,
        description



      } = req.body; 
     let product ={};
           product.user = req.user.id;
           product.name = name;
           product.price = price;
           product.image = image;
           product.brand = brand;
           product.category = category;
           product.countInStock = countInStock;
           product.numReviews = numReviews;
           product.description = description; 
  
    try {
        product  = new Product(product);
        await product.save();
         res.json(product);
      } catch (error) {
          console.log(error.message);
          res.status(500).json({
              msg:"server error"
          });
      }
  })

//update product

router.put('/:id',auth,async(req,res)=>{
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews,
      description



    } = req.body; 
  
         

  try {
        let product = await Product.findById(req.params.id);
        if(product)
        {
            product.user = req.user.id;
            product.name = name;
            product.price = price;
            product.image = image;
            product.brand = brand;
            product.category = category;
            product.countInStock = countInStock;
           
            product.description = description;
         await product.save();
         res.json(product); 
        }
        else{
            res.status(200).json({
                msg:"product not found"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        });
    }
})

// delete product

router.delete('/:id',auth,async(req,res)=>{
             try {
               const product =   await Product.findByIdAndRemove(req.params.id);
                res.json(product)
             } catch (error) {
                 console.log(error.message);
                 res.status(500).json({
                     msg:"server error"
                 })
             }
})

 // get single product
   router.get('/:id',async(req,res)=>{
       try {
           let product = await Product.findById(req.params.id);
           if(!product)
           {
               return res.status(200).json({
                   msg:"product not found"
               })
           }
           res.json(product);
       } catch (error) {
           console.log(error.message);
           res.status(500).json({
               msg:"server error"
           })
       }
   })
   // get into cart
   router.get('/cart/:id',async(req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
        if(!product)
        {
            return res.status(200).json({
                msg:"product not found"
            })
        }
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})
 //get all products on basis of category

 router.get('/category/:category',async(req,res)=>{
    try {
        let product = await Product.find({category:req.params.category});
        if(!product)
        {
            return res.status(200).json({
                msg:"products not found"
            })
        }
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})


//new review 
router.post('/product/:id/review',auth,async(req,res)=>{
    const{rating,comment}=req.body;
    try {
       let user = await User.findById(req.user.id);
       let product = await Product.findById(req.params.id);
     
       if(product)
       { 
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user.id.toString()
          )
        
          if(alreadyReviewed)
          {
            return   res.status(400).json({
                  msg:"product has been already reviewed"
              })
          }
        
        let review = {}
         review.user = req.user.id;
         review.rating = Number(rating);
         review.comment = comment;
        

          product.reviews.push(review);
          product.numReviews = product.reviews.length

          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length
      
          await product.save()
          res.status(201).json({ message: 'Review added' })





       } 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})


// get all product

router.get('/',async(req,res)=>{
    try {
        const products = await Product.find()

        res.json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})


//search products
router.get('/search/:key',async(req,res)=>{
    try {
        const key = req.params.key;
        const products = await Product.find({name:{$regex:key,$options:"$i"}})

        res.json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})



module.exports = router; 