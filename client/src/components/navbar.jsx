import React,{useContext,useEffect} from 'react';
import { Link,Redirect } from 'react-router-dom';
import ReactLogo from './apostrophe.svg';
import AuthContext from '../authcontextapi/authcontext';
import ProductContext from '../productcontextapi/productcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Image from '../nav.jpg'
import Search from './search'
const Navbar = () => {
  const MySwal = withReactContent(Swal)

    useEffect(()=>{
         
      const menuBtn = document.querySelector('.menu-btn');
      let menuOpen = false;
      menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
          menuBtn.classList.add('open');
          menuOpen = true;
        } else {
          menuBtn.classList.remove('open');
          menuOpen = false;
        }
      });
    },[])

   const log = ()=>{
   
        logout();
        MySwal.fire({
          title:<p>Logged out Successfully</p>,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer:2000,
          timerProgressBar: true,
          icon: 'success',
       
      })

   }


    const productcontext = useContext(ProductContext); 
    const {getproducts,productstate,cat} = productcontext;
    const authcontext = useContext(AuthContext);
    const {authstate,logout} = authcontext;
    useEffect(()=>{
      getproducts();
  },[])
  useEffect(()=>{
       cat("606765e2cc4f5b486c95530b")
  },[])






    const authlinks = (
             <React.Fragment>
                 <li className="nav-item active">
      <Link onClick={log}  className="hvr-underline-from-left  nav-link " ><i className="fa fa-sign-in" aria-hidden="true"></i>
     logout</Link>
    </li>
    <li className="nav-item active">
        <Link to='/orderhistory' className=" hvr-underline-from-left rounded nav-link " >
Orders</Link>
      </li>
 
   
           
          
   
    
             </React.Fragment>
    );

   
    
   
   
   
          
       

    const guestlinks = (
      <React.Fragment>
      <li className="nav-item active">
      <Link to= "/login" className="hvr-underline-from-left  nav-link " ><i className="fa fa-sign-in" aria-hidden="true"></i>
     login</Link>
    </li>
    <li className="nav-item active">
      <Link to= "/register" className="hvr-underline-from-left  nav-link " ><i className="fa fa-sign-in" aria-hidden="true"></i>
     register</Link>
    </li>
    
     </React.Fragment>
    );

 


    return (
      
        <nav style={{
          borderRadius:"20px",
          height:"85px",
          backgroundImage:`url(${Image})`,
          backgroundRepeat: 'no-repeat',
        backgroundSize:"cover",
        }} className="  mt-1 navbar  navbar-expand-lg sticky-top ">
        
  <button className=" mr-2 menu-btn navbar-toggler navbar-brand" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
   <div className="menu-btn__burger"></div>
  </button>
  <Link className=" navbar-brand mx-auto" to="/"><img style={{width:"40px"}} className="mr-2" src={ReactLogo} alt=""/>
Dimestore</Link>
 

  <div style={{borderRadius:"50px"}} className=" animate__animated animate__zoomIn  border border-info ml-3 collapse navbar-collapse" id="navbarColor02">
    
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active ml-3">
        <Link to='/home'className=" hvr-underline-from-left  nav-link" ><i className="fa fa-home"></i>Home
          <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li class="nav-item dropdown active">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Category</a>
    <div class="dropdown-menu bg-light" >
         {!productstate.loading && productstate.category.category.map((catgr)=>(
                <Link className=" hvr-underline-from-left  dropdown-item " to={`/category/${catgr}`}>{catgr}</Link>
         ))}
      
     
      
    </div>
    
  </li>
     
     
     
    </ul>
    <Search
          
    />
    <ul className=" animate__animated animate__backInLeft navbar-nav ml-auto">
     
      {authstate.isAuthenticated ? authlinks:guestlinks}
      {authstate.isAuthenticated && authstate.user && authstate.user.isAdmin &&  <li className="nav-item active">
     <Link to= "/admin" className=" hvr-underline-from-left  nav-link " ><i className="fa fa-admin" aria-hidden="true"></i>
    Admin</Link>
   </li> }
   <li className="nav-item active">
      <Link to= '/cart'className="hvr-underline-from-left  nav-link " ><i className="fa fa-shopping-cart" aria-hidden="true"></i>
cart</Link>
    </li>
    </ul>
  </div>
</nav>

      );





      


}
 
export default Navbar;