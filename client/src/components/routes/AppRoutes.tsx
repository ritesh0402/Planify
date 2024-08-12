import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../landing/Landing';
import Dashboard from '../dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Welcome from '../login/Welcome';

const AppRoutes = () => {
   return (
      <Router basename='/app'>
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route element={<ProtectedRoute />}>
               <Route path="/dashboard" element={<Dashboard />} />
            </Route>
         </Routes>
      </Router>
   );
};

export default AppRoutes;
