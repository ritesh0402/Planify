import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook'
import { removeUser, updateUser } from '../../redux/slices/userSlice';

function Dashboard() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{user.userName}</h3>
      <h3>{user.userId}</h3>
      <h3>{user.userProfile}</h3>
      <button onClick={() => dispatch(updateUser({ userName: "abcd", userId: "123", userProfile: "lnk" }))}>add user</button>
      <button onClick={() => dispatch(removeUser())}>remove user</button>
    </div>
  )
}

export default Dashboard