import React,{useContext} from 'react';
import ProductContext from '../productcontextapi/productcontext'
import SearchProduct from './searchproduct'
const MapSearch = ({match}) => {
    const productcontext = useContext(ProductContext);
    const {productstate} = productcontext;
    return (
        <React.Fragment> 
            <div className="container">
        <h1>You searched for {match.params.key}</h1>
             <div className="row">
                  {productstate.search.length>0 ? (
                      productstate.search.map((prod)=>(
                          <SearchProduct key={prod._id} product={prod}/>
                          
                      ))   
                        

                  ):(
                      <h3> no products found</h3>
                  )}
                  

                  
             </div>
             </div>
             </React.Fragment>
     );
}
 
export default MapSearch;