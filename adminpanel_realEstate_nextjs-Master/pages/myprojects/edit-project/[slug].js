import React, { useEffect } from 'react';
import EditProject from '../edit-project'
import { getProject } from '../../../lib/actions/projectaction';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const projectPage = ()=> {

  const router = useRouter();
  const { slug } = router.query;
    console.log(slug);

  const { project } = useSelector((state) => state.project);

  const dispatch = useDispatch();

    useEffect(() => {
        if (slug) {
        console.log('Dispatching single project');
        dispatch(getProject(slug));
        }
    }, [dispatch, slug]);

  

  return <EditProject project={project} />;

 
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  return {
    props: {
      slug,
    },
  };
}

export default projectPage;
