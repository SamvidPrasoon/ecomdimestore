import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import AddressContext from '../addresscontextapi/addresscontext'
import AuthContext from '../authcontextapi/authcontext'
import ProductContext from '../productcontextapi/productcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const AddressList = ({address}) => {
    const MySwal = withReactContent(Swal)
    const alert = useAlert()
    const authcontext = useContext(AuthContext);
    const {authstate}= authcontext;
    const productcontext  = useContext(ProductContext);
    const {productstate,getaddresscart,deleteaddresscart} = productcontext;
    console.log(productstate);
    console.log(authstate)
    const addresscontext = useContext(AddressContext);
    const {addressstate,deleteaddress} = addresscontext;
    console.log(addressstate);

    const deleteadd = (index)=>{
             deleteaddress(authstate.user._id,index);
             MySwal.fire({
                  title:<p>{`${address} has been deleted`}</p>,
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer:2000,
                  timerProgressBar: true,
                  icon: 'error',
               
              })
        
            
    
          }
     
         
        
          
     
    return ( 
         <h4>
       
        <ul className="list-group">
        <li 
        className="list-group-item text-info rounded mt-2" aria-disabled="true">{address}</li>
            
          
        <div     className="row">  
             {
                (
                    <React.Fragment>
                    <div className="col ">
                    <span><button   onClick={()=>{deleteadd(address.key)
                        alert.show(`${address} has been deleted`);
                    }} className=" rounded btn btn-danger btn-sm mt-2"><Link><i className="fa fa-minus-square text-light"></i></Link></button>
              </span>
                    </div>  
                    <div className="col">
                    <span  ><button onClick={()=>{getaddresscart(address)
                        MySwal.fire({
                              title:<p>{`${address} has been selected`}</p>,
                              toast: true,
                              position: 'top-end',
                              showConfirmButton: false,
                              timer:2000,
                              timerProgressBar: true,
                              icon: 'success',
                           
                          })
                    }}  className=" rounded btn btn-info btn-sm mt-2"><i className="fa fa-check"></i></button>
              </span>
              
                  
    
             
                    </div> 
                    
              </React.Fragment>
                  )
             }
        </div>  
          
      
      </ul>
        
      </h4>       


     );
}
 
export default AddressList;