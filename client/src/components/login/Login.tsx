import React from 'react'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios';
import { TextField, Typography, Box, styled, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hook';
import { updateUser } from '../../redux/slices/userSlice';

const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: '1rem',
    justifyContent: 'center',
    width: 250,
    marginRight: 50
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
    fontSize: 12,
    color: theme.palette.primary.main,
    marginTop: -10,
    width: 100,
    cursor: 'pointer',
    ":hover": {
        textDecorationLine: "underline",
    }
}));

interface MyLoginProps {
    toggleLogin: () => void;
}

const Login: React.FC<MyLoginProps> = ({ toggleLogin }) => {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const { register, handleSubmit } = useForm({
        shouldUseNativeValidation: true,
        // shouldFocusError: true
    })

    const onSubmit = async (data: any) => {
        try {
            const loginRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
                username: data.username,
                password: data.password
            })
            const newData = loginRes.data.data
            if (loginRes.data.status === 'Success') {
                dispatch(updateUser({
                    username: newData.username,
                    userProfile: newData.profile,
                    userId: newData.userId,
                    isAuthenticated: newData.isAuthenticated
                }))
                window.location.href = `${process.env.REACT_APP_URL}/#/app/welcome?username=${user.username}&userId=${user.userId}&profile=${user.userProfile}&isAuthenticated=${user.isAuthenticated}`
            } else {
                console.log(loginRes.data.error)
                // TODO display error on screen
            }

        } catch (error: AxiosError | undefined | any) {
            console.log(error.response.data)
            // TODO display error on screen
        }
    }

    return (
        <Container>
            <TextField {...register("username", {
                required: "Please enter a username/email!"
            })} label="Username" variant="outlined" />
            <TextField {...register("password", {
                required: "Please enter a password!"
            })} label="Password" type="password" />
            <ForgetPassword>Forget Password?</ForgetPassword>
            <Button variant='contained' onClick={handleSubmit(onSubmit)}>Log in</Button>
            <SignUpText>
                Don't have an account? <span onClick={toggleLogin}>Sign Up</span>
            </SignUpText>
        </Container>
    )
}

export default Login


