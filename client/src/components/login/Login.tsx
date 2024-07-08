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

function Login() {
  return (
    <Container>
        <TextField label="Username" variant="outlined" />
        <TextField label="Password" type="password" />
        <FormControlLabel
            control={
            <Checkbox
                size="small"
                name="remember"
            />
            }
            sx={{ marginTop:"-10px"}}
            label={
            <Typography style={{ fontSize: "0.2 rem" }}>
                Remember me for a month
            </Typography>
            }
        />
        <Button variant='contained'>Log in</Button>
    </Container>
  )
}

export default Login