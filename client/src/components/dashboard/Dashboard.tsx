import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook'
import { removeUser, updateUser } from '../../redux/slices/userSlice';

function Dashboard() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{user.username}</h3>
      <img src={user.userProfile} height={"100px"} width={"100px"} alt="" />

      <button onClick={() => dispatch(updateUser({ username: "abcd", userId: "123", userProfile: "lnk", isAuthenticated: true }))}>add user</button>
      <button onClick={() => dispatch(removeUser())}>remove user</button>
    </div>
  )
}

export default Dashboard