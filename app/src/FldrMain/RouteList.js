import React from 'react';
// import { Dashboard } from "../Dashboard"
import Dashboard from '../FldrComponents/Dashboard';
import { FaTruck } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { BsCollection } from "react-icons/bs";

export const RouteList = [ 
    {
        type: "!collapse",
        name: "Dashboard",
        key: "dashboard",
        route: "/",
        layout: "/",
        icon: <MdSpaceDashboard className='me-2' />,
        component: <Dashboard />,
        noCollapse: true
    },
    {
        type: "collapse",
        name: "Clients",
        key: "Clients",
        route: "/client",
        layout: "/client",
        icon: <BsCollection className='me-2' />,
        noCollapse: true,
        childs: []
    },
] 
