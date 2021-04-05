import React,{useContext} from 'react';
import ProductContext from '../productcontextapi/productcontext'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const CategoryItems = ({category,index}) => {
  const MySwal = withReactContent(Swal)
  const productcontext = useContext(ProductContext)
  const {productstate,deletecat}=productcontext;
  console.log(productstate);
  const del = ()=>{
      deletecat("606765e2cc4f5b486c95530b",index)
      MySwal.fire({
        title:<p>{'Category deleted' }</p>,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer:2000,
        timerProgressBar: true,
        icon: 'success',
     
    })
  }
    return ( 
        <div>
            <ul class="list-group list-group-flush ">

            <li className=" jumbotron list-group-item d-flex justify-content-between align-items-center ">
   <b style={{fontSize:"30px"}}>{category}</b>
    <span ><Link onClick={del} ><i className="fa fa-trash fa-3x text-danger"></i></Link></span>
  </li>
            </ul>
        </div>
     );
}
 
export default CategoryItems;