import React from 'react';
import thankyou from './thankyou.jpg'
import hand from './hand.jpg'
import {Link} from 'react-router-dom'
const Thankyou = () => {
    return ( 
        <React.Fragment>
            <center>
            <div className="container">

            
        <div className="display-2 text-info">
            [Dimestore]
        </div>
        <div className="display-4 mt-4">
            <img style={{width:"400px"}}src={thankyou} alt=""/> <br/>
            THANK YOU <br/>
            for shopping with us
        </div>
        <div>
            <img style={{width:"400px"}} src={hand} alt=""/> <br/>
            WOW! <br/>
            You've just joined an amazing <br/>
            group-our awesome Customers 
        </div>
        <div className="">
            Still hungry for shopping?<br/>
            Check out More <br/>
            <h1><Link to='/home' className="  mt-3 rounded btn btn-success">Return to Shopping</Link>
            </h1>
        </div>
        </div>
        </center>
        </React.Fragment>
     );
}
 
export default Thankyou;