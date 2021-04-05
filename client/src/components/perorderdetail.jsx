import React ,{useContext,useEffect}from 'react';
import {Link} from 'react-router-dom'
import OrderContext from '../ordercontextapi/ordercontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const PerOrder = ({match}) => {
  const MySwal = withReactContent(Swal)
    const ordercontext  = useContext(OrderContext);
    const {orderstate,perorder,getuser,paid,deliver}= ordercontext;
    console.log(orderstate);
    useEffect(()=>{
        perorder(match.params.id);
      
          
       
    },[orderstate.status])
    useEffect(()=>{
     
      
            getuser(orderstate.order.user);
       
    },[orderstate.order.user])


     const paidpay = ()=>{
      paid(orderstate.order._id)
      MySwal.fire({
        title:<p>Status Changed</p>,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        timerProgressBar: true,
        icon: 'success',
     
    })
     }
     const delivered = ()=>{
      deliver(orderstate.order._id)
      MySwal.fire({
        title:<p>Status Changed</p>,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        timerProgressBar: true,
        icon: 'success',
     
    })
     }


    return (<React.Fragment>
       
            <Link className="btn btn-outline-dark rounded ml-5" to='/admin'>Go back</Link>
            
        <div className="container">
    
            <h2>Order Id</h2>
       
        <p style={{fontSize:"20px"}}>{orderstate.order._id}</p>
        </div> 
        <div className="container mt-5">
        
        <div className="row">
            <div className="col-lg-6">
              <h2 >Shippingaddress</h2>
                <p style={{fontSize:"20px"}}>{orderstate.order.shippingAddress}</p>
                <hr/>
              <h2>paymentmethod</h2>
              <p style={{fontSize:"20px"}}>COD-cash on delivery</p>
               <hr/>
              <h2>orderitems</h2>
              {orderstate.order.orderItems && orderstate.order.orderItems.map((items)=>(
                  
                 <table className=" jumbotron table">
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
      
            <h2>User</h2>
              
              <p style={{fontSize:"20px"}}>{orderstate.user && orderstate.user.name.toUpperCase()}</p>
            
            
            <ul class="list-group">
               <h2><center><li  className="list-group-item ">Order Summary</li></center></h2> 
                <li style={{fontSize:"20px"}} className="list-group-item p-4 "><i class="fa fa-archive" aria-hidden="true"></i>Total Quantity <i class="fa fa-long-arrow-right" aria-hidden="true"></i>

 {orderstate.order.orderItems &&  orderstate.order.orderItems.reduce((acc,item)=>acc+item.qty,0)}</li>
                <li style={{fontSize:"20px"}}  className="list-group-item p-4 "><i className="fa fa-money"></i>Total Price <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
&#8377;       {orderstate.order.totalPrice}</li>

            <li style={{fontSize:"20px"}}  className="list-group-item p-4 "><i className="fa fa-money"></i>PAID <i className="fa fa-long-arrow-right" aria-hidden="true"></i>{orderstate.order.isPaid ? (<i className=" text-success fa fa-check fa-3x"></i>):(<i className=" text-danger fa fa-times fa-3x"></i>)}</li> <Link onClick={paidpay} className="btn btn-info">Paid Status change</Link>
            <li style={{fontSize:"20px"}}  className="list-group-item p-4 "><i className="fa fa-money"></i>delivered <i className="fa fa-long-arrow-right" aria-hidden="true"></i>{orderstate.order.isDelivered ? (<i className=" text-success  fa fa-check fa-3x"></i>):(<i className="text-danger fa fa-times fa-3x"></i>)}</li><Link  onClick={delivered} className="btn btn-info"> delivery Status change</Link>
            </ul>
            
            </div>
        </div>
       
  </div>
  </React.Fragment>

     );
}
 
export default PerOrder;