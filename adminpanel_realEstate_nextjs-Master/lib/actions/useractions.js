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

    ALL_AGENTS_FAIL,
    ALL_AGENTS_REQUEST,
    ALL_AGENTS_SUCCESS,

    
    SINGLE_AGENT_REQUEST,
    SINGLE_AGENT_SUCCESS,
    SINGLE_AGENT_FAIL,

    UPDATE_AGENT_REQUEST,
    UPDATE_AGENT_SUCCESS,
    UPDATE_AGENT_FAIL,

    CLEAR_ERRORS,
    

} from '../constants/userconstants'

import axios from 'axios'
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');


export const login = (email, password) => async (dispatch) => {

    try {
      
      dispatch({ type: LOGIN_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );

      console.log(data);

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });

      return data;
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message });
    }
};



export const userDetail = () => async (dispatch) => {


    try {

        const token = Cookies.get('token');

        const decodedToken = jwt.decode(token);
        const userid = decodedToken ? decodedToken.userid : null;
        console.log("userid",userid);


        if(userid){
          dispatch({type: LOAD_USER_REQUEST});

          let link = `/api/v1/user/detail/${userid}`;

          const {data} = await axios.get(link);
          console.log("datauser", data);

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data.user,
            })
        }
        
        
    } catch (error) {
        dispatch({type: LOAD_USER_FAIL, payload: error.response?.data?.message});
    }

}



//user detail for header
export const userLogOut = () => async (dispatch) => {

    try {


        await axios.get(`/api/v1/user/logout`);

        dispatch({
            type: LOGOUT_USER_SUCCESS,
        })
        
    } catch (error) {
        dispatch({type: LOGOUT_USER_FAIL, payload: error.response?.data?.message});
    }

}



// ADD AGENT
export const addAgent = (agent) => async (dispatch) => {


    try {
  
      dispatch({ type: ADD_AGENT_REQUEST });

      const token = Cookies.get('token');
      const decodedToken = jwt.decode(token);
      //const type = decodedToken ? decodedToken.userType : null;


        const formData = new FormData();

        Object.entries(agent).forEach(([key, value]) => {

          if (Array.isArray(value)) {

            value.forEach((item) => formData.append(key, item));
            
          } else {
            formData.append(key, value);
          }
        });
  
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  
        const { data } = await axios.post(`/api/v1/createAgent`, formData, config);
  
        dispatch({ type: ADD_AGENT_SUCCESS, payload: data.user });
      

    } catch (error) {
      dispatch({ type: ADD_AGENT_FAIL, payload: error.response?.data?.message });
    }
  };


// all agents
export const allAgent = () => async(dispatch) =>{

  try {
    dispatch({ type: ALL_AGENTS_REQUEST });
  
    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const type = decodedToken ? decodedToken.userType : null;

    if (type === 'admin') {
      let link = `/api/v1/allAgents`;

        const {data} = await axios.get(link);

        dispatch({
            type: ALL_AGENTS_SUCCESS,
            payload: data
        })
    }else {
      dispatch({ type: ADD_AGENT_FAIL, payload: 'Unauthorized' });
    }

  } catch (error) {
          dispatch({ type: ALL_AGENTS_FAIL, payload: error.response?.data?.message });

  }

}



export const SingleAgent = (id) => async(dispatch) =>{

  try {
    dispatch({ type: SINGLE_AGENT_REQUEST });
  
    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const type = decodedToken ? decodedToken.userType : null;

    if (type === 'admin') {

      let link = `/api/v1/agents/agent/${id}`;
      console.log('Fetching agent data from:', link);


        const {data} = await axios.get(link);

        dispatch({
            type: SINGLE_AGENT_SUCCESS,
            payload: data
        })
    }else {
      dispatch({ type: SINGLE_AGENT_FAIL, payload: 'Unauthorized' });
    }

  } catch (error) {
          dispatch({ type: SINGLE_AGENT_FAIL, payload: error.response?.data?.message });

  }

}



export const UpdateAgent = (id, updateProfile) => async (dispatch) => {

  try {

    dispatch({ type: UPDATE_AGENT_REQUEST });

    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const type = decodedToken ? decodedToken.userType : null;
    console.log('ids', id);

    if (type === 'admin') {

      const formData = new FormData();

      Object.entries(updateProfile).forEach(([key, value]) => {
        console.log('Inside forEach loop');
        
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };


      const { data } = await axios.put(`/api/v1/agents/updateAgents/${id}`, formData, config);

      dispatch({ type: UPDATE_AGENT_SUCCESS, payload: data.success });
    } else {
      dispatch({ type: UPDATE_AGENT_FAIL, payload: 'Unauthorized' });
    }
  } catch (error) {
    dispatch({ type: UPDATE_AGENT_FAIL, payload: error.response?.data?.message });
  }
};

// clearing errors

export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}

