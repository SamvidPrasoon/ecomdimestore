import React ,{useContext,useEffect}from 'react';
import {Link} from 'react-router-dom'
import AuthContext from '../authcontextapi/authcontext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const UserItems = ({user}) => {
  const MySwal = withReactContent(Swal)
  const authcontext = useContext(AuthContext);
  const {status,deleted} = authcontext;
   const statuschanged =()=>{

    status(user._id)
    MySwal.fire({
      title:<p>Status Changed</p>,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer:2000,
      timerProgressBar: true,
      icon: 'success',
   
  })

   }
  
   const del = ()=>{
     deleted(user._id)
    MySwal.fire({
      title:<p>User Deleted</p>,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer:2000,
      timerProgressBar: true,
      icon: 'success',
   
  })

   }
  return ( 

        <div className="  col-lg-3 col-sm-6 ">
        <div class="card-deck ">
  <div class="card">
  
    <div class="card-body">
      <h5 class="card-title">user Id: {user._id}</h5>
      <h5 class="card-title">user NAMe: <br/> {user.name}</h5>
      <h5 class="card-title">email:{user.email}</h5>
      <h5 class="card-title">status:{user.isAdmin ? (<i className="fa fa-user text-success fa-3x"></i> ):(<i className="fa fa-times text-danger fa-3x"></i>)}</h5>
      
     
   
      <Link onClick={statuschanged} className="btn btn-outline-info rounded-pill">Change Status</Link>
      <Link onClick={del}  className="mt-1 ml-2 btn btn-outline-danger rounded-pill">Delete</Link>
    </div>
    
  </div>
  
</div>
</div>
     );
}
 
export default UserItems
