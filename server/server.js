const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const app =  express();
const cors = require('cors');
dotenv.config();
connectdb();
app.use(cors());

app.use('/uploads',express.static(path.join(__dirname,'../uploads')))

app.use(express.json({limit: '50mb'}));
const user = require('./routes/user');
app.use('/api/user',user);
const auth = require('./routes/auth');
app.use('/api/auth',auth);

const products = require('./routes/products');
app.use('/api/product',products);
const order = require('./routes/orders'); 
app.use('/api/order',order) 
const upload = require('./routes/uploadroutes'); 
app.use('/api/upload',upload);
const  category = require('./routes/category'); 
app.use('/api/category',category);
 
  

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT} `);
}) 
    
   