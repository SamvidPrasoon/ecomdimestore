import React ,{useContext}from 'react';
import {Link} from 'react-router-dom'
import ProductContext from '../productcontextapi/productcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const AdminItems = ({product}) => {
  const MySwal = withReactContent(Swal)
  const productcontext = useContext(ProductContext); 
  const {productstate,deleteproduct} = productcontext;
  const deleted = ()=>{
    deleteproduct(product._id)
    MySwal.fire({
      title:<p>Product Deleted</p>,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer:2000,
      timerProgressBar: true,
      icon: 'success',
   
  })
  }
    return ( 
        <div className="  col-lg-3 col-sm-6 ">
        <div class="card-deck ">
  <div class="card">
  <img src={product.image.base64} class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">Product Id: {product._id}</h5>
      <h5 class="card-title">Product NAMe: {product.name}</h5>
      <h5 class="card-title">Price:{product.price}</h5>  
      
     
      
      <Link to={`/edit/${product._id}`} className="btn btn-outline-info rounded-pill">Edit</Link>
      <Link onClick={deleted} className="ml-2 btn btn-outline-danger rounded-pill">Delete</Link>
    </div>
    
  </div>
  
</div>
</div>
    
    );
}
 
export default AdminItems