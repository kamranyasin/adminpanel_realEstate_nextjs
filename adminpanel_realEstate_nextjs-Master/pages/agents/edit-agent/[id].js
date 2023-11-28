import React, { useEffect } from 'react';
import EditAgent from '../edit-agent';
import { SingleAgent } from '../../../lib/actions/useractions';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const UserProfilePage = ()=> {

  const router = useRouter();
  console.log('router.asPath', router.asPath);
  const { id } = router.query;

  const dispatch = useDispatch();
  const { agent } = useSelector((state) => state.agent);

  useEffect(() => {
    if (id) {
      console.log('Dispatching SingleAgent action');
      dispatch(SingleAgent(id));
    }
  }, [dispatch, id]);

  return <EditAgent agent={agent} />;
};

export async function getServerSideProps(context) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

export default UserProfilePage;
