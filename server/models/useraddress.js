const mongoose = require("mongoose");
const userAddressSchema = new mongoose.Schema({
  
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
            },
        shippingaddress:[
            {
            type:String
            }
        ]
    
    
    
  
  
  
    
   

      
})
module.exports = UserAddress = mongoose.model('useraddress',userAddressSchema);