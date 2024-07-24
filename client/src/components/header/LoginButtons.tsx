import React, { useState } from 'react'

import { Button, IconButton, Avatar } from '@mui/material';

import Register from '../login/Register';
import Logout from '../login/Logout';
import { useAppSelector } from 'src/redux/hooks/hook';

function LoginButtons() {
  // TODO (ved) logout button add kar
  const user = useAppSelector((state) => state.user)
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);

  //TODO (ved) change logout button 
  return (
    <div>
      {
        !user.isAuthenticated ? <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button style={{ textTransform: "none" }} onClick={() => { setOpenDialogBox(true); setLogin(true) }} variant="contained">Login</Button>
          <Button style={{ textTransform: "none" }} onClick={() => { setOpenDialogBox(true); setLogin(false) }} variant="outlined">Sign Up</Button>
        </div>
          :
          <>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
            <Logout />
          </>
      }
      {openDialogBox && <Register setOpenDialogBox={setOpenDialogBox} login={login} />}

    </div>
  )
}

export default LoginButtons