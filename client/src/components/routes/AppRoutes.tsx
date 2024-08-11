import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../landing/Landing';
import Dashboard from '../dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Welcome from '../login/Welcome';
// import KanbanBoard from './components/user/KanbanBoard';
// import MainLayout from './layout/MainLayout';

const AppRoutes = () => {
   return (
      <Router basename='/app'>
         <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route element={<ProtectedRoute />}>
               <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            {/* <Route element={<MainLayout />}> */}
            {/* </Route> */}
         </Routes>
      </Router>
   );
};

export default AppRoutes;
