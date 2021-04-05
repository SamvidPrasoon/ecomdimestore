import React ,{useContext,useEffect}from 'react';
import ProductContext from '../productcontextapi/productcontext'
import AdminItems from './adminproductitems';
const AdminProducts = () => {
    const productcontext = useContext(ProductContext);
    const {productstate,getproducts} = productcontext;
    console.log(productstate)
    useEffect(()=>{
       getproducts();
    },[productstate.deletedproduct])
    return ( 
        <div className="container mt-3 ">
        <h1  >ALL Products</h1>
        <div className="row">
             {productstate.products.length>0 ? (
                 productstate.products.map((prod)=>(
                     <AdminItems key={prod._id} product={prod}/>
                     
                 ))   
                   

             ):(
                 <h3> no products found</h3>
             )}
        </div>
        </div>
 
     );
}
 
export default AdminProducts;