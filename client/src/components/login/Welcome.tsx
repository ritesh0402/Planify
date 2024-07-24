import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "src/redux/hooks/hook";
import { updateUser } from "src/redux/slices/userSlice";

import { Button, Dialog, styled } from "@mui/material";
import { useCookies } from "react-cookie";

const Container = styled('div')({
   display: "flex",
   flexDirection: 'column',
   padding: 20,
   // height : '70vh'
})

const Welcome = () => {

   const [open, setOpen] = useState<boolean>(true);

   const handleClose = () => {
      setOpen(false);
   }

   const onStartClick = () => {
      handleClose();
      window.location.href = `${process.env.REACT_APP_URL}/#/app/dashboard`
   }

   const user = useAppSelector((state) => state.user)
   const dispatch = useAppDispatch()
   const location = useLocation();
   const [cookie, setCookie] = useCookies(['userId']);

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
         setCookie('userId', userId, { path: '/', maxAge: (100 * 60 * 60 * 24 * 7) })
      }
   }, []);

   return (
      <Dialog open={open}>
         <Container>
            <h1>Welcome to Your App!</h1>
            {user.userId && <p>Your userId is: {user.userId}</p>}
            {user.username && <p>Your username is: {user.username}</p>}
            {user.userProfile && <img style={{ width: 200, marginBottom: 10 }} src={user.userProfile} alt={user.userProfile} />}
            <Button variant="contained" onClick={onStartClick}>Start Planning</Button>
         </Container>
      </Dialog>
   )
}

export default Welcome

// ?username=${existingUser.username}
// &userId=${existingUser._id}
// &profile=${existingUser.profile}
// &isAuthenticated=${existingUser.isVerified}