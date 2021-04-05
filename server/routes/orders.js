const express = require('express');
const router =  express.Router();
const { check , validationResult} = require('express-validator');
const Order = require('../models/orders')
const auth = require('../middleware/auth');

//new order

router.post('/',auth,async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    } = req.body;
          

       const order = {};
       order.orderItems = orderItems;
       order.user = req.user.id;
       order.shippingAddress = shippingAddress;
       order.paymentMethod = paymentMethod
       order.totalPrice = totalPrice;
       
       try {
          const createorder = new Order(order);
          await createorder.save();
          res.status(200).json(createorder);
       } catch (error) {
           console.log(error);
           res.status(500).json({
               msg:"server error"
           })
       }
})

// all orders

   router.get('/allorders',async(req,res)=>{
       try {
           const orders =  await Order.find()
           res.json(orders);
       } catch (error) {
           console.log(error);
           res.status(500).json({
               msg:"server error"
           })
       }
   })
// get order by id
router.get('/order/:id',async(req,res)=>{
    try {
        const order =  await Order.findById(req.params.id);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"server error"
        })
    }
})

//get logged in users orders

 router.get('/userorder/:id',auth,async(req,res)=>{
     try {
         const orders = await Order.find({user:req.params.id});
         res.json(orders);
     } catch (error) {
         console.log(error);
         res.status(500).json({
             msg:"server error"
         })
     }
 })


 // is delivered
 router.put('/deliver/:id',auth,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order.isDelivered)
        {
          order.isDelivered = false;
        }else{
          order.isDelivered = true;
        }
      
        await order.save();
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"server error"
        })
    }    
}) 
  
 //is Paid
 router.put('/paid/:id',auth,async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order.isPaid)
        {
          order.isPaid = false;
        }else{
          order.isPaid = true;
        }
      
        await order.save();
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:"server error"
        })
    }    
}) 












module.exports = router;