import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import {useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const Index = () => {


  const router = useRouter();
  const {isAuthenticated} = useSelector(state=>state.user);


  
  useEffect(() => {

    const token = Cookies.get('token');    
    console.log(token);

    if(!isAuthenticated || !token){
      router.push('/authentication/login')
    }
  }, [isAuthenticated])

  return (
    <>
      <Loader />
    </>
  )
};

export default Index;
