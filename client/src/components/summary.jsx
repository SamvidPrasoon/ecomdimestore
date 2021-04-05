import React ,{useContext}from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../authcontextapi/authcontext'
import OrderContext from '../ordercontextapi/ordercontext'
import ProductContext from '../productcontextapi/productcontext'
const Summary = () => {
    const authcontext = useContext(AuthContext);
    const {authstate}= authcontext;
    const productcontext  = useContext(ProductContext);
    const {productstate} = productcontext;
    const ordercontext = useContext(OrderContext);
    const {orderstate,createorder} = ordercontext
    console.log(orderstate);
    console.log(productstate);
    console.log(authstate)
 const total = productstate.cart.reduce((acc,item)=>acc+(item.qty*item.price),0).toFixed(2)
    const order = {};
    order.orderItems=productstate.cart
    order.user=authstate.user._id
    order.shippingAddress = productstate.usercartaddress
    order. totalPrice = total
    order.paymentMethod = "COD"



    return ( 
        <div className="container mt-5">
              <div className="row">
                  <div className="col-lg-6">
                    <h2 >Shippingaddress</h2>
                      <p style={{fontSize:"20px"}}>{productstate.usercartaddress}</p>
                      <hr/>
                    <h2>paymentmethod</h2>
                    <p style={{fontSize:"20px"}}>COD-cash on delivery</p>
                     <hr/>
                    <h2>orderitems</h2>
                    {productstate.cart.map((items)=>(
                       <table class="table">
                          <tr>
                              <th>
                                <img style={{width:"50px",height:"50px"}} src={items.image.base64} alt=""/>  
                              </th>
                              <th>
                                 {items.name} 
                              </th>
                              <th>
                                 {items.qty} 
                                 
                              </th>
                              <th>
                              &#8377;{items.price} 
                              </th>
                          </tr>

                       </table>

                    ))}

                
                  </div>
                  
                  <div className="col-lg-6">
                  <ul class="list-group">
                     <h2><center><li  className="list-group-item ">Order Summary</li></center></h2> 
                      <li style={{fontSize:"20px"}} className="list-group-item p-4 "><i class="fa fa-archive" aria-hidden="true"></i>Total Quantity <i class="fa fa-long-arrow-right" aria-hidden="true"></i>

       {productstate.cart.reduce((acc,item)=>acc+item.qty,0)}</li>
                      <li style={{fontSize:"20px"}}  className="list-group-item p-4 "><i className="fa fa-money"></i>Total Price <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
    &#8377;       {productstate.cart.reduce((acc,item)=>acc+(item.qty*item.price),0).toFixed(2)}</li>
                  </ul>
                  <Link to= "/thankyou"onClick={()=>createorder(order)} className=" rounded btn btn-outline-info mt-3">Place Order</Link>
                  </div>
              </div>
        </div>
     );
}
 
export default Summary;