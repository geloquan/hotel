import React, { useState } from 'react';
import { RouteList } from './RouteList';
import { Link, useLocation } from 'react-router-dom';
import { FaRightFromBracket } from 'react-icons/fa6';

const PathLink = (parts) => {
    const location = useLocation();
    const { pathname } = location;
    return pathname.split('/')[parts];
};

const SidebarDivider = () => {
    return <hr className='m-0 mb-2' />;
};

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        if (route.divider) {
            return <SidebarDivider key={index} title={route.divider} />;
        }

        return (
            <Link key={index} to={route.route} className='list-group-item rounded-5 bg-transparent d-flex align-items-center'>
                {route.icon}
                {route.name}
            </Link>
        );
    });
};

export const SideBar = () => {
    return (
        <>
        <div className="mx-2 my-2">
            {renderRoutes(RouteList)}
        </div>
        </>
    );
};

export default SideBar;