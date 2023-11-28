import React, { useEffect } from 'react';
import Profile from '../profile';
import { SingleAgent } from '../../../lib/actions/useractions';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const UserProfilePage = ()=> {

  const router = useRouter();
  console.log('router.asPath', router.asPath);
  const { id } = router.query;
  console.log('id', id);

  const dispatch = useDispatch();
  const { agent } = useSelector((state) => state.agent);

  console.log('agent', agent);

  useEffect(() => {
    if (id) {
      console.log('Dispatching SingleAgent action');
      dispatch(SingleAgent(id));
    }
  }, [dispatch, id]);

  return <Profile agent={agent} />;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log('id',id);

  return {
    props: {
      id,
    },
  };
}

export default UserProfilePage;
