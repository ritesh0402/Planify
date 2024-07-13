import React from 'react'

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

interface MySignUpProps {
  toggleLogin: () => void;
}

const SignUp: React.FC<MySignUpProps> = ({ toggleLogin }) => {
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
        window.location.href = `${process.env.REACT_APP_URL}/#/app/login`
      } else {
        console.log(signupRes.data.error)
        // TODO display error to user
      }
    } catch (error: AxiosError | undefined | any) {
      console.log(error.response.data)
      // TODO display error to user
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
      <Button variant='contained' onClick={handleSubmit(onSubmit)}>Sign up</Button>
      <SignInText>
        Already have an account? <span onClick={toggleLogin}>Sign In</span>
      </SignInText>
    </Container>
  )
}

export default SignUp