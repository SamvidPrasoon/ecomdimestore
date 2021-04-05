import React, { useState,useContext,useEffect } from 'react';
import Back from './log2.jpg'
import AuthContext from '../authcontextapi/authcontext';
import setAuthToken from '../utils/setAuthToken';
import { useAlert } from 'react-alert';
import {Redirect} from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ParticlesBg from 'particles-bg'
const Login = () => {
    const MySwal = withReactContent(Swal)
    const authcontext = useContext(AuthContext);
    const {login,authstate,loaduser} = authcontext;
    const alert = useAlert()
      const [formdata,setformdata] = useState({
            email:'',
            password:''
 

      })
    console.log(authstate.isAdmin)
      const {email,password} = formdata;
      console.log(authstate);
      useEffect(()=>{
          if(authstate.error.length>0)
          {
              authstate.error.forEach(err=>{
                MySwal.fire({
                    title:<p>{`${err.msg}`}</p>,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer:2000,
                    timerProgressBar: true,
                    icon: 'error',
                 
                })
              })
          }
      },[authstate.error,alert])
     
       useEffect(()=>{
           console.log(localStorage.token);
            if(localStorage.token)
            {
               setAuthToken(localStorage.token)
               loaduser();
            }
        
        },[authstate.token])// eslint-disable-line react-hooks/exhaustive-deps
     
     
         const onSubmit = (e)=>{
            
             e.preventDefault();
           
           
   
                 login({email,password});
                 
                    MySwal.fire({
                        title:<p>Logged in Successfully</p>,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer:1000,
                        timerProgressBar: true,
                        icon: 'success',
                    })
                
               
              
             
         }    
//redirect 
  if(authstate.isAuthenticated)
    {
      return <Redirect to='/home'/>
  }


    return ( 
        
          <div  className="rounded mt-5   ">
                 <ParticlesBg type="fountain" bg={true} /> 
               
               
                 
                  
                       
                        
                        <center>
                <h1 className="display-4">WELCOME</h1>
       <form className="container  mt-5 p-4" onSubmit={e=>onSubmit(e)}>
       
            
              
                
                

                <div className="form-group col-lg-7">
                    <h4><label className="text-info">Email</label></h4>
                    <input required  type="email" className="form-control" placeholder="Enter email" value={formdata.email} onChange={e=>setformdata({...formdata,email:e.target.value})}/>
                </div>

                <div className="form-group col-lg-7">
                   <h4> <label className="text-info">Password</label></h4>
                    <input required  type="password" className="form-control" placeholder="Enter password" value={formdata.password} onChange={e=>setformdata({...formdata,password:e.target.value})}/>
                </div>

                <button type="submit" className="  rounded btn btn-outline-info ">Login</button>
                
            </form>
            
       
                
          
           
           
            </center>
                      
                  
               
          
</div>
        
     );
}
 
export default Login;