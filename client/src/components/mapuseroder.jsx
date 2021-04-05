import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom'
const OrderItems = ({order}) => {
    return ( 

      <div className=" mt-2 col-lg-3 col-sm-6 ">
        <div class="card-deck ">
  <div class=" rounded card">
    
    <div class="card-body">
      <h5 class="card-title">Order Id: {order._id}</h5>
      <h5 class="card-title">User Id:{order.user}</h5>
      {order.isPaid ? (
         <h5 class="card-title">Paid: <i class="fa fa-check text-success fa-3x"></i></h5>
      ):(
        <h5 class="card-title">Paid: <i className=" text-danger fa fa-times fa-3x"></i></h5>  
      )}
      {order.isDelivered ? (
         <h5 class="card-title">Delivered: <i class="fa fa-check text-success fa-3x"></i></h5>
      ):(
        <h5 class="card-title">Delivered: <i className=" text-danger fa fa-times fa-3x"></i></h5>  
      )}
      <h5 class="card-title"><Moment format='YYYY/MM/DD'>{order.date}</Moment></h5>  
      <h5 class="card-title">Total:{order.totalPrice}</h5>  
      <Link to={`/userorder/${order._id}`} className="btn btn-info rounded-pill">Details</Link>
    </div>
    
  </div>
  
</div>
</div>

     );
}
 
export default OrderItems;
