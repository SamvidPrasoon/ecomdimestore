import React ,{useEffect,useState}from 'react';

import { Link } from 'react-router-dom';
const Adminnav = () => {
  const [open,setOpen] = useState(true);
  const openNav= ()=> {
     setOpen(!open)
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  const closeNav = ()=> {
    setOpen(!open)
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  } 
    return ( 
      <React.Fragment>
         <div id="mySidebar" className="sidebar">
  <button  className="closebtn btn btn-light rounded" onClick={closeNav}>&times;</button>
  <Link className="hvr-underline-from-left" to="/addproduct">Add Products</Link>
  <Link className="hvr-underline-from-left" to="/admin">Orders</Link>
  <Link className="hvr-underline-from-left" to="/editproducts">Products</Link>
  <Link className="hvr-underline-from-left" to="/users">Users</Link>
  <Link className="hvr-underline-from-left" to="/category">Category</Link>
</div>

<div id="main">
  {open && (
      <button className="openbtn rounded-pill" onClick={openNav}>&#9776; <i class="fa fa-cog fa-spin fa-2x"></i></button>
  )}
  
  
</div>
        </React.Fragment>
     );
}
 
export default Adminnav;