import React,{useReducer} from 'react';
import ProductContext from './productcontext'
import ProductReducer from './productreducer'

import axios from 'axios';

import {
  GET_PRODUCTS,
  PRODUCT_ERROR,
  PER_PRODUCT,
  CATEGORY_PRODUCT,
  CART_PRODUCTS,
  GET_USER_ADDRESS,
  ADD_PRODUCT,
  UPDATED_PRODUCT,
  DELETED_PRODUCT,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY,
  ADD_REVIEW,
  SEARCHED,
  NO_SEARCH
  
 
} from '../types'

const ProductState = props=>{

      const initialstate = {
          products:[],
          categoryproducts:[],
          product:'',
          cart:[],
          usercartaddress:'',
          
          loading:true,
          errors:'',
          addedproduct:'',
          updatedproduct:'',
          deletedproduct:'',
          category:{},
          addcategory:{},
          reviews:'',
          loading2:true,
          search:[],
          loading3:true,
          found:''


      }

 
const [state,dispatch] = useReducer(ProductReducer,initialstate);

const getproducts = async()=>{
    try {
        
        const res = await axios.get('http://localhost:5000/api/product/');
        dispatch({
            type:GET_PRODUCTS,
            payload:res.data
        })
   
       } catch (err) {
           console.log(err.message)
           dispatch({
               type:PRODUCT_ERROR,
               
           })
    }
}
const getperproduct = async(id)=>{
    
    try {
         
        const res = await axios.get(`http://localhost:5000/api/product/${id}`);
        dispatch({
            type:PER_PRODUCT,
            payload:res.data
        })
     
   
       } catch (err) {
           console.log(err.message)
           const e = err.response.data.msg
           dispatch({
               type:PRODUCT_ERROR,
               payload:e               
           })
    }
}

const getcartproduct = async(id,qty,address)=>{
    
    try {
         
        const res = await axios.get(`http://localhost:5000/api/product/cart/${id}`);
        console.log(qty);
        
        res.data.qty = qty;
       
        console.log(res.data);
        dispatch({
            type:CART_PRODUCTS,
            payload:res.data
        })
   
       } catch (err) {
           console.log(err.message)
           const e = err.response.data.msg
           dispatch({
               type:PRODUCT_ERROR,
               payload:e               
           })
    }
}
const getaddresscart = async(address)=>{
   
    try {
        
        dispatch({
            type:GET_USER_ADDRESS,
            payload:address
        })
    } catch (error) {
        console.log(error);
    }
}
const deleteaddresscart = async()=>{
   
    try {
        
        dispatch({
            type:GET_USER_ADDRESS,
            payload:''
        })
    } catch (error) {
        console.log(error);
    }
}
const categoryproduct = async(category)=>{
    
    try {
         
        const res = await axios.get(`http://localhost:5000/api/product/category/${category}`);
        dispatch({
            type:CATEGORY_PRODUCT,
            payload:res.data
        })
   
       } catch (err) {
           console.log(err.message)
           const e = err.response.data.msg
           dispatch({
               type:PRODUCT_ERROR,
               payload:e               
           })
    }
}
const add = async(formdata)=>{
    console.log('called');
    console.log(formdata);
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        }
        const res = await axios.post('http://localhost:5000/api/product',formdata,config)
            dispatch({
                type:ADD_PRODUCT,
                payload:res.data
            })
    } catch (error) {
        console.log(error);
    }
}
const update = async(formdata,id)=>{
    console.log('called');
    console.log(formdata);
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        }
        const res = await axios.put(`http://localhost:5000/api/product/${id}`,formdata,config)
            dispatch({
                type:UPDATED_PRODUCT,
                payload:res.data
            })
    } catch (error) {
        console.log(error);
    }
}
const deleteproduct = async(id)=>{
 
    try {
      
        const res = await axios.delete(`http://localhost:5000/api/product/${id}`)
           dispatch({
               type:DELETED_PRODUCT,
               payload:res.data
           })
    } catch (error) {
        console.log(error);
    }
}

const addcat = async(id,formdata)=>{
    console.log(formdata)
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        }
        const res = await axios.post(`http://localhost:5000/api/category/${id}`,formdata,config)
        dispatch({
            type:ADD_CATEGORY,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
    }
}
const cat = async(id)=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/category/${id}`)
        dispatch({
            type:GET_CATEGORY,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
    }
}
const deletecat = async(id,index)=>{
    try {
        const res = await axios.delete(`http://localhost:5000/api/category/${id}/${index}`);
        dispatch({
            type:DELETE_CATEGORY,
            payload:res.data
        })
    } catch (error) {
        console.log(error);
    }
}
const addrev = async(formdata,id)=>{
    console.log(formdata)
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        }
        const res = await axios.post(`http://localhost:5000/api/product/product/${id}/review`,formdata,config)
        dispatch({
            type:ADD_REVIEW,
            payload:res.data
        })
    } catch (error) {
        console.log(error)
        const e = error.response.data.msg
        console.log(e)
        dispatch({
            type:ADD_REVIEW,
            payload:e
        })
    }
}
const search = async(key)=>{
    try {
        
        const res = await axios.get(`http://localhost:5000/api/product/search/${key}`);
        console.log(res.data)
        if(res.data.length===0)
        {
            dispatch({
                type:NO_SEARCH,
                payload:'not found'
            })
        }
        dispatch({
            type:SEARCHED,
            payload:res.data
        })
   
       } catch (err) {
           console.log(err.message)
           dispatch({
               type:PRODUCT_ERROR,
               
           })
    }
}

const emptyfound =()=>{
    dispatch({
       
            type:NO_SEARCH,
            payload:''
            
     
    })
}
    return (

        <ProductContext.Provider
        
           value={
               {
                   getproducts,
                   getperproduct,
                   categoryproduct,
                   getcartproduct,
                   getaddresscart,
                   deleteaddresscart,
                   add,
                   update,
                   deleteproduct,
                   addcat,
                   deletecat,
                   cat,
                   addrev,
                   search,
                   emptyfound,
                   productstate:state
               }
           }
         
        >
        
        
        {props.children}
        </ProductContext.Provider>
    )





}
export default ProductState;