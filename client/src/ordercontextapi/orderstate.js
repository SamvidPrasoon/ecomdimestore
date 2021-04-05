import React, { useReducer } from 'react';
import OrderContext from './ordercontext';
import OrderReducer from './orderreducer';

import axios from 'axios';
import {
    CREATE_ORDER,
    ALL_ORDERS,
    PER_ORDER,
    GET_USER,
    PAID,
    DELIVERED,
    PER_USERORDER

    
} from '../types'

const OrderState = props=>{


      const initialstate ={

        order:{},
        orders:[],
        user:'',
        status:''
      }

        const [state,dispatch] = useReducer(OrderReducer,initialstate);
        
       const createorder = async(order)=>{
           console.log('called');
           console.log(order)
           try {
            const config = {
                headers:{
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": true,
                    
                }    
            };
            const res = await axios.post('http://localhost:5000/api/order',order,config)
            dispatch({
                type:CREATE_ORDER,
                payload:res.data
            }) 
           } catch (error) {
               console.log(error);
           }
       }
       const getorders = async()=>{
           try {
            const res = await axios.get('http://localhost:5000/api/order/allorders')
            dispatch({
                type:ALL_ORDERS,
                payload:res.data
            }) 
           } catch (error) {
               console.log(error);
           }
       }
       const  perorder = async(id)=>{
        try {
         const res = await axios.get(`http://localhost:5000/api/order/order/${id}`)
         dispatch({
             type:PER_ORDER,
             payload:res.data
         }) 
        } catch (error) {
            console.log(error);
        }
    }
    const  getuser = async(id)=>{
        console.log(id);
        try {
         const res = await axios.get(`http://localhost:5000/api/user/${id}`)
         dispatch({
             type:GET_USER,
             payload:res.data
         }) 
        } catch (error) {
            console.log(error);
        }
    }
    const  paid = async(id)=>{
        console.log(id);
        try {
         const res = await axios.put(`http://localhost:5000/api/order/paid/${id}`)
         dispatch({
             type:PAID,
             payload:res.data
         }) 
        } catch (error) {
            console.log(error);
        }
    }
    const  deliver = async(id)=>{
        console.log(id);
        try {
         const res = await axios.put(`http://localhost:5000/api/order/deliver/${id}`)
         dispatch({
             type:DELIVERED,
             payload:res.data
         }) 
        } catch (error) {
            console.log(error);
        }
    }
    const userorder=async(id)=>{
        try {
            const res = await axios.get(`http://localhost:5000/api/order/userorder/${id}`);
            dispatch({
                type:PER_USERORDER,
                payload:res.data
            })
        } catch (error) {
            console.log(error)
        }
    }

       return (
           <OrderContext.Provider
              value={
                  {
                      createorder,
                      getorders,
                      perorder,
                      getuser,
                      paid,
                      deliver,
                      userorder,
                     orderstate:state 
                  }
              }
           
           
           
           >
           
           {props.children}
           
           </OrderContext.Provider>
       )

}

export default OrderState;