import React,{useState,useContext} from 'react';
import ProductContext from '../productcontextapi/productcontext'
import {Link, Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const Search = () => {
    const MySwal = withReactContent(Swal)
    const productcontext = useContext(ProductContext)
    const {productstate,search,emptyfound}= productcontext;
    console.log(productstate)
    const [formdata ,setformdata] = useState({
        key:''
    })
    console.log(formdata.key)
 const onSubmit = (e)=>{
      e.preventDefault();
      search(formdata.key);
     
 }
 if(productstate.found)
 {
   MySwal.fire({
       title:<p>No Products found</p>,
       toast: true,
       position: 'top-end',
       showConfirmButton: false,
       timer:2000,
       timerProgressBar: true,
       icon: 'error',
    
   })
   emptyfound();
 }
 if(productstate.search.length > 0)
 {
    return <Redirect to={`/search/${formdata.key}`}/>
 }

    return (
        <form className="form-inline" onSubmit={(e)=>onSubmit(e)}>
        <input style={{height:"35px"}} className="form-control p-1 rounded-pill border border-dark mr-4 w-55" type="search" placeholder="Search" aria-label="Search" value={formdata.key} onChange={(e)=>setformdata({...formdata,key:e.target.value})} />
        <button className="btn btn-outline-success btn-sm rounded mt-1" type="submit">Search</button>
        </form>
      );
}
 
export default Search;