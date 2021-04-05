const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    
      category:[
          {
              type:String,
              required:true
          }
      ]




})

module.exports = Category = mongoose.model('category',categorySchema);