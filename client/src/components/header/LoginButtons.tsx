import React, { useState } from 'react'

import { Button, IconButton, Avatar } from '@mui/material';

import Register from '../login/Register';

function LoginButtons() {

    const [ flag, setFlag ] = useState<boolean>(true)
    const [ openDialogBox, setOpenDialogBox ] = useState<boolean>(false);
    const [ login, setLogin ] = useState<boolean>(true);

  return (
    <div>
    {
        flag ? <div style={{display : "flex", gap:"0.5rem"}}>
            <Button style={{textTransform : "none"}} onClick={() => {setOpenDialogBox(true); setLogin(true) }} variant="contained">Login</Button>
            <Button style={{textTransform : "none"}} onClick={() => {setOpenDialogBox(true); setLogin(false) }} variant="outlined">Sign Up</Button>
        </div>
        :
        <>
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
        </>    
    }
    {openDialogBox && <Register setOpenDialogBox={setOpenDialogBox} login={login} />}
    </div>
  )
}

export default LoginButtons