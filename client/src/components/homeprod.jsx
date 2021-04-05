import React,{useContext,useEffect,useState} from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import Back from './vect.jpg'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Product from './product';
import ProductContext from '../productcontextapi/productcontext'
import {Link} from 'react-router-dom'
import Pagination from './pagination'

import ParticlesBg from 'particles-bg'
     
const ProductsList = () => {
    const [currentpage,setcurrentpage] = useState(1)
    const [productsperpage] = useState(12)
    
        const productcontext = useContext(ProductContext); 
        const {getproducts,productstate,cat} = productcontext;
       
        useEffect(()=>{
            getproducts();
        },[])
        useEffect(()=>{
            cat("606765e2cc4f5b486c95530b");
        },[])
        console.log(productstate)


       const indexoflastproduct = currentpage*productsperpage
       const indexoffirstproduct = indexoflastproduct - productsperpage
       const currentproducts = productstate.products.slice(indexoffirstproduct,indexoflastproduct)
   
      const paginate = (i)=>{
          setcurrentpage(i)
      }
 



       return (  
        <React.Fragment>
            <section

            style={{
                backgroundColor:""
            }}
            >
                  <ParticlesBg color="#ff0000" type="cobweb" bg={true} /> 
      <div className="">
      <Splide
         options={ {
            type    : 'loop',
            perPage : 1,
            autoWidth: true,
	      autoplay: true,
          interval:2000,
          focus    : 'center',
          autoHeight:true,
     
       
	      rewind: true,
          } }
      >
          {productstate.products.map((prod)=>(
                <SplideSlide>
                <img style={{height:"400px"}} src={prod.image.base64} alt="Image 1"/>
              </SplideSlide>
              
          ))}
  
</Splide>
</div>
   
               
         <div className="container mt-3 ">
           <h1>Categories</h1>
           <div className="">
      <Splide
         options={ {
            type    : 'loop',
            perPage : 3,
            autoWidth: true,
	      autoplay: true,
          interval:2000,
          focus    : 'center',
          autoHeight:true,
     
       
	      rewind: true,
          } }
      >
      {!productstate.loading && productstate.category.category.map((catgr)=>(
          <SplideSlide>
         <Link className=" hvr-underline-from-left hvr-pulse  dropdown-item " to={`/category/${catgr}`}><div className="card text-center m-4  rounded" style={{width:"18rem"}}>
              <div style={{backgroundImage:`url(${Back} )`, backgroundRepeat: 'no-repeat',
        backgroundSize:"cover",
        height:'20vh',
        overflowY:'hidden',
    
      
        backgroundPosition: 'center'}}  className="card-body ">
              <h2 className="card-title text-info mt-5">{catgr}</h2>  
              </div>
              </div></Link> 
              </SplideSlide>
      ))}
     
  
</Splide>
</div>
            
             <h1  >Latest Products</h1>
            
             <div className="row">
          
                  {currentproducts.length>0 ? (
                      currentproducts.map((prod)=>(
                          <Product key={prod._id} product={prod}/>
                          
                      ))   
                        

                  ):(
                      <h3> no products found</h3>
                  )}
                  

                  
             </div>
             <Pagination productsperpage={productsperpage} totalproducts={productstate.products.length} paginate={paginate}/>
             </div>
      
             </section>
             </React.Fragment>


    );
}
 
export default ProductsList;