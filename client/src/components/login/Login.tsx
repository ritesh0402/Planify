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

const SignUpText = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    " > span": {
        cursor: "pointer",
    },
    " > span:hover": {
        textDecorationLine: "underline",
    },
}));

const ForgetPassword = styled('span')(({ theme }) => ({
    fontSize : 12,
    color : theme.palette.primary.main,
    marginTop : -10,
    width:100,
    cursor : 'pointer',
    ":hover" : {
        textDecorationLine : "underline",
    }
}));

interface MyLoginProps {
    toggleLogin : () => void;
}

const Login : React.FC<MyLoginProps> = ({ toggleLogin }) => {
  return (
    <Container>
        <TextField label="Username" variant="outlined" />
        <TextField label="Password" type="password" />
        <ForgetPassword>Forget Password?</ForgetPassword>
        <Button variant='contained'>Log in</Button>
        <SignUpText>
            Don't have an account? <span onClick={toggleLogin}>Sign Up</span>
        </SignUpText>
    </Container>
  )
}

export default Login