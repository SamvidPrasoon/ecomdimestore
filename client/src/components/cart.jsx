import React,{useContext} from 'react';
import Cartitems from './cartitems';
import {Link, Redirect} from 'react-router-dom'
import AuthContext from '../authcontextapi/authcontext'
import ProductContext from '../productcontextapi/productcontext'
import AuthState from '../authcontextapi/authstate';
const Cart = () => {
    const authcontext = useContext(AuthContext);
    const productcontext = useContext(ProductContext);
    const {authstate} = authcontext
    const {productstate} = productcontext;
    
    console.log(productstate);

   if(!authstate.isAuthenticated)
   {
       return <Redirect to="/login"/>
   }
  
    

    return ( 
          <div>
              
               <div className="row">
              {productstate.cart.length>0 ? (
                  <div style={{width:"598px"}} className=" rounded jumbotron">{productstate.cart.map((prod,index)=>(
                   
                     <div className="col ">
                    <Cartitems index={index} key={prod._id} product={prod}/>
                    </div>
                    
                
                                        
                  ))}
                
                  </div>
                  
              )
              
              :(
                     <div className="container ml-5 mt-5">
                         <h1>No Products in your cart</h1>
                     </div>
              )}


             <div className="col  ml-4  mt-5">
              <h1>Subtotal ({productstate.cart.reduce((acc,item)=>acc+item.qty,0)})items</h1>
              <h3 className="badge badge-info p-3 rounded">Total Price &#8377; {productstate.cart.reduce((acc,item)=>acc+(item.qty*item.price),0).toFixed(2)}) </h3>
              <br/>
               {productstate.cart.length>0 && (
                     <Link to="/checkout"  className="btn btn-dark rounded">Checkout</Link>
               )}
              
               </div>
               </div> 
        
            
          </div>
  
     );
}
 
export default Cart;