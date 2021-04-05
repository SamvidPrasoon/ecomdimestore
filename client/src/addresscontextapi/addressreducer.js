import {
    GET_ADDRESS,
    POST_ADDRESS
} from '../types';



export default (state,action)=>{

    switch(action.type){

        case POST_ADDRESS:
            return {
                ...state,
                  newaddress:action.payload
            }
        case GET_ADDRESS:
            return {
                ...state,
                address:action.payload
            }
            default:
                return state;
    }
}