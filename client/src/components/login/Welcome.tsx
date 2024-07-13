import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "src/redux/hooks/hook";
import { updateUser } from "src/redux/slices/userSlice";

const Welcome = () => {
   const user = useAppSelector((state) => state.user)
   const dispatch = useAppDispatch()
   const location = useLocation();

   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const userId = params.get('userId');
      const username = params.get('username');
      const profile = params.get('profile');
      const isAuthenticated = params.get('isAuthenticated');
      if (userId) {
         dispatch(updateUser({
            userId: userId,
            username: username,
            userProfile: profile,
            isAuthenticated: isAuthenticated
         }))
      }
   }, []);

   // TODO create a welcome box for login, cancle icon dabane pe dashboard pe jayega
   return (
      <div>
         <h1>Welcome to Your App!</h1>
         {user.userId && <p>Your userId is: {user.userId}</p>}
         {user.username && <p>Your username is: {user.username}</p>}
         {user.userProfile && <img src={user.userProfile} alt={user.userProfile} />}
      </div>
   )
}

export default Welcome

// ?username=${existingUser.username}
// &userId=${existingUser._id}
// &profile=${existingUser.profile}
// &isAuthenticated=${existingUser.isVerified}