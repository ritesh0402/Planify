import React from 'react'

import { TextField, FormControlLabel, Checkbox, Typography, Box, styled, Button } from '@mui/material'

const Container = styled(Box)({
    display : "flex",
    flexDirection : "column",
    gap : '1rem',
    justifyContent : 'center',
    width : 250,
    marginRight : 50
})

function SignUp() {


  return (
    <Container>
        <TextField label="Username" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Phone" variant="outlined" />
        <TextField label="Password" type="password" />
        <Button variant='contained'>Sign up</Button>
    </Container>
  )
}

export default SignUp