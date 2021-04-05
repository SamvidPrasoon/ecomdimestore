import React,{useReducer} from 'react';
import AuthReducer from './authreducer';
import AuthContext from './authcontext';
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    ALL_USERS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    STATUS,
    DELETE_USER
    
}from '../types'

const AuthState = props=>
{

     const initialstate = {
            token:localStorage.getItem('token'),
            isAuthenticated:false,
            loading:true,
            user:null,
            users:[],
            error:'',
            status:'',
            deleteduser:''

     }
    // console.log(initialstate);
   const [state,dispatch] = useReducer(AuthReducer,initialstate);

    //load user
     const loaduser = async()=>{
          
            if(localStorage.token)
            {
                setAuthToken(localStorage.token)
            }
         
            try {
                const res = await axios.get('http://localhost:5000/api/auth/');
                console.log(res.data);
                dispatch({
                    type:USER_LOADED,
                    payload:res.data
                })
               } catch (error) {
                   dispatch({
                       type:AUTH_ERROR
                   })
               }

     }
      // get all users 
      const allusers= async()=>{
          try {
              const res = await axios.get('http://localhost:5000/api/user')
              dispatch({
                type:ALL_USERS,
                payload:res.data
            })
          } catch (error) {
              console.log(error)
          }
      }  
 

    // register user
    const register = async(formdata)=>{
        //console.log(name,email,password);
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        };
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signin',formdata,config);
            console.log(res.data);
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            
         } catch (err) {
             //console.log(err.response);
           const errors = err.response.data.errors;
           dispatch({
            type:REGISTER_FAIL,
             payload:errors
         })
             dispatch({
                 type:CLEAR_ERRORS
             })
                           
        }
    }
    // login user
    const login = async(formdata)=>{
        //console.log(name,email,password);
        const config = {
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": true,
                
            }    
        };
        
        try {
            const res = await axios.post('http://localhost:5000/api/auth/',formdata,config);
            console.log(res.data);
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            
         } catch (err) {
             //console.log(err.response);
             if(err)
             {
                const errors = err.response.data.errors;
                dispatch({
                    type:LOGIN_FAIL,
                     payload:errors
                 })
                   
            }
            dispatch({
                type:CLEAR_ERRORS
            }) 
     
                           
        }
    }
    
    //logout user

    const logout = async()=>{
        dispatch({
            type:LOGOUT
        })
    }
    const status = async(id)=>{
        try {
            const res = await axios.put(`http://localhost:5000/api/user/admin/${id}`);
            dispatch({
                type:STATUS,
                payload:res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
     const deleted = async(id)=>{
         try {
             const res= await axios.delete(`http://localhost:5000/api/user/${id}`)
             dispatch({
                 type:DELETE_USER,
                 payload:res.data
             })
         } catch (error) {
              console.log(error)
         }
     }  

  return (
      <AuthContext.Provider
        value={
            {
                register,
                loaduser,
                login,
                logout,
                allusers,
                status,
                deleted,
                authstate:state
            }
        }
      
      >
      
      
      {props.children}
      </AuthContext.Provider>


  )




}
export default AuthState;