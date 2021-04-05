import React,{useContext,useState} from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ProductContext from '../productcontextapi/productcontext'
import {Link} from 'react-router-dom'
const Review = ({id}) => {
    const MySwal = withReactContent(Swal)
    const productcontext = useContext(ProductContext);
    const {productstate,addrev} = productcontext;
    console.log(productstate)
    const [formdata,setformdata] = useState({
        rating:0,
        comment:''
    })
  
    const onSubmit = (e)=>{
       
        e.preventDefault();
       
        console.log(formdata)
        console.log(id)
        addrev(formdata,id)
        if(productstate.reviews.message)
        {
            MySwal.fire({
                title:<p>Review Added</p>,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer:2000,
                timerProgressBar: true,
                icon: 'success',
             
            })
        }
        else{
            MySwal.fire({
                title:<p>Review has already been added</p>,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer:2000,
                timerProgressBar: true,
                icon: 'error',
             
            })  
        }
       
        
    }
    return ( 
           <form onSubmit={(e)=>onSubmit(e)}>
             <div className="form-group">
             <label for="exampleFormControlSelect1">Enter Rating</label>
                  <select required className="form-control w-50" id="exampleFormControlSelect1" value={formdata.rating}onChange={(e)=>setformdata({...formdata,rating:e.target.value})}>
                  <option value="1">rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
    </select>
             </div>
             <div className="form-group">
             <h3><label className="mt-2">Comment</label></h3>
                   <textarea required type="text" className=" mt-2 form-control"  placeholder="Enter Comment" value={formdata.comment} onChange={(e)=>setformdata({...formdata,comment:e.target.value})}/>
  </div>
  <button type="submit" className="  btn btn-outline-info rounded  mb-1 ">Create</button>
           </form>

     );
}
 
export default Review;