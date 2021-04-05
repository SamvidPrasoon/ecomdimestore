import React,{useState,useContext,useEffect} from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64'
import ProductContext from '../productcontextapi/productcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router';
const AddProduct = () => {
    const MySwal = withReactContent(Swal)
    const productcontext = useContext(ProductContext); 
    const {productstate,add,cat} = productcontext;
    console.log(productstate);
    useEffect(()=>{
        cat('606765e2cc4f5b486c95530b');
      },[])
    const [formdata,setformdata] = useState({
         name:'',
         price:0,
         image:'',
         brand:'',
         category:'',
         countInStock:0,
         description:'',   
    

    })
  console.log(formdata.category);

   
   
    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(formdata)
        add(formdata);
        MySwal.fire({
            title:<p>Product Added</p>,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer:2000,
            timerProgressBar: true,
            icon: 'success',
         
        })
        return <Redirect to="/editproducts"/>
     }
    
         
     
    return ( 
        <div className="mt-5 container">
            <h1>Add Product</h1>
            <form onSubmit={(e)=>onSubmit(e)}>

                <div className="form-group mt-3">
                  <h3> <label >Name</label></h3>
                   <input required type="text" className=" w-50 mt-2 form-control"  placeholder="Enter Product Name" value={formdata.name} onChange={(e)=>setformdata({...formdata,name:e.target.value})} />
                   <h3><label className="mt-2">Price</label></h3>
                   <input required type="number" className="w-50 mt-2 form-control"  placeholder="Enter Product Price" value={formdata.price} onChange={(e)=>setformdata({...formdata,price:e.target.value})}/>
                   <h3><label className="mt-2">Brand</label></h3>
                   <input required type="text" className="w-50 mt-2 form-control"  placeholder="Enter Product Brand" value={formdata.brand} onChange={(e)=>setformdata({...formdata,brand:e.target.value})}/>
                   <h3><label className="mt-2">Category</label></h3>
                   <select required className="w-50  mt-2 form-control"  placeholder="Enter Product Category" value={formdata.category} onChange={(e)=>setformdata({...formdata,category:e.target.value})}>
                   <option>category</option>
                     {!productstate.loading && productstate.category.category.map((catgr)=>(
                              <option key={catgr._id} value={catgr}>{catgr}</option>
                     ))}
                   
                   </select>
                   <h3><label className="mt-2">Count In Stock</label></h3>
                   <input required type="number" className=" w-50 mt-2 form-control"  placeholder="Enter Count in stock" value={formdata.countInStock} onChange={(e)=>setformdata({...formdata,countInStock:e.target.value})}/>
                   <h3><label className="mt-2">Description</label></h3>
                   <textarea required type="text" className=" mt-2 form-control"  placeholder="Enter Product Description" value={formdata.description} onChange={(e)=>setformdata({...formdata,description:e.target.value})}/>
                   <h3><label className="mt-2">Image</label></h3>
                   <div class="form-group">
                   
                   <FileBase
                       type="file"
                       multiple={false}
                       onDone={(base64)=>setformdata({...formdata,image:base64})}
                   />
                
                   </div>
                   <button type="submit" className="  btn btn-outline-dark rounded  mt-3 ">Create</button>
                </div>
                
            </form>
        </div>
     );
}
 
export default AddProduct;