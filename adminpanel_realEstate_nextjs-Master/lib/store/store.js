import { configureStore } from '@reduxjs/toolkit';
import {combineReducers } from "redux"
import thunk from "redux-thunk"
import {userReducer, agentReducer, singleAgentReducer, updateAgentReducer} from '../reducer/userreducer'
import {createPropertyReducer, getProperties, updatePropertyReducer, getProperty, deletePropertyReducer} from '../reducer/propertyreducer'
import {createProjectReducer, updateProjectReducer, getProjects, getProject} from '../reducer/projectreducer'
import {createBlogReducer, updateBlogReducer, getBlogs, getBlog} from '../reducer/blogreducer'



const reducer = combineReducers({


    //user
    user: userReducer,
    agents: agentReducer,
    agent: singleAgentReducer,
    updateProfile: updateAgentReducer,

    createProperty:createPropertyReducer,
    properties:getProperties,
    updateProperty:updatePropertyReducer,
    property:getProperty,
    deleteProduct: deletePropertyReducer,

    createProject:createProjectReducer,
    updateProject:updateProjectReducer,
    projects:getProjects,
    project:getProject,


    createBlog: createBlogReducer,
    updateBlog: updateBlogReducer,
    blogs: getBlogs,
    blog: getBlog


})


const middleware = [thunk]

const store = configureStore({

    reducer: reducer,

    middleware,

    devTools: process.env.NODE_ENV !== 'production',


})


export default store;