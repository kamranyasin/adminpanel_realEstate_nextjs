import{
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    ADD_AGENT_REQUEST,
    ADD_AGENT_SUCCESS,
    ADD_AGENT_FAIL,

    ALL_AGENTS_REQUEST,
    ALL_AGENTS_SUCCESS,
    ALL_AGENTS_FAIL,

    SINGLE_AGENT_REQUEST,
    SINGLE_AGENT_SUCCESS,
    UPDATE_AGENT_RESET,
    SINGLE_AGENT_FAIL,

    UPDATE_AGENT_REQUEST,
    UPDATE_AGENT_SUCCESS,
    UPDATE_AGENT_FAIL,

    CLEAR_ERRORS

} from '../constants/userconstants'

export const userReducer = (state = {user: []}, action) =>{


    switch(action.type){

        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case ADD_AGENT_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }
    
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case ADD_AGENT_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGOUT_USER_SUCCESS:
            return{
                loading: false,
                user: null,
                isAuthenticated: false
            }
        
        case LOGIN_FAIL:
        case ADD_AGENT_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };

        case LOGOUT_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
    
        case LOAD_USER_FAIL:
            return{
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            };
    
        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state;    


    }

}


// ALL AGENTS
export const agentReducer = (state = {agents: [] }, action) =>{

    switch(action.type){
        case ALL_AGENTS_REQUEST:
            return{
                loading: true,
                agents: []
            }

        case  ALL_AGENTS_SUCCESS:
            return{
                loading: false,
                agents: action.payload.agents,
            }


        case  ALL_AGENTS_FAIL:
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


// single AGENT
export const singleAgentReducer = (state = { agent: {} }, action) => {

    switch (action.type) {
      case SINGLE_AGENT_REQUEST:
        return {
          loading: true,
          ...state,
        };

      case SINGLE_AGENT_SUCCESS:
        return {
          ...state,
          loading: false,
          agent: action.payload,
        };

      case SINGLE_AGENT_FAIL:
        return {
          loading: false,
          error: action.payload,
        };

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        
      default:
        return state;
    }
  };


// single AGENT
export const updateAgentReducer = (state = { }, action) => {

    switch (action.type) {

        case UPDATE_AGENT_REQUEST:
            return {
                ...state,
              loading: true,
            };
      
        case UPDATE_AGENT_SUCCESS:
        return {
            ...state,
            loading: false,
            isUpdated: action.payload,
        };
        
        case UPDATE_AGENT_RESET:
            return{
                ...state,
                isUpdated: false,
            }

        case UPDATE_AGENT_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };

      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
        
      default:
        return state;

    }

}