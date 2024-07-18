import React, { useState } from 'react'

import { TextField, Box, Typography, styled, Button } from '@mui/material'
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: '1rem',
  justifyContent: 'center',
  width: 250,
  marginRight: 50
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

const ErrorField = styled(Typography)({
  fontSize : 10,
  marginTop : -10,
  color : 'red',
  fontWeight : 600,
})

interface MySignUpProps {
  toggleLogin: () => void;
  handleClose:() => void;
}

const SignUp: React.FC<MySignUpProps> = ({ toggleLogin, handleClose }) => {

  const [ error, setError ] = useState<string>("");

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  })

  const onSubmit = async (data: any) => {
    try {
      const signupRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password
      })
      if (signupRes.data.status === 'Success') {
        // TODO redirect user to login route after register component is created (ye kyu karna hai bhai route nahi banaya hai login ka)
        window.location.href = `${process.env.REACT_APP_URL}/#/app`
        handleClose();
      } else {
        console.log(signupRes.data.error)
        setError(signupRes.data.msg)
      }
    } catch (error: AxiosError | undefined | any) {
      console.log(error.response.data)
      setError(error.response.data.msg)
    }
  }
  
  return (
    <Container>
      <TextField {...register("username", {
        required: "Please enter a valid username!"
      })} label="Username" variant="outlined" />
      <TextField {...register("email", {
        required: "Please enter a valid email!"
      })} label="Email" variant="outlined" />
      <TextField {...register("phone", {
        required: "Please enter a valid phone!"
      })} label="Phone" variant="outlined" />
      <TextField {...register("password", {
        required: "Please enter a valid password!"
      })} label="Password" type="password" />
      {error && <ErrorField>{error}</ErrorField>}
      <Button variant='contained' onClick={handleSubmit(onSubmit)}>Sign up</Button>
      <SignInText>
        Already have an account? <span onClick={toggleLogin}>Sign In</span>
      </SignInText>
    </Container>
  )
}

export default SignUp