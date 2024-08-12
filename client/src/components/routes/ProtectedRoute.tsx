import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { updateUser } from 'src/redux/slices/userSlice';
import { SyncLoader } from 'react-spinners';
import { Box, LinearProgress } from '@mui/material';


function ProtectedRoute() {
   const user = useAppSelector((state) => state.user)
   const [loading, setLoading] = useState(true)
   const [cookie] = useCookies(['userId']);
   const dispatch = useAppDispatch();


   let access = user.isAuthenticated;


   useEffect(() => {
      const getUser = async () => {
         try {
            setLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/user`)
            const user = res.data.data;
            dispatch(updateUser({
               username: user.username,
               userProfile: user.profile,
               userId: user.userId,
               isAuthenticated: user.isAuthenticated
            }))

            const timer = setTimeout(() => {
               setLoading(false);
            }, 1000);
            return () => clearTimeout(timer);
         } catch (error) {
            access = false;
         }
      }
      access = false;
      if (!user.userId) {
         if (cookie.userId) {
            getUser()
            access = user.isAuthenticated;
         } else {
            access = false;
         }
      }
   })

   return (
      // loading ? <LinearProgress /> : access ? <Outlet /> : <Navigate to='/' />
      loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', }}> <SyncLoader color="#407BFF" size={20} /></Box> : access ? <Outlet /> : <Navigate to='/' />

   )
}

export default ProtectedRoute;