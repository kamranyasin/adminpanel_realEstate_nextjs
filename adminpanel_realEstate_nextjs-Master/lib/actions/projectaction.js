import {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,

  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,

  ALL_PROJECTS_REQUEST,
  ALL_PROJECTS_SUCCESS,
  ALL_PROJECTS_FAIL,

  SINGLE_PROJECT_REQUEST,
  SINGLE_PROJECT_SUCCESS,
  SINGLE_PROJECT_FAIL,

  CLEAR_ERRORS,
} from "../constants/projectconstants";

import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jsonwebtoken");




export const createProject = (project) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PROJECT_REQUEST });

    const token = Cookies.get("token");

    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;
    console.log("userid", id);

    const formData = new FormData();


    // Append the blue_print_images files dynamically
    for (var i = 0; i < project.blue_print_images.length; i++) {
      formData.append("blue_print_images", project.blue_print_images[i]);
    }

    // Append the blue_prints objects dynamically
    for (var i = 0; i < project.blue_prints.length; i++) {
      formData.append("blue_prints", JSON.stringify(project.blue_prints[i]));
    }

    // Append the scalar values
    formData.append("city", project.city);
    formData.append("construction_status", project.construction_status);
    formData.append("country", project.country);
    formData.append("developer_name", project.developer_name);
    formData.append("first_installment", project.first_installment);
    formData.append("handover_status", project.handover_status);
    formData.append("life_style", project.life_style);
    formData.append("location_area", project.location_area);
    formData.append("map_pin", project.map_pin);
    formData.append("project_type", project.project_type);
    formData.append("starting_price", project.starting_price);
    formData.append("title", project.title);
    formData.append("yt_video", project.yt_video);

    // Append the description as an array
    for (var i = 0; i < project.description.length; i++) {
      formData.append("description", project.description[i]);
    }

    // Append the features as an array
    for (var i = 0; i < project.features.length; i++) {
      formData.append("features", project.features[i]);
    }

    // Append the tags as an array
    for (var i = 0; i < project.tags.length; i++) {
      formData.append("tags", project.tags[i]);
    }

    // Append the listing object
    formData.append("listing", JSON.stringify(project.listing));

    // Append the images files dynamically
    for (var i = 0; i < project.images.length; i++) {
      formData.append("images", project.images[i]);
    }

    console.log(formData);

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    console.log(formData, "data=========");
    const { data } = await axios.post(
      `/api/v1/createProject/${id}`,
      formData,
      config
    );

    dispatch({ type: ADD_PROJECT_SUCCESS, payload: data.createProject });
  } catch (error) {
    dispatch({
      type: ADD_PROJECT_FAIL,
      payload: error.response?.data?.message,
    });
    console.log(error);
  }
};






export const updateProject = (slug, project) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });

    const token = Cookies.get("token");
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;
    console.log("userid", id);

    const formData = new FormData();

    // Append blue_print_images files dynamically
    if (project.blue_print_images && project.blue_print_images.length > 0) {
      for (let i = 0; i < project.blue_print_images.length; i++) {
        formData.append("blue_print_images", project.blue_print_images[i]);
      }
    }

    // Append blue_prints objects dynamically
    if (project.blue_prints && project.blue_prints[0].area !== "") {
      for (let i = 0; i < project.blue_prints.length; i++) {
        formData.append("blue_prints", JSON.stringify(project.blue_prints[i]));
      }
    }

    formData.append("yt_video", project.yt_video);

    // Append description as an array
    if (project.description && project.description[0] !== "") {
      for (let i = 0; i < project.description.length; i++) {
        formData.append("description", project.description[i]);
      }
    }

    // Append listing object
    if (project.listing) {
      formData.append("listing", JSON.stringify(project.listing));
    }

    // Append images files dynamically
    if (project.images && project.images.length > 0) {
      for (let i = 0; i < project.images.length; i++) {
        formData.append("images", project.images[i]);
      }
    }

    // Append scalar values
    const scalarFields = [
      "city",
      "construction_status",
      "country",
      "developer_name",
      "first_installment",
      "handover_status",
      "life_style",
      "location_area",
      "map_pin",
      "project_type",
      "starting_price",
      "title",
    ];
    scalarFields.forEach((field) => {
      if (project[field]) {
        formData.append(field, project[field]);
      }
    });

    console.log(formData);

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(
      `/api/v1/project/updateProject/${slug}`,
      formData,
      config
    );

    dispatch({ type: UPDATE_PROJECT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response?.data?.message,
    });
  }
};



export const getProjects = () => async (dispatch) => {

  try {

    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;

    dispatch({type: ALL_PROJECTS_REQUEST})

    let link = `/api/v1/project/Allprojects/${id}`
    const {data} = await axios.get(link)

    dispatch({
      type: ALL_PROJECTS_SUCCESS,
      payload: data
    })

    
  } catch (error) {
    dispatch({ type: ALL_PROJECTS_FAIL, payload: error.response?.data?.message });
  }

}



export const getProject = (slug) => async (dispatch) => {

  try {

    const token = Cookies.get('token');
    const decodedToken = jwt.decode(token);
    const id = decodedToken ? decodedToken.userid : null;

    dispatch({type: SINGLE_PROJECT_REQUEST})

    let link = `/api/v1/project/project/${slug}`
    const {data} = await axios.get(link)

    dispatch({
      type: SINGLE_PROJECT_SUCCESS,
      payload: data
    })

    
  } catch (error) {
    dispatch({ type: SINGLE_PROJECT_FAIL, payload: error.response?.data?.message });
  }

}




export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
