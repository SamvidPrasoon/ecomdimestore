import React ,{useState,useContext,useEffect}from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Review from './addreview'
import ProductContext from '../productcontextapi/productcontext'
import AuthContext from '../authcontextapi/authcontext'
const ProductDetails = ({match}) => {
    const MySwal = withReactContent(Swal)
    const [qty,setQty] = useState(1);
    const productcontext = useContext(ProductContext);
    const authcontext  = useContext(AuthContext);
    const {authstate} = authcontext  
    const alert = useAlert()
    const {getperproduct,productstate,getcartproduct} = productcontext;
    useEffect(()=>{
            getperproduct(match.params.id);
    },[productstate.reviews])
   
 
    const Add = ()=>{
        if(!productstate.cart.find(o=>o._id===match.params.id))
        {
            getcartproduct(match.params.id,qty);
          MySwal.fire({
              title:<p>Added To Cart</p>,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer:2000,
              timerProgressBar: true,
              icon: 'success',
           
          })
        }
            
        
        
    }

    console.log(productstate.cart);
  
        return (  
            <React.Fragment>
                   <div className="container mt-3">
                       <div className="row">
                       <div class="col-lg-4 col-md-4">
                           <Link className="btn btn-secondary rounded" to='/home'>Go back</Link>
                           {/* <img src={productstate.product.image} alt="productimage"/> */}
                           <img src={productstate.product && productstate.product.image.base64}  className="img-thumbnail" alt="..."></img>
                      </div>
                      <div class="col-lg-4 col-md-4">
                        <h2>{productstate.product.name}</h2>
                        <hr/>
                        <div>Rating{productstate.product.rating} by {productstate.product.numReviews} viewers</div>
                        <hr/>
                        <div> Price &#8377; {productstate.product.price}</div>
                         <hr/>
                         <div>Description: {productstate.product.description}</div>
                      </div> 
                      <div class="col-lg-4 col-md-4">
                         <table className="table table-hover">
                              <tbody>
                                  <tr>
                                <td>price</td>
                                <td>&#8377;{productstate.product.price}</td> 
                                </tr>
                                <tr>
                                <td>status</td>
                                <td>{productstate.product.countInStock >0 ? 'ínstock':'out of stock'}</td> 
                                </tr>
                                <tr>
                                    <td>{productstate.product.countInStock>0 && (
                                      
                                      <h4 style={{fontSize:"25px"}} className=" rounded badge badge-primary">{qty}</h4>
                                        
                                    )}</td>
                                    <td>
                                        {productstate.product.countInStock!==qty && (
    
                                  <button  style={{fontSize:"25px"}} className="  p-2 rounded badge badge-info"
                                      onClick={(e)=>setQty(qty +1)}
                                       >+</button>
                                        )}
                                    
                                    
                                    </td>
                                       <td>
                                           {qty!==1 && (
                                            <button  style={{fontSize:"25px"}} className=" p-2 rounded badge badge-danger"
                                            onClick={(e)=>setQty(qty -1)}
                                            >-</button>
                                           )}
                                        
                                    </td> 
                                </tr>
                                <tr>
                                <td colspan="2"><button onClick={Add} className=" rounded hvr-underline-from-left btn btn-outline-dark">Add To Cart</button></td> 
                                </tr>
                              </tbody>  
                         </table>
                      </div> 
                       </div>
                        <div className="container">
                            <h1>REVIEWS</h1>
                         
                                
                          
                            {!productstate.loading2 && productstate.product.reviews.length > 0 && productstate.product.reviews.map((rev)=>(
                                      <ul className="list-group list-group-flush">
                                          <i class="fa fa-comments fa-2x"></i>
                                            <li className=" jumbotron list-group-item"><i class="fa fa-arrow-right fa-2x"></i><h3>{rev.comment} <br/> Rated {rev.rating}<i class="fa fa-star"></i></h3></li> 
                                            <hr/>

                                      </ul>
                             ))}
                             {authstate.isAuthenticated && (
                                     <Review id={match.params.id}/>
                             )}
                           
                        </div>
                   </div>
            </React.Fragment>
            
        );
    
    
}
 
export default ProductDetails;