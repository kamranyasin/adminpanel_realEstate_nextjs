import React, { useEffect } from 'react';
import EditBlog from '../edit-blog'
import { getBlog } from '../../../lib/actions/blogaction';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const blogPage = ()=> {

  const router = useRouter();
  const { slug } = router.query;
    console.log(slug);
  const { blog } = useSelector((state) => state.blog);

  const dispatch = useDispatch();

    useEffect(() => {
        if (slug) {
        console.log('Dispatching single blog');
        dispatch(getBlog(slug));
        }
    }, [dispatch, slug]);


  return <EditBlog blog={blog} />;

 
};

export async function getServerSideProps(context) {
  const { slug } = context.query;

  return {
    props: {
      slug,
    },
  };
}

export default blogPage;
