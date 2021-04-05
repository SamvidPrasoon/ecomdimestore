const mongoose = require('mongoose');


const orderSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        
      },
      orderItems: [
        {
          type:Object,
          required:true
        },
      ],
      shippingAddress: {
         type: String, 
         required: true,
    
      },
      paymentMethod:{
        type:String,
        required:true
      },
    
    
      totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
      },
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paidAt: {
        type: Date,
      },
      isDelivered: {
        type: Boolean,
        required: true,
        default: false,
      },
      deliveredAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  )
  
  module.exports = Orders  = mongoose.model('order',orderSchema);