import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './landing/Landing';
// import Auth from './components/auth/Auth';
// import Dashboard from './components/user/Dashboard';
// import Profile from './components/user/Profile';
// import Update from './components/user/Update';
// import KanbanBoard from './components/user/KanbanBoard';
import MainLayout from './layout/MainLayout';

const AppRoutes = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Landing />} />
            {/* <Route path="/auth" element={<Auth />} /> */}
            <Route element={<MainLayout />}>
               {/* <Route path="/user/dashboard" element={<Dashboard />} /> */}
               {/* <Route path="/user/profile" element={<Profile />} /> */}
               {/* <Route path="/user/profile/update" element={<Update />} /> */}
               {/* <Route path="/user/board" element={<KanbanBoard />} /> */}
            </Route>
         </Routes>
      </Router>
   );
};

export default AppRoutes;
