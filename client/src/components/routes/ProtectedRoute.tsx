import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { updateUser } from 'src/redux/slices/userSlice';


function ProtectedRoute() {
   const user = useAppSelector((state) => state.user)
   const [cookie, setCookie] = useCookies(['userId']);
   const dispatch = useAppDispatch();



   let access = user.isAuthenticated;


   useEffect(() => {
      const getUser = async () => {
         const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/user`)
         const user = res.data.data;
         dispatch(updateUser({
            username: user.username,
            userProfile: user.profile,
            userId: user.userId,
            isAuthenticated: user.isAuthenticated
         }))
      }
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
      access ? <Outlet /> : <Navigate to='' />
   )
}

export default ProtectedRoute;