import React, { useReducer } from 'react';
import AddressContext from './addresscontext';
import AddressReducer from './addressreducer';
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';
import {
    GET_ADDRESS,
    POST_ADDRESS
} from '../types'

const AddressState = props=>{


      const initialstate ={

        address:[],
        newaddress:'',
        errors:''
      }

        const [state,dispatch] = useReducer(AddressReducer,initialstate);
        


         const addaddress = async(formdata)=>{
           // console.log(formdata)
            if(localStorage.token)
            {
                setAuthToken(localStorage.token);
            }
              try {
                const config = {
                    headers:{
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": true,
                        
                    }    
                };

                const res = await axios.post('http://localhost:5000/api/user/address',formdata,config);
                // console.log(res.data)
                dispatch({
                    type:POST_ADDRESS,
                    payload:res.data
                })
                dispatch({
                    type:GET_ADDRESS,
                    payload:res.data.shippingaddress
                })
              } catch (error) {
                  console.log(error.message);
              }




         }



         const getaddress = async(id)=>{
            // console.log(formdata)
             if(localStorage.token)
             {
                 setAuthToken(localStorage.token);
             }
               try {
                 
 
                 const res = await axios.get(`http://localhost:5000/api/user/address/${id}`);
                 
               
                 dispatch({
                     type:GET_ADDRESS,
                     payload:res.data.shippingaddress
                 })
               } catch (error) {
                   console.log(error.message);
               }
 
 
 
 
          }
  
       const deleteaddress = async(id,index)=>{
            try {
                const res = await axios.delete(`http://localhost:5000/api/user/address/${id}/${index}`);
                dispatch({
                    type:GET_ADDRESS,
                    payload:res.data.shippingaddress
                })
           
            } catch (error) {
                console.log(error);
            }
 


       }

       return (
           <AddressContext.Provider
              value={
                  {
                      addaddress,
                      getaddress,
                      deleteaddress,
                     addressstate:state 
                  }
              }
           
           
           
           >
           
           {props.children}
           
           </AddressContext.Provider>
       )

}

export default AddressState;