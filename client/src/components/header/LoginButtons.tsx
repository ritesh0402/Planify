import React, { useState } from 'react'

import { Button, IconButton, Avatar } from '@mui/material';

import Register from '../login/Register';

function LoginButtons() {

    const [ flag, setFlag ] = useState<boolean>(true)
    const [ openDialogBox, setOpenDialogBox ] = useState<boolean>(false);

  return (
    <div>
    {
        flag ? <div style={{display : "flex", gap:"0.5rem"}}>
            <Button onClick={() => {setOpenDialogBox(true)}} variant="contained">Login</Button>
            <Button onClick={() => {setOpenDialogBox(true)}} variant="outlined">Sign Up</Button>
        </div>
        :
        <>
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
        </>    
    }
    {openDialogBox && <Register setOpenDialogBox={setOpenDialogBox} />}
    </div>
  )
}

export default LoginButtons