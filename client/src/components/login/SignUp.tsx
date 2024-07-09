import React from 'react'

import { TextField, Box, Typography, styled, Button } from '@mui/material'

const Container = styled(Box)({
    display : "flex",
    flexDirection : "column",
    gap : '1rem',
    justifyContent : 'center',
    width : 250,
    marginRight : 50
})

const SignInText = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  " > span": {
    cursor: "pointer",
  },
  " > span:hover": {
    textDecorationLine: "underline",
  },
}));

interface MySignUpProps {
  toggleLogin : ()=> void;
}

const SignUp : React.FC<MySignUpProps> = ({ toggleLogin }) => {


  return (
    <Container>
        <TextField label="Username" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Phone" variant="outlined" />
        <TextField label="Password" type="password" />
        <Button variant='contained'>Sign up</Button>
        <SignInText>
          Already have an account? <span onClick={toggleLogin}>Sign In</span>
        </SignInText>
    </Container>
  )
}

export default SignUp