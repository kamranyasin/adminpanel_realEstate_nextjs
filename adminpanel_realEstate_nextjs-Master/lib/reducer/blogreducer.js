import {
    ADD_BLOG_REQUEST,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_FAIL,

    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_RESET,
    UPDATE_BLOG_FAIL,

    ALL_BLOGS_REQUEST,
    ALL_BLOGS_SUCCESS,
    ALL_BLOGS_FAIL,

    SINGLE_BLOG_REQUEST,
    SINGLE_BLOG_SUCCESS,
    SINGLE_BLOG_FAIL,

    CLEAR_ERRORS
} from '../constants/blogconstants';



export const createBlogReducer = (state = {createBlog: []}, action) =>{

    switch(action.type){
    

        case ADD_BLOG_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            }

        case ADD_BLOG_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                blog: action.payload,
            }

        case ADD_BLOG_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                blog: null,
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


export const updateBlogReducer = (state = { }, action) => {

    switch (action.type) {


        case UPDATE_BLOG_REQUEST:
            return{
                loading: true,
                ...state,
            }
        
        case UPDATE_BLOG_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        
        case UPDATE_BLOG_RESET:
            return{
                ...state,
                isUpdated: false,
            }

        case UPDATE_BLOG_FAIL:
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



export const getBlogs = (state = {blogs: []}, action)=>{

    switch(action.type){
        
        case ALL_BLOGS_REQUEST:
            return{
                loading: true,
                blogs: []
            }

        case ALL_BLOGS_SUCCESS:
            return{
                loading: false,
                blogs: action.payload.blogs
            }
        
        case ALL_BLOGS_FAIL:
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


export const getBlog = (state = {blog: {}}, action)=>{

    switch(action.type){
        
        case SINGLE_BLOG_REQUEST:
            return{
                loading: true,
                ...state,
            }

        case SINGLE_BLOG_SUCCESS:
            return{
                ...state,
                loading: false,
                blog: action.payload
            }
        
        case SINGLE_BLOG_FAIL:
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