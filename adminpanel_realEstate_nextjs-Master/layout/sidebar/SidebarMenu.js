import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Airplay, BarChart, CreditCard, Grid, Home, Layout, Lock, MapPin, UserPlus, Users, PenTool } from "react-feather";
import { ChevronsRight } from 'react-feather';
import { SidebarMenuItem } from '../../data/sidebarMenu';
import store from '../../lib/store/store';
import {userDetail} from '../../lib/actions/useractions'
import {allProperties} from '../../lib/actions/propertyaction'
import { useSelector } from "react-redux";


const SidebarMenu = () => {
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState();
    const [chiledMenu, setChiledMenu] = useState();

    const {user} = useSelector((state)=>state.user);
    const {properties} = useSelector((state)=>state.properties);
    console.log('user',user);

    const type= user && user.type;

    useEffect(() => {
  
      store.dispatch(userDetail());
  
    }, []);

    useEffect(() => {
  
        store.dispatch(allProperties());
    
      }, []);

    const uniquePropertyTypes = new Set();

    properties && properties.forEach((property) => {
        uniquePropertyTypes.add(property.property_type.toLowerCase().replace(' ', '-'));
    });
    const uniqueProperties = Array.from(uniquePropertyTypes);

    useEffect(() => {
        if (router.asPath) {
            SidebarMenuItem.forEach((item) => {
                if (item.children) {
                    item.children.forEach((child) => {
                        if (child.path === router.asPath) { setChiledMenu(child.title); setActiveMenu(item.title); return true }
                        else return false;
                    })
                } else {
                    if (item.path === router.asPath) { setActiveMenu(item.title); return true }
                    else return false;
                }
            })
        }
    }, [router])

    return (
            <ul className="sidebar-menu custom-scrollbar">
                <li className="sidebar-item">
                    <Link href="/dashboard" className={`sidebar-link only-link ${activeMenu === '/dashboard' ? 'active' : ''}`} onClick={() => { setActiveMenu('/dashboard') }}>
                    <Airplay />
                    <span>Dashboard</span>
                    </Link>
                </li>

                
                {user && user.type === 'agent' ? (
                    <li className="sidebar-item">
                        <a href="#" className={`sidebar-link ${activeMenu === ('/myproperties') ? 'active' : ''}`} onClick={() => { setActiveMenu('/myproperties') }}>
                        <Grid />
                        <span>My Properties</span>
                        <div className="according-menu"><i className="fa fa-angle-right" /></div>
                        </a>
                        <ul className={`nav-submenu menu-content ${activeMenu === '/myproperties' ? 'd-block' : 'd-none'}`}>
                        <li>
                            <Link href="/myproperties/add-property" className={`${activeMenu === '/myproperties/add-property' ? 'active' : ''}`} onClick={() => { setChiledMenu('/myproperties/add-property') }}>
                            <ChevronsRight />
                            Add Property
                            </Link>
                        </li>
                        <li>
                            <Link href="/myproperties/propertylist" className={`${activeMenu === '/myproperties/propertylist' ? 'active' : ''}`} onClick={() => { setChiledMenu('/myproperties/propertylist') }}>
                            <ChevronsRight />
                            Property List
                            </Link>
                        </li>
                        </ul>
                    </li>
                ): null}
                
                {user && user.type === 'admin' ? (
                    <li className="sidebar-item">
                        <a href="#" className={`sidebar-link ${activeMenu === ('/agents') ? 'active' : ''}`} onClick={() => { setActiveMenu('/agents') }}>
                        <UserPlus />
                        <span>Agents</span>
                        <div className="according-menu"><i className="fa fa-angle-right" /></div>
                        </a>
                        <ul className={`nav-submenu menu-content ${activeMenu === '/agents' ? 'd-block' : 'd-none'}`}>
                        
                        <li>
                            <Link href="/agents/add-agent" className={`${activeMenu === '/agents/add-agent' ? 'active' : ''}`} onClick={() => { setChiledMenu('/agents/add-agent') }}>
                            <ChevronsRight />
                            Add Agent
                            </Link>
                        </li>
                        <li>
                            <Link href="/agents/all-agents" className={`${activeMenu === '/agents/all-agents' ? 'active' : ''}`} onClick={() => { setChiledMenu('/agents/all-agents') }}>
                            <ChevronsRight />
                            All Agents
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/agents/invoice" className={`${activeMenu === '/agents/invoice' ? 'active' : ''}`} onClick={() => { setChiledMenu('/agents/invoice') }}>
                            <ChevronsRight />
                            Invoice
                            </Link>
                        </li> */}
                        </ul>
                    </li>
                ): null}
              

                {user && user.type === 'admin' ? (
                    <li className="sidebar-item">
                        <a href="#" className={`sidebar-link ${activeMenu === ('/myblogs') ? 'active' : ''}`} onClick={() => { setActiveMenu('/myblogs') }}>
                        <PenTool />
                        <span>Blogs</span>
                        <div className="according-menu"><i className="fa fa-angle-right" /></div>
                        </a>
                        <ul className={`nav-submenu menu-content ${activeMenu === '/myblogs' ? 'd-block' : 'd-none'}`}>
                        
                        <li>
                            <Link href="/myblogs/add-blog" className={`${activeMenu === '/myblogs/add-blog' ? 'active' : ''}`} onClick={() => { setChiledMenu('/myblogs/add-blog') }}>
                            <ChevronsRight />
                            Add Blogs
                            </Link>
                        </li>
                        <li>
                            <Link href="/myblogs/bloglist" className={`${activeMenu === '/myblogs/bloglist' ? 'active' : ''}`} onClick={() => { setChiledMenu('/myblogs/bloglist') }}>
                            <ChevronsRight />
                            All Blogs
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/agents/invoice" className={`${activeMenu === '/agents/invoice' ? 'active' : ''}`} onClick={() => { setChiledMenu('/agents/invoice') }}>
                            <ChevronsRight />
                            Invoice
                            </Link>
                        </li> */}
                        </ul>
                    </li>
                ): null}

                {type === 'agent' ? (
                <li className="sidebar-item">
                <a href="#" className={`sidebar-link ${activeMenu === ('/types') ? 'active' : ''}`} onClick={() => { setActiveMenu('/types') }}>
                    <Layout />
                    <span>Types</span>
                    <div className="according-menu"><i className="fa fa-angle-right" /></div>
                </a>
                    <ul className={`nav-submenu menu-content ${activeMenu === '/types' ? 'd-block' : 'd-none'}`}>
                        {uniqueProperties.map((property, index) => (
                            <li key={index}>
                            <Link
                                href={`/types/${property}`}
                                className={`${activeMenu === `/types/${property}` ? 'active' : ''}`}
                                onClick={() => { setChiledMenu(`/types/${property}`) }}
                            >
                                <ChevronsRight />
                                {property}
                            </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                ): null}

                {type === 'agent' ? (
                    <li className="sidebar-item">
                        <a href="#" className={`sidebar-link ${activeMenu === ('/myprojects') ? 'active' : ''}`} onClick={() => { setActiveMenu('/myprojects') }}>
                        <Home />
                        <span>Projects</span>
                        <div className="according-menu"><i className="fa fa-angle-right" /></div>
                        </a>
                        <ul className={`nav-submenu menu-content ${activeMenu === '/myprojects' ? 'd-block' : 'd-none'}`}>
                        <li>
                            <Link href="/myprojects/add-project" className={`${activeMenu === '/myprojects/add-project' ? 'active' : ''}`} onClick={() => { setChiledMenu('/myprojects/add-project') }}>
                            <ChevronsRight />
                            Add Project
                            </Link>
                        </li>
                        <li>
                            <Link href="/myprojects/projectlist" className={`${activeMenu === '/myprojects/projectlist' ? 'active' : ''}`} onClick={() => { setChiledMenu('/myprojects/projectlist') }}>
                            <ChevronsRight />
                            Project List
                            </Link>
                        </li>
                        </ul>
                    </li>
                ): null}

                {/* <li className="sidebar-item">
                    <a href="#" className={`sidebar-link ${activeMenu === ('/manage-users') ? 'active' : ''}`} onClick={() => { setActiveMenu('/manage-users') }}>
                        <Users />
                        <span>Agent</span>
                        <div className="according-menu"><i className="fa fa-angle-right" /></div>
                    </a>
                    <ul className={`nav-submenu menu-content ${activeMenu === '/manage-users' ? 'd-block' : 'd-none'}`}>
                        <li>
                            <Link href="/manage-users/profile" className={`${activeMenu === '/manage-users/profile' ? 'active' : ''}`} onClick={() => { setChiledMenu('/manage-users/profile') }}>
                            <ChevronsRight />
                            Profile
                            </Link>
                        </li>
                    </ul>
                </li> */}

                {/* <li className="sidebar-item">
                <Link href="/reports" className={`sidebar-link only-link ${activeMenu === '/reports' ? 'active' : ''}`} onClick={() => { setActiveMenu('/reports') }}>
                    <BarChart />
                    <span>Reports</span>
                </Link>
                </li> */}

                {/* <li className="sidebar-item">
                <Link href="/payments" className={`sidebar-link only-link ${activeMenu === '/payments' ? 'active' : ''}`} onClick={() => { setActiveMenu('/payments') }}>
                    <CreditCard />
                    <span>Payments</span>
                </Link>
                </li> */}

            </ul>

    )
}

export default SidebarMenu