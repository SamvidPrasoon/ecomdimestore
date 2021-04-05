import React,{useContext,useState,useEffect} from 'react';
import { Redirect } from 'react-router';
import AddressList from './addresslist';
import ProductContext from '../productcontextapi/productcontext'
import AddressContext from '../addresscontextapi/addresscontext'
import AuthContext from '../authcontextapi/authcontext'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Address = () => {
    const MySwal = withReactContent(Swal)
    const alert = useAlert()
    const authcontext = useContext(AuthContext);
    const {authstate}= authcontext;
    console.log(authstate)
    const productcontext  = useContext(ProductContext);
    const {productstate,getaddresscart,deleteaddresscart} = productcontext;
    console.log(productstate);
    const addresscontext = useContext(AddressContext);
    const {addressstate,addaddress,getaddress} = addresscontext;
    console.log(addressstate);
    const [formdata,setformdata] = useState({
        shippingaddress:''
    })
  
    useEffect(()=>{
          if(authstate.user!==null)
          {
            getaddress(authstate.user._id);
          }
            
    },[addressstate.newaddress])
  console.log(formdata.shippingaddress)
   
  if(!authstate.isAuthenticated)
  {
          return <Redirect to='/login'/>
  }
    
  const onSubmit = (e)=>{
      e.preventDefault();
      addaddress(formdata);
      getaddresscart(formdata.shippingaddress);
      MySwal.fire({
        title:<p>{`${formdata.shippingaddress} has been selected` }</p>,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        timerProgressBar: true,
        icon: 'success',
     
    })
  } 
    return ( 
        <div className="container ">
        
     


             <div className="row">
                 <div className="col-lg-6 mt-5">
                 <div>
            <form  onSubmit={e=>onSubmit(e)} >
            <div className="form-group">
    <h3><label>Enter Your Shipping Address</label></h3>
    <textarea  type="text" className="form-control" required value={formdata.shippingaddress} onChange={e=>setformdata({...formdata,shippingaddress:e.target.value})}/>
   
  </div>
  <button type="submit" className=" rounded btn btn-outline-primary">Submit</button>
            </form>
        </div>
                 </div>
                 
                 <div className="col-lg-4 mt-5 jumbotron">
                 <h3>select / manage your addresses</h3>
                      {addressstate.address.map((address,index)=>(
                          <AddressList key={index} address={address}/>
                      ))}

                 </div>
                 {productstate.usercartaddress &&(
                       <div className="col-lg-2 mb-4 mt-4 " >
                       <Link to='/summary' className="  border border-success rounded btn btn-light text-dark">Place Order<i className="ml-2 fa fa-arrow-right"></i></Link>
                       </div>
                 )}
                

             </div>
        </div>
     );
}
 
export default Address;