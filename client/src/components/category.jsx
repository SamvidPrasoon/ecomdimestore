import React,{useContext,useEffect,useState} from 'react';
import ProductContext from '../productcontextapi/productcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CategoryItems from './categoryitems'
const Category = () => {
    const MySwal = withReactContent(Swal)
    const productcontext = useContext(ProductContext)
    const {productstate,addcat,cat}=productcontext;
    console.log(productstate);
    const [formdata,setformdata] = useState({
        category:''
    })
    console.log(formdata.category)
    useEffect(()=>{
        cat('606765e2cc4f5b486c95530b');
    },[productstate.addcategory])
    const onSubmit = (e)=>{
        e.preventDefault();
        addcat("606765e2cc4f5b486c95530b",formdata);
        cat("606765e2cc4f5b486c95530b");
        MySwal.fire({
          title:<p>{'A new category has been added' }</p>,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer:2000,
          timerProgressBar: true,
          icon: 'success',
       
      })
    } 
    return ( 
        <div className="container">
            <div className="row">
                  <div className="col">
                  <div>
            <form  onSubmit={e=>onSubmit(e)} >
            <div className="form-group">
    <h3><label>Enter category</label></h3>
    <input placeholder='enter category' type="text" className="form-control" required value={formdata.category} onChange={e=>setformdata({...formdata,category:e.target.value})}/>
   
  </div>
  <button type="submit" className=" rounded btn btn-outline-primary">Create</button>
            </form>
        </div>
                  </div>
                  {productstate.loading ? (
                             <p>No category Found</p>
                  ):(
                  
                      <div className="col">
                      {productstate.category.category.map((catgr,index)=>(
                    <CategoryItems index={index} key={catgr._id} category={catgr}/>
               ))
            }
                      </div>
                  )}
                
            </div>
        </div>
     );
}
 
export default Category
