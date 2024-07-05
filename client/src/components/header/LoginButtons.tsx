import React, { useState } from 'react'

import { Button, IconButton, Avatar } from '@mui/material';

function LoginButtons() {

    const [ flag, setFlag ] = useState<boolean>(true)

  return (
    <div>
    {
        flag ? <div style={{display : "flex", gap:"0.5rem"}}>
            <Button variant="contained">Login</Button>
            <Button variant="outlined">Sign Up</Button>
        </div>
        :
        <>
            <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
        </>    
    }
    </div>
  )
}

export default LoginButtons