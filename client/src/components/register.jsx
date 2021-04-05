import React,{useContext, useEffect, useState} from 'react';
import AuthContext from '../authcontextapi/authcontext';
import setAuthToken from '../utils/setAuthToken';
import { useAlert } from 'react-alert';
import {Redirect} from 'react-router-dom';
import Auth from './auth.jpg' 
import Swal from 'sweetalert2'
import Back from './reg.jpg'
import withReactContent from 'sweetalert2-react-content'
import ParticlesBg from 'particles-bg'
const Register = () => {
    const MySwal = withReactContent(Swal)
    const authcontext = useContext(AuthContext);
    const {register,authstate,loaduser} = authcontext;
    const alert = useAlert()
    const [formdata,setformdata] = useState({
         name:'',
         email:'',
         password:'',
         password2:''


    });
    const {name,email,password,password2} = formdata;
 console.log(authstate);
 useEffect(()=>{
     if(authstate.error.length>0)
     {
         authstate.error.forEach(err=>{
             alert.show(`${err.msg}`);
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
      
        if(password!==password2)
        {
            MySwal.fire({
                title:<p>Passwords Do not Match</p>,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer:2000,
                timerProgressBar: true,
                icon: 'error',
             
            })
        }
        else{
            register({name ,email,password});
            MySwal.fire({
                title:<p>Registered Successfully</p>,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer:2000,
                timerProgressBar: true,
                icon: 'success',
             
            })
        }
        
    }   
    
 
      
         //redirect 
  if(authstate.isAuthenticated)
  {
    return <Redirect to='/home'/>
}   
    
    return ( 
     <section className="">
             <div  className=" container  rounded   mt-3"
          >

<ParticlesBg type="polygon" bg={true} /> 
                 
                        
                          
                           <center>
        <h1  >Register</h1>
       <form className=" pt-5 " onSubmit={e=>onSubmit(e)}>
       
            
                <div className="form-group col-lg-7">
               
                    <h4><label className="text-info"> Name</label></h4>
                    <input required  type="text" className="form-control" placeholder="Enter Name" value={formdata.name} onChange={(e=>setformdata({...formdata,name:e.target.value}))}  />
                </div>
                
                

                <div className="form-group col-lg-7">
                <h4> <label className="text-info">Email</label></h4>
                    <input required type="email" className="form-control" placeholder="Enter email"  value={formdata.email} onChange={e=>setformdata({...formdata,email:e.target.value})}/>
                </div>

                <div className="form-group col-lg-7">
                <h4><label className="text-info">Password</label></h4>
                    <input required  type="password" className="form-control" placeholder="Enter password" value={formdata.password} onChange={e=>setformdata({...formdata,password:e.target.value})}/>
                </div>
                <div className="form-group col-lg-7">
                <h4><label className="text-info">Repeat Password</label></h4>
                    <input required  type="password" className="form-control " placeholder="Enter password" value={formdata.password2} onChange={e=>setformdata({...formdata,password2:e.target.value})}/>
                </div>

                <button type="submit" className=" rounded btn btn-outline-info ">Register</button>
                
            </form>         
            </center>
                          
                 

              
       
   
</div>
</section>

     
     );
}
 
export default Register;