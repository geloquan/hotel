import React, { useState } from 'react';
import { SideBar } from './SideBar';
import { useLocation, Outlet } from 'react-router-dom';
import { FaAlignLeft, FaCircleUser } from 'react-icons/fa6'; 
// import RSJLOGO from '../images/RSJLOGO.png';
// import { UserSession } from '../FldrAuthentication/SessionComponent';

export const MainLayout = () => {
    const Location = useLocation();

    const title = Location.pathname.split("/").filter(Boolean).pop().replace(/-/g, " ");
    const [toggle, setToggled] = useState(false);

    const handleToggled = () => {
        setToggled(!toggle);
    };

    return (
        <>
            <div className={`d-flex ${toggle ? "toggled" : ""}`} id="wrapper" >
                    {/* Sidebar */}
                    <div className="shadow sidebar-bg" id="sidebar-wrapper" >
                        <div className='h-100 overflow-y-auto overflow-x-hidden'>
                        <div className="d-flex align-items-center justify-content-center primary-text p-4 fs-4 fw-bold text-uppercase sticky-top" style={{background:'rgba(254, 250, 224, 0.1)', backdropFilter:'blur(5px)'}}>
                        </div>

                        <SideBar />
                        </div>
                    </div>

                    <div className='container-fluid p-0 m-0 overflow-y-auto' id='page-content-wrapper'>
                        <nav className="navbar navbar-expand-lg main-bg py-4 px-4 d-flex justify-content-between sticky-top" style={{background:'rgba(254, 250, 224, 0.5)', backdropFilter:'blur(5px)'}}>
                            <div className="d-flex align-items-center ">
                                <FaAlignLeft
                                    className='primary-text fs-4 me-3'
                                    onClick={() => handleToggled()}
                                />
                                <h2 className="fs-2 m-0 text-capitalize">{title}</h2>
                            </div>
                        </nav>
                    </div> 

            </div>
        </>
    )
}
