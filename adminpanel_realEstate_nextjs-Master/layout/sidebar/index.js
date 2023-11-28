import Link from "next/link";
import React, {useEffect} from "react";
import { ChevronsLeft } from "react-feather";
import { Media } from "reactstrap";
import SidebarMenu from "./SidebarMenu";
import {userDetail} from '../../lib/actions/useractions'
import store from '../../lib/store/store';
import { useSelector } from "react-redux";
import Loader from '../../layout/Loader'




const Sidebar = ({ toggle, setToggle }) => {


  const {loading, user} = useSelector((state)=>state.user);


  useEffect(() => {

    store.dispatch(userDetail());

  }, []);

  return (
    <div className={`page-sidebar ${!toggle ? 'close_icon' : ''}`}>
      <div className="logo-wrap">
        <Link href='/dashboard'>
          <img src="/assets/images/logo/4.png" className="img-fluid for-light" alt='' />
          <img src="/assets/images/logo/9.png" className="img-fluid for-dark" alt='' />
        </Link>
        <div className="back-btn d-lg-none d-inline-block">
          <ChevronsLeft onClick={() => { setToggle(!toggle) }} />
        </div>
      </div>
      <div className="main-sidebar">
        <div className="user-profile">
        {loading ? <Loader/> : (
          <Media className="media">
            <div className="change-pic">
              <img src={user && user.avatar && user.avatar[0] && user.avatar[0].imageUrl} className="img-fluid" alt='' />
            </div>
            <Media body className="media-body">
              <Link href='/manage-users/profile'>
                <h6>{user && user.firstname} {user && user.lastname}</h6>
              </Link>
              <span className="font-roboto">{user && user.email}</span>
            </Media>
          </Media>
        )}
        </div>
        <div id="mainsidebar">
          <SidebarMenu />
        </div >
      </div >
    </div >
  );
};

export default Sidebar;
