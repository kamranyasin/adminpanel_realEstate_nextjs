import React, { useEffect } from 'react';
import EditProperty from '../edit-property'
import { singleProperties } from '../../../lib/actions/propertyaction';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const propertiesPage = ()=> {

  const router = useRouter();
  const { slug } = router.query;
  

  return <EditProperty slug={slug} />;

 
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  return {
    props: {
      slug,
    },
  };
}

export default propertiesPage;
