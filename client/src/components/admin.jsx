import React,{useContext} from 'react';
import Adminnav from './adminnav'
import PerOrder from './perorderdetail'
import Addproduct from './addproduct';
import Orders from './allorders'
import AdminProducts from './adminproducts';
import AllUsers from './allusers'
import EditProduct from './editproduct'
import Category from './category'
import AuthContext from '../authcontextapi/authcontext'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
const Admin = () => {
    const authcontext  = useContext(AuthContext);
    const {authstate} = authcontext;
    console.log(authstate);
    if(!authstate.isAuthenticated){
        return <Redirect to="/login"/>
    }
    return ( 
       
             <Router>
                   <React.Fragment>
                       
                
                 
                           
                                  
                                   
                               <Adminnav/> 
                           

                            
                               <div id="main">
                                
                    <Route exact path="/admin" component={Orders}/>
                               </div>
                             
               <Switch>
                  <Route exact path="/addproduct" component={Addproduct}/>
                  <Route exact path="/order/:id" component={PerOrder}/>       
                  <Route exact path="/editproducts" component={AdminProducts}/>
                  <Route exact path="/edit/:id" component={EditProduct}/>
                  <Route exact path="/users" component={AllUsers}/> 
                  <Route exact path="/category" component={Category}/>     
               </Switch>  
         
              
         
               </React.Fragment>      
            </Router>
        
    );
}
 
export default Admin;