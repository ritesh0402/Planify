import React, { useState } from 'react'

import { Button, IconButton, Avatar } from '@mui/material';

import Register from '../login/Register';
import Logout from '../login/Logout';
import { useAppSelector } from 'src/redux/hooks/hook';

function LoginButtons() {
  // TODO (ritesh) ye flag state change karna hai if user logged in hai toh false rakh else true (ye hone ke baad he mein logout button add kar sakhta hu) -- (ved) user.isAuthenticated use kar
  const [flag, setFlag] = useState<boolean>(true)
  const user = useAppSelector((state) => state.user)
  const [openDialogBox, setOpenDialogBox] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);

  //TODO change logout button 
  return (
    <div>
      {
        flag ? <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button style={{ textTransform: "none" }} onClick={() => { setOpenDialogBox(true); setLogin(true) }} variant="contained">Login</Button>
          <Button style={{ textTransform: "none" }} onClick={() => { setOpenDialogBox(true); setLogin(false) }} variant="outlined">Sign Up</Button>
        </div>
          :
          <>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
          </>
      }
      {openDialogBox && <Register setOpenDialogBox={setOpenDialogBox} login={login} />}
      <Logout />
    </div>
  )
}

export default LoginButtons