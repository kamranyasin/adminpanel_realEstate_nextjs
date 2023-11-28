import {
    ADD_BLOG_REQUEST,
    ADD_BLOG_SUCCESS,
    ADD_BLOG_FAIL,

    
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,

    ALL_BLOGS_REQUEST,
    ALL_BLOGS_SUCCESS,
    ALL_BLOGS_FAIL,

    SINGLE_BLOG_REQUEST,
    SINGLE_BLOG_SUCCESS,
    SINGLE_BLOG_FAIL,

    CLEAR_ERRORS
} from '../constants/blogconstants';



import axios from 'axios'
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');

export const createBlog = (blog) => async (dispatch) => {

    try {

        dispatch({ type: ADD_BLOG_REQUEST });

        const token = Cookies.get('token');

        const decodedToken = jwt.decode(token);
        const id = decodedToken ? decodedToken.userid : null;

        
        const formData = new FormData();

        Object.entries(blog).forEach(([key, value]) => {
            console.log(value);
            if (Array.isArray(value)) {
  
              value.forEach((item) => formData.append(key, item, item.name));
              
            } else {
              formData.append(key, value);
            }
          });

          //console.log('formData',formData);

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post(`/api/v1/createBlog/${id}`, formData, config);

        dispatch({ type: ADD_BLOG_SUCCESS, payload: data.createBlog });


    }catch(error){
        dispatch({ type: ADD_BLOG_FAIL, payload: error.response?.data?.message });

    }

}


export const updateBlog = (slug, blog) => async (dispatch) => {

  try {

    dispatch({ type: UPDATE_BLOG_REQUEST });

    console.log("blogg", blog);

    const formData = new FormData();

    Object.entries(blog).forEach(([key, value]) => {
        console.log(value);
        if (Array.isArray(value)) {

          value.forEach((item) => formData.append(key, item, item.name));
          
        } else {
          formData.append(key, value);
        }
      });

    const config = { headers: { 'Content-Type': 'multipart/form-data' }};

    const { data } = await axios.put(`/api/v1/updateBlog/${slug}`, formData, config);

    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data.success });


    
  } catch (error) {
    dispatch({ type: UPDATE_BLOG_FAIL, payload: error.response?.data?.message });
  }

}



export const getBlogs = () => async (dispatch) => {

  try {

    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;

    dispatch({type: ALL_BLOGS_REQUEST})

    let link = `/api/v1/Allblogs/${id}`
    const {data} = await axios.get(link)

    dispatch({
      type: ALL_BLOGS_SUCCESS,
      payload: data
    })

    
  } catch (error) {
    dispatch({ type: ALL_BLOGS_FAIL, payload: error.response?.data?.message });
  }

}


export const getBlog = (slug) => async (dispatch) => {

  try {

    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;

    dispatch({type: SINGLE_BLOG_REQUEST})

    let link = `/api/v1/Allblogs/blog/${slug}`
    const {data} = await axios.get(link)

    dispatch({
      type: SINGLE_BLOG_SUCCESS,
      payload: data
    })

    
  } catch (error) {
    dispatch({ type: SINGLE_BLOG_FAIL, payload: error.response?.data?.message });
  }

}


export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}