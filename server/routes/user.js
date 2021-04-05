const express = require('express');
const router =  express.Router();
const { check , validationResult} = require('express-validator');
const User = require('../models/user');
const UserAddress = require('../models/useraddress');
const auth = require('../middleware/auth');
var ObjectId = require('mongodb').ObjectID;
const { aggregate } = require('../models/user');

router.get('/',async(req,res)=>{
    try {
        const users = await User.find();
        if(!users)
        {
            return res.status(200).json({
                error:"no users found"
            })
        }
        res.json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error "
        })
    }
})

router.get('/:id',async(req,res)=>{
    try {
         const user =  await  User.findById(req.params.id).select('-password');
         if(!user)
         {
             return res.status(200).json({
                 error:"user not found"
             })
         }
         res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})


router.delete('/',auth,async(req,res)=>{
    try {
         await User.findOneAndRemove({_id:req.user.id});
         res.json({
             msg:"user deleted"
         })
        } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        })
    }
})
 

// admin access
router.put('/:id',[
    
    check('name','name is required').not().isEmpty(),
    check('email','email is required').not().isEmpty()

],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,isAdmin} = req.body;
   const updateduser = {};
     if(name){
         updateduser.name = name
     }
     if(email){
         updateduser.email = email
     }
     if(isAdmin){
         updateduser.isAdmin = isAdmin
     }

    try {
        let user = await User.findById(req.params.id);
        if(user)
        {
           user = await User.findOneAndUpdate(req.params.id,{$set:updateduser},{new:true})
        }
        await user.save();
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        });
    }
})

router.put('/',auth,[
    
    check('name','name is required').not().isEmpty(),
    check('email','email is required').not().isEmpty()

],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,isAdmin} = req.body;
   const updateduser = {};
     if(name){
         updateduser.name = name
     }
     if(email){
         updateduser.email = email
     }
   

    try {
        let user = await User.findById({_id:req.user.id});
        if(user)
        {
           user = await User.findOneAndUpdate({_id:req.user.id},{$set:updateduser},{new:true})
        }
        await user.save();
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg:"server error"
        });
    }
})


router.post('/address',auth,async(req,res)=>{
  
      
      const {shippingaddress} = req.body;
      const add = {};
      add.user = req.user.id;
      
     
      console.log(req.user.id)
     try {
          
            let useradd = await UserAddress.findOne({user:req.user.id});
                 console.log(useradd);
               if(!useradd)
         {
              useradd= new UserAddress(add);
              useradd.shippingaddress.push(shippingaddress);
              await useradd.save();
            
          }
    else{
             useradd.shippingaddress.push(shippingaddress);
             await useradd.save();
    }
       res.status(200).json(useradd)  ;

     } catch (error) {
         console.log(error);
         res.status(500).json({
             msg:"server error"
         })
     }
})



router.get('/address/:id',auth,async(req,res)=>{
  
    
    
   
 
   try {
  
    let add = await UserAddress.findOne({user:req.params.id});
             console.log(add);
 
     res.status(200).json(add)  ;

   } catch (error) {
       console.log(error);
       res.status(500).json({
           msg:"server error"
       })
   }
})

router.delete('/address/:id/:index',auth,async(req,res)=>{
    try {
        let deleteadd = await UserAddress.findOne({user:req.params.id});
         console.log(deleteadd);    
  
         await deleteadd.shippingaddress.splice(req.params.index,1);
     deleteadd.save();
     res.json(deleteadd);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"server error"
        })
    }
})

   router.delete('/:id',auth,async(req,res)=>{
        try {
            let user = await User.findByIdAndRemove(req.params.id);
            user.save(); 
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"server error"
            })
        }
   })


router.put('/admin/:id',auth,async(req,res)=>{
          try {
              const user = await User.findById(req.params.id);
              if(user.isAdmin)
              {
                user.isAdmin = false;
              }else{
                user.isAdmin = true;
              }
            
              await user.save();
              res.json(user)
          } catch (error) {
              console.log(error)
              res.status(500).json({
                  msg:"server error"
              })
          }    
}) 
 


module.exports = router; 