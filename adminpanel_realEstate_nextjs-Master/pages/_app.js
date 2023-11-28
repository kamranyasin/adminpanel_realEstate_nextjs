import Layout from "../layout";
import React, { useEffect } from "react";
import "../public/assets/scss/admin.scss";
import { ToastContainer } from 'react-toastify';
import Head from "next/head";
import { Provider } from 'react-redux';
import store from '../lib/store/store';


function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)  
    

  return (
    <>
      <Head>
        <title>HOMES-BEYOND - Admin dashboard page</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i,600,600i,700,700i,800,800i" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i" rel="stylesheet" />
      </Head>
      <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      </Provider>
      <ToastContainer theme="light" />
    </>
  );
}

export default MyApp;
