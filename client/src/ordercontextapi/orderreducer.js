import {
     CREATE_ORDER,
     ALL_ORDERS,
     PER_ORDER,
     GET_USER,
     PAID,
     DELIVERED,
     PER_USERORDER
}from '../types'



export default (state,action)=>{

     switch(action.type)
     {
         case CREATE_ORDER:
         case PER_ORDER:
         return {
             ...state,
             order:action.payload
         }
         case GET_USER:
             return{
                 ...state,
                 user:action.payload
             }
         case ALL_ORDERS:
             return {
                 ...state,
                 orders:action.payload
             }
          case PAID:
              return{
                  ...state,
                  status:action.payload
              }
              case DELIVERED:
              return{
                  ...state,
                  status:action.payload
              }
         case PER_USERORDER:
             return{
                 ...state,
                 orders:action.payload
             }
         default:
             return state;
     }







}