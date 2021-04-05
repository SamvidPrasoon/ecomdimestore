import {
    CLEAR_ERRORS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    ALL_USERS,
    STATUS,
    DELETE_USER
} from '../types'





export default (state,action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
                 ...state,
                 ...action.payload,
                 loading:false,
                 isAuthenticated:true,
                 
 
            }
            
     
         case REGISTER_FAIL :
         case LOGIN_FAIL: 
         
             localStorage.removeItem('token')
             return{
                 ...state,
                 token:null,
                 loading:false,
                 isAuthenticated:false,
                 error:action.payload
             }
             case CLEAR_ERRORS :
                 localStorage.removeItem('token')
                 return{
                     ...state,
                     error:''
                 }
             case USER_LOADED:
                 return {
                     ...state,
                     isAuthenticated:true,
                     loading:false,
                     user:action.payload
 
                 }
              case ALL_USERS:
                  return {
                       ...state,
                       users:action.payload
                  }   
             case AUTH_ERROR:
                 localStorage.removeItem('token')
                 return {
                     ...state,
                     token:null,
                     isAuthenticated:false,
                     loading:false,
                     
                 }
                 case LOGOUT:
                    localStorage.removeItem('token')
                    return{
                        ...state,
                        token:null,
                        isAuthenticated:false,
                        user:null,
                        loading:false
                    }
                case STATUS:
                    return {
                        ...state,
                        status:action.payload
                    }
                case DELETE_USER:
                    return{
                        ...state,
                        deleteduser:action.payload
                    }
             
        default:
            return state;
    }
 
 
 
 
 
 }