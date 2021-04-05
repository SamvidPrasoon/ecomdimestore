import React,{useContext,useEffect} from 'react';
import Categoryproductitem from './categoryproductitem'
import ProductContext from '../productcontextapi/productcontext'
const CategoryProduct = ({match}) => {
    const productcontext = useContext(ProductContext); 
    const {categoryproduct,productstate} = productcontext;
    useEffect(()=>{
          categoryproduct(match.params.category);
    },[match.params.category])
    console.log(productstate);
    return (  
        <div className="container mt-3 ">
        <h1  >Category : {match.params.category}</h1>
        <div className="row">
             {productstate.categoryproducts.length>0 ? (
                 productstate.categoryproducts.map((prod)=>(
                     <Categoryproductitem key={prod._id} product={prod}/>
                     
                 ))   
                   

             ):(
                 <h3> no products found</h3>
             )}
        </div>
        </div>
 
    );
}
 
export default CategoryProduct;