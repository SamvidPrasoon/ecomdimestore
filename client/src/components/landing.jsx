import React from 'react';
import { Link } from 'react-router-dom';
import background from './shop.png'

import ParticlesBg from 'particles-bg'
     
  


const Landing = () => {
    return (
        <section  className="main_container container-fluid">
               <ParticlesBg type="circle" bg={true} /> 
    <header>
      <h2 style={{fontSize:"40px"}} className=" rounded logo text-dark mt-3 badge badge-danger">Dimestore</h2>
    
    </header>
  
        
 
    <div className="overlay"></div>
    <div className="text mt-5 container">
        
    
      <Link style={{fontSize:'30px'}} to='/home' className=" text-dark btn btn-info rounded  mt-4" >Shop Now</Link>
     <br/>
     <center className="mt-2">
        <img style={{height:"350px"}}src={background} alt=""/>
        </center>
    </div>
    <div>
    
    </div>
   </section>
      );
}
 
export default Landing;