import React from 'react';
import Rating from './rating';
import { Link } from 'react-router-dom';
const SearchProduct = ({product}) => {
    return ( 

       
        <div className="  col-lg-3 col-sm-6 ">
         <img style={{height:"200px"}}src={product.image.base64} className="card-img-top" alt="..."/> 
         
    

          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h4><Rating rating={product.rating} viewers={product.numReviews}/></h4>
            <div className="row">
              <div className="col-6">
            <h3>&#8377;{product.price}</h3>
            </div>
            <div className="col-6">
             <Link className="hvr-pulse btn btn-outline-dark rounded" to={`/product/${product._id}`} >View</Link>
            </div>
            </div>
          </div>
        </div>
 
    

     );
}
 
export default SearchProduct;