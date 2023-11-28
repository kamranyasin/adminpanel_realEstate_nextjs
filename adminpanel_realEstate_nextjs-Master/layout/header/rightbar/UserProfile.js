import Link from 'next/link'
import React, {useEffect} from 'react'
import { FileText, LogIn, User } from 'react-feather'
import store from '../../../lib/store/store'
import {userLogOut} from '../../../lib/actions/useractions'
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import {userDetail} from '../../../lib/actions/useractions'
import { useSelector } from "react-redux";


const UserProfile = () => {
    const router = useRouter();

    const handleLogout = () => {

        Cookies.remove('token');
        localStorage.clear();
        sessionStorage.clear();

        store.dispatch(userLogOut());
        router.push('/authentication/login')
    };


    const {user} = useSelector((state)=>state.user);


    useEffect(() => {

        store.dispatch(userDetail());
        
    }, []);
    
    return (
        <li className="profile-avatar onhover-dropdown">
            <div>
                <img src={user && user.avatar && user.avatar[0] && user.avatar[0].imageUrl} className="img-fluid" alt='' />
            </div>
            <ul className="profile-dropdown onhover-show-div">
                {/* <li>
                    <Link href='/manage-users/profile'>
                        <span>Account </span>
                        <User />
                    </Link>
                </li>
                <li>
                    <Link href='/myproperties/propertylist'>
                        <span>Listing</span>
                        <FileText />
                    </Link>
                </li> */}
                <li className='reset-link'>
                    <div onClick={handleLogout} type='submit'>
                        <span>Log Out</span>
                        <LogIn />
                    </div>
                </li>
            </ul>
        </li>
    )
}

export default UserProfile