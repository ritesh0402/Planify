import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks/hook'


function ProtectedRoute() {
   const user = useAppSelector((state) => state.user)


   return (
      user.isAuthenticated ? <Outlet /> : <Navigate to='/login' />
   )
}

export default ProtectedRoute;