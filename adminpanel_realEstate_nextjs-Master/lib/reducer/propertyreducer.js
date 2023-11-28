import {
    ADD_PROPERTY_REQUEST,
    ADD_PROPERTY_SUCCESS,
    ADD_PROPERTY_FAIL,
    UPDATE_PROPERTY_REQUEST,
    UPDATE_PROPERTY_SUCCESS,
    UPDATE_PROPERTY_RESET,
    UPDATE_PROPERTY_FAIL,
    ALL_PROPERTIES_REQUEST,
    ALL_PROPERTIES_SUCCESS,
    ALL_PROPERTIES_FAIL,
    SINGLE_PROPERTY_REQUEST,
    SINGLE_PROPERTY_SUCCESS,
    SINGLE_PROPERTY_FAIL,

    USER_PROPERTIES_REQUEST,
    USER_PROPERTIES_SUCCESS,
    USER_PROPIESRTY_FAIL,

    DELETE_PROPERTIES_REQUEST,
    DELETE_PROPERTIES_SUCCESS,
    DELETE_PROPIESRTY_RESET,
    DELETE_PROPIESRTY_FAIL,
    

    CLEAR_ERRORS
} from '../constants/propertiesconstants'



export const createPropertyReducer = (state = {createProperty: []}, action) =>{

    switch(action.type){
    

        case ADD_PROPERTY_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case ADD_PROPERTY_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                property: action.payload,
            }

        case ADD_PROPERTY_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                property: null,
                error: action.payload,
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }
    
        default:
            return state; 
    }

}

export const getProperties = (state = {properties: []}, action)=>{

    switch(action.type){
        
        case ALL_PROPERTIES_REQUEST:
        case USER_PROPERTIES_REQUEST:
            return{
                loading: true,
                properties: []
            }

        case ALL_PROPERTIES_SUCCESS:
        case USER_PROPERTIES_SUCCESS:
            return{
                loading: false,
                properties: action.payload.properties
            }
        
        case ALL_PROPERTIES_FAIL:
        case USER_PROPIESRTY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
            
        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
    }

}

export const getProperty = (state = {property: {}}, action)=>{

    switch(action.type){
        
        case SINGLE_PROPERTY_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case SINGLE_PROPERTY_SUCCESS:
            return{
                ...state,
                loading: false,
                property: action.payload
            }
        
        case SINGLE_PROPERTY_FAIL:
            return{
                loading: false,
                error: action.payload
            }
            
        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state
    }

}


export const updatePropertyReducer = (state = { }, action) => {

    switch (action.type) {


        case UPDATE_PROPERTY_REQUEST:
            return{
                ...state,
                loading: true,
            }
        
        case UPDATE_PROPERTY_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        
        case UPDATE_PROPERTY_RESET:
            return{
                ...state,
                isUpdated: false,
            }

        case UPDATE_PROPERTY_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }

        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        
      default:
        return state;
    }
}

export const deletePropertyReducer = (state = {}, action) => {

    switch (action.type) {


        case DELETE_PROPERTIES_REQUEST:
            return{
                loading: true,
                ...state,
            }
        
        case DELETE_PROPERTIES_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        
       

        case DELETE_PROPIESRTY_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }


        case DELETE_PROPIESRTY_RESET:
            return{
                ...state,
                isDeleted: false,
            }

        case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        
      default:
        return state;
    }
}