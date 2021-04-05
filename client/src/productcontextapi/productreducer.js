import {
      GET_PRODUCTS,
      PRODUCT_ERROR,
      PER_PRODUCT,
      CATEGORY_PRODUCT,
      CART_PRODUCTS,
      GET_USER_ADDRESS,
      ADD_PRODUCT,
      UPDATED_PRODUCT,
      DELETED_PRODUCT,
      ADD_CATEGORY,
      DELETE_CATEGORY,
      GET_CATEGORY,
      ADD_REVIEW,
      SEARCHED,
      NO_SEARCH
} from '../types'



export default (state,action) => {
    switch(action.type)
    {
        case GET_PRODUCTS:
            return {
                ...state,
                search:[],
                products:action.payload
            }
            case PER_PRODUCT:
            return {
                ...state,
                loading2:false,
                product:action.payload
            }
            case CATEGORY_PRODUCT:
            return {
                ...state,
               
                categoryproducts:action.payload
            }
        case PRODUCT_ERROR:
            return {
                ...state,
              
                errors:action.payload
            }
        case CART_PRODUCTS:
            return{
                ...state,
                
                cart:[...state.cart,action.payload]
            }
        case GET_USER_ADDRESS:
            return {
                ...state,
               
                usercartaddress:action.payload
            }
        case ADD_PRODUCT:
            return {
                ...state,
                addedproduct:action.payload
            }
        case UPDATED_PRODUCT:
            return {
                ...state,
                updatedproduct:action.payload
            }  
        case DELETED_PRODUCT:
            return{
                ...state,
                deletedproduct:action.payload
            }  
        case ADD_CATEGORY:
            return{
                ...state,
                addcategory:action.payload
            }
        case DELETE_CATEGORY:
                return{
                    ...state,
                    addcategory:action.payload
                }
        case GET_CATEGORY:
            return{
                ...state,
                loading:false,
                category:action.payload
            }
        case ADD_REVIEW:
            return{
                ...state,
                reviews:action.payload
            }
        case SEARCHED:
            return {
                ...state,
                loading3:false,
                search:action.payload
            }
        case NO_SEARCH:
            return{
                ...state,
                found:action.payload
            }
            default:
                return state; 
    }
}


