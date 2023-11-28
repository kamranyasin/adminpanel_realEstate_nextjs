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


import axios from 'axios'
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');


// add property
export const addProperty = (property) => async (dispatch) => {


    try {

        dispatch({ type: ADD_PROPERTY_REQUEST });
    
        const token = Cookies.get('token');
        const decodedToken = jwt.decode(token);
        const id = decodedToken ? decodedToken.userid : null;

        const formData = new FormData();

        Object.entries(property).forEach(([key, value]) => {

            if (Array.isArray(value)) {
  
              value.forEach((item) => formData.append(key, item));
              
            } else {
              formData.append(key, value);
            }
          });

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        const { data } = await axios.post(`/api/v1/createProperty/${id}`, formData, config);

        dispatch({ type: ADD_PROPERTY_SUCCESS, payload: data.createProperty });


    } catch (err) {
        dispatch({ type: ADD_PROPERTY_FAIL, payload: err.response?.data?.message });
    }

}


export const allProperties = () => async(dispatch) =>{

  try {

    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;
    const type = decodedToken ? decodedToken.userType: null;
    console.log('type',type);

    if(type === 'agent'){

    dispatch({ type: ALL_PROPERTIES_REQUEST });

      let link = `/api/v1/agent/properties/${id}`

      const {data} = await axios.get(link)

      dispatch({
        type: ALL_PROPERTIES_SUCCESS,
        payload: data
      })
    }


  }catch(error){
    dispatch({ type: ALL_PROPERTIES_FAIL, payload: error.response?.data?.message });
  }

}



export const userProperties = () => async(dispatch) =>{

  try {

    dispatch({ type: USER_PROPERTIES_REQUEST });
  

    let link = `/api/v1/properties`

    const {data} = await axios.get(link)

    dispatch({
      type: USER_PROPERTIES_SUCCESS,
      payload: data
    })


  }catch(error){
    dispatch({ type: USER_PROPIESRTY_FAIL, payload: error.response?.data?.message });
  }

}


export const singleProperties = (slug) => async(dispatch) =>{

  try {

    dispatch({ type: SINGLE_PROPERTY_REQUEST });
  
    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;

    let link = `/api/v1/agents/properties/${slug}`

    const {data} = await axios.get(link)
    console.log(data);
    dispatch({
      type: SINGLE_PROPERTY_SUCCESS,
      payload: data
    })


  }catch(error){
    dispatch({ type: SINGLE_PROPERTY_FAIL, payload: error.response?.data?.message });
  }

}



export const updateProperties = (slug, updateProperty) => async(dispatch) =>{

  try {

    dispatch({ type: UPDATE_PROPERTY_REQUEST });
    
    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const user = decodedToken ? decodedToken.userid : null;

    const formData = new FormData();

    Object.entries(updateProperty).forEach(([key, value]) => {

        if (Array.isArray(value)) {

          value.forEach((item) => formData.append(key, item));
          
        } else {
          formData.append(key, value);
        }
      });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const { data } = await axios.put(`/api/v1/properties/updateProperty/${user}/${slug}`, formData, config);

    dispatch({ type: UPDATE_PROPERTY_SUCCESS, payload: data.success });


  }catch(error){
    dispatch({ type: UPDATE_PROPERTY_FAIL, payload: error.response?.data?.message });
  }

}


export const deleteProperty = (slug) => async(dispatch) =>{

  try {

    dispatch({ type: DELETE_PROPERTIES_REQUEST });

    const { data } = await axios.delete(`/api/v1/agents/property/delete/${slug}`);

    dispatch({ type: DELETE_PROPERTIES_SUCCESS, payload: data.success });


  }catch(error){
    dispatch({ type: DELETE_PROPIESRTY_FAIL, payload: error.response?.data?.message });
  }

}



export const clearErrors = () => async (dispatch) => {

  dispatch({type: CLEAR_ERRORS})

}