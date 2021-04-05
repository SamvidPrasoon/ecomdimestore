const express = require('express');
const router  = express.Router();
const Category = require('../models/category')


   router.post('/:id',async(req,res)=>{
           const {category} = req.body;
           

       try {
           const cat = await Category.findOne({_id:req.params.id});
           
            cat.category.push(category);
            await cat.save()
            res.json(cat);
       } catch (error) {
           console.log(error.message);
           res.status(500).json({
               msg:"server error"
           })
       }
   })
   router.delete('/:id/:index',async(req,res)=>{
       try {
        const cat = await Category.findOne({_id:req.params.id});
        await cat.category.splice(req.params.index,1);
        cat.save();
        res.json(cat);
       } catch (error) {
           console.log(error.message);
           res.status(500).json({
               msg:"server error"
           })
       }
   })
 router.get('/:id',async(req,res)=>{
     try {
        const cat = await Category.findOne({_id:req.params.id});
        res.json(cat);
     } catch (error) {
         console.log(error.message)
         res.status(400),json({
             msg:"server error"
         })

     }
 })

module.exports = router;