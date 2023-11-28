import {
    ADD_PROJECT_REQUEST,
    ADD_PROJECT_SUCCESS,
    ADD_PROJECT_FAIL,

    UPDATE_PROJECT_REQUEST,
    UPDATE_PROJECT_SUCCESS,
    UPDATE_PROJECT_FAIL,
    UPDATE_PROJECT_RESET,

    ALL_PROJECTS_REQUEST,
    ALL_PROJECTS_SUCCESS,
    ALL_PROJECTS_FAIL,

    SINGLE_PROJECT_REQUEST,
    SINGLE_PROJECT_SUCCESS,
    SINGLE_PROJECT_FAIL,

    CLEAR_ERRORS
} from '../constants/projectconstants'



export const createProjectReducer = (state = {createProject: []}, action) =>{

    switch(action.type){
    

        case ADD_PROJECT_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case ADD_PROJECT_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                project: action.payload,
            }

        case ADD_PROJECT_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                project: null,
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


export const updateProjectReducer = (state = { }, action) => {

    switch (action.type) {


        case UPDATE_PROJECT_REQUEST:
            return{
                loading: true,
                ...state,
            }
        
        case UPDATE_PROJECT_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        
        case UPDATE_PROJECT_RESET:
            return{
                ...state,
                isUpdated: false,
            }

        case UPDATE_PROJECT_FAIL:
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


export const getProjects = (state = {projects: []}, action)=>{

    switch(action.type){
        
        case ALL_PROJECTS_REQUEST:
            return{
                loading: true,
                projects: []
            }

        case ALL_PROJECTS_SUCCESS:
            return{
                loading: false,
                projects: action.payload.projects
            }
        
        case ALL_PROJECTS_FAIL:
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


export const getProject = (state = {project: {}}, action)=>{

    switch(action.type){
        
        case SINGLE_PROJECT_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case SINGLE_PROJECT_SUCCESS:
            return{
                ...state,
                loading: false,
                project: action.payload
            }
        
        case SINGLE_PROJECT_FAIL:
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