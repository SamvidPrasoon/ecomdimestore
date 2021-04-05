import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import ProductContext from '../productcontextapi/productcontext'
const Cartitems = ({product,index}) => {
  const productcontext = useContext(ProductContext);
   const {productstate} = productcontext;  
  function deleteitems(i){
           productstate.cart.splice(i,1);
  }
    return (  
          <div >
               
                   
           <table class=" table btn mt-5">
   
    <thead>
    <tr>
      <Link to={`/product/${product._id}`}>
      <th ><img style={{height:'70px' ,width:"50px"}}className=" border border-primary " src={product.image.base64} alt=""/></th>
      <th scope="col">{product.name}</th>
      <th scope="col">&#8377;{product.price}</th>
      <th  className="text-info" scope="col">{product.qty}</th>
      </Link>  
       <th onClick={()=>deleteitems(index)} scope="col"><Link><i className="fa fa-trash btn btn-danger rounded btn-sm"></i></Link></th>
     
    </tr>
  </thead>

           </table>
           </div>
          
       
    );
}
 
export default Cartitems;