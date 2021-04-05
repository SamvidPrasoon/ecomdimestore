import React ,{useContext,useEffect}from 'react';
import AllOrderItems from './allorderitems'
import OrderContext from '../ordercontextapi/ordercontext'
import AuthContext from '../authcontextapi/authcontext'
import ProductContext from '../productcontextapi/productcontext'
const Orders = () => {
    const ordercontext  = useContext(OrderContext);
  const {orderstate,getorders}= ordercontext;
  console.log(orderstate);
  const authcontext = useContext(AuthContext);
    const {authstate,allusers} = authcontext;
    console.log(authstate);
    const productcontext = useContext(ProductContext);
    const {productstate,getproducts} = productcontext;
    console.log(productstate)
  useEffect(()=>{
      getorders()
  },[])
  useEffect(()=>{
        allusers()
  },[])
  useEffect(()=>{
    getproducts()
},[])
    return ( 
        <React.Fragment>
            <div className="container">
              <h1 style={{fontSize:"20px"}} className="badge badge-light rounded">welcome Administrator {authstate.user.name}</h1>

            </div>
        <div className="container">
        <div className="row">
                    <div className="col">
                    <div className=" rounded card text-white bg-info mb-3" >
                    <h3 className="text-light"> <div className="card-header">Users</div></h3>
                    <div className="card-body">
                    <h5 className="card-title"><i class="fa fa-shopping-cart fa-4x"> {authstate.users.length}</i></h5>
                    
                    </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="  rounded card text-white bg-dark mb-3" >
                    <h3 className="text-light"><div className="card-header">Products</div></h3>
                    <div className="card-body">
                    <h5 className="card-title"><i class="fa fa-cubes fa-4x" aria-hidden="true"> {productstate.products.length}</i>
</h5>
                    
                    </div>
                    </div>
                    </div>
                    <div className="col">
                    <div className="  rounded card text-white bg-warning mb-3">
                   <h3 className="text-light"> <div className="card-header">Orders</div></h3>
                    <div className="card-body">
                    <h5 className="card-title"><i class="fa fa-stack-overflow fa-4x " aria-hidden="true">  {orderstate.orders.length}</i>
                     </h5>
                 
                    </div>
                    </div>
                    </div>
                </div>
        <h1>All Orders</h1>
        <div className="row">
           {orderstate.orders.map((order)=>(
                <AllOrderItems key={order._id} order={order}/>
           ))
        }
        </div>
         </div>
         </React.Fragment>
     );
}
 
export default Orders;