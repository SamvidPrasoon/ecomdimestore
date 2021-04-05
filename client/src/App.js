import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from './components/navbar'
import ProductDetails from './components/productdetails'
import ProductsList from './components/homeprod';
import ProductCategory from './components/categoryproducts'
import './App.css';
import ProductState  from './productcontextapi/productstate'
import Landing from './components/landing'
import AuthState from './authcontextapi/authstate'
import Register from './components/register';
import Login from './components/login'
import Cart from './components/cart'
import AddressState from './addresscontextapi/addressstate'
import Summary from './components/summary';
import OrderState from './ordercontextapi/orderstate'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Address from './components/shippingaddress';
import Thankyou from './components/thankyou';
import Admin from './components/admin'
import MapSearch from './components/mapsearch'
import UserOrder from './components/userorder'
import UserOrderDetails from './components/userorderdetails'

function App() {
  const options = {
    
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '30px',
  
    transition: transitions.SCALE
  }
  return (
    <AlertProvider template={AlertTemplate} {...options}>
         <OrderState>  
         <AuthState>
         <ProductState>
         <AddressState>
         <Router>
         <React.Fragment>
      
        <Navbar/>
         
         <Switch>
  
  
         <Route exact path='/' component={Landing}/>
       
       
         <Route exact path='/home' component={ProductsList}/>
        
         
           
           
            
            <Route exact path='/product/:id' component={ProductDetails}/>
            <Route exact path='/category/:category' component={ProductCategory}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/cart' component={Cart}/>
            <Route exact path='/checkout' component={Address}/>
            <Route exact path='/summary' component={Summary}/>
            <Route exact path='/thankyou' component={Thankyou}/>
            <Route exact path='/admin' component={Admin}/>
            <Route exact path='/search/:key' component={MapSearch}/>
            <Route exact path='/orderhistory' component={UserOrder}/>
            <Route exact path="/userorder/:id" component={UserOrderDetails}/>   
            </Switch>
         </React.Fragment>
         </Router>
         </AddressState>
         </ProductState>
         </AuthState>
         </OrderState>
         </AlertProvider>
  );
}

export default App;
