import React ,{useContext,useEffect}from 'react';
import AuthContext from '../authcontextapi/authcontext'
import UserItems from './useritems';

const Users = () => {
    const authcontext = useContext(AuthContext);
    const {authstate,allusers} = authcontext;
    console.log(authstate);
    useEffect(()=>{
        allusers();
    },[authstate.status])
    useEffect(()=>{
        allusers();
    },[authstate.deleteduser])
    return ( 

        <div className="container mt-3 ">
        <h1  >ALL Users</h1>
        <div className="row">
             {authstate.users.length>0 ? (
                 authstate.users.map((user)=>(
                     <UserItems key={user._id} user={user}/>
                     
                 ))   
                   

             ):(
                 <h3> no User found</h3>
             )}
        </div>
        </div>
     );
}
 
export default Users;

