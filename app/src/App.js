import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from './FldrMain/MainLayout';
import { RouteList } from './FldrMain/RouteList';
import Dashboard from './FldrComponents/Dashboard';
import Client from './FldrComponents/Client';

const renderRoutes = (routes) => {
  return routes.map((route, index) => {
    if (route.noCollapse && !Array.isArray(route.childs) && !route.divider) {
      return (
        <Route key={index} path={route.route} element={route.component} />
      )
    }
    if (route.noCollapse && Array.isArray(route.childs)) {
      return (
        <Route key={index} path={route.route} element={<Outlet />}>
          {renderRoutes(route.childs)}
        </Route>
      );
    }
    return null; // Fallback
  });
};

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/client" element={<Client />} /> 

        </Routes>
    </BrowserRouter>
  );
}

export default App;
