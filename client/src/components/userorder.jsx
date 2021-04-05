import React ,{useContext,useEffect}from 'react';
import OrderItems from './mapuseroder'
import OrderContext from '../ordercontextapi/ordercontext'
import AuthContext from '../authcontextapi/authcontext'
import ProductContext from '../productcontextapi/productcontext'
const UserOrder = () => {
    const ordercontext  = useContext(OrderContext);
  const {orderstate,userorder}= ordercontext;
  console.log(orderstate);
  const authcontext = useContext(AuthContext);
    const {authstate} = authcontext;
    console.log(authstate);
    const productcontext = useContext(ProductContext);
    const {productstate} = productcontext;
    console.log(productstate)
  useEffect(()=>{
      userorder(authstate.user._id)
  },[])
 
 
    return ( 
        <React.Fragment>
           
        <div className="container">
      
        <h1>All Orders</h1>
        <div className="row">
           {orderstate.orders.map((order)=>(
                <OrderItems key={order._id} order={order}/>
           ))
        }
        </div>
         </div>
         </React.Fragment>
     );
}
 
export default UserOrder;