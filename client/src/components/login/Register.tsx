import React, { useState } from 'react'
import { Dialog, Box, styled, Button } from '@mui/material'

import Login from './Login'
import SignUp from './SignUp'

import loginImage from '../../images/login.png'
import GoogleOneTapLogin from 'react-google-one-tap-login';

interface MyRegisterProps {
    setOpenDialogBox: (newState: boolean) => void;
    login: boolean;
}

const LeftContainer = styled(Box)({
    width: 450,
})
//TODO make Register a component to show on route ../app/register
// TODO (ritesh) ye upar wala todo kyu karna hai?
const Register: React.FC<MyRegisterProps> = ({ setOpenDialogBox, login }) => {

    const [open, setOpen] = useState<boolean>(true);
    const [loginAcccount, setLoginAccount] = useState<boolean>(login);

    const toggleLogin = () => {
        setLoginAccount(!loginAcccount);
    }

    const handleClose = () => {
        setOpen(false);
        setOpenDialogBox(false);
    }

    const clientId: string = process.env.REACT_APP_CLIENT_ID || " "

    const onGoogleLogin = async () => {
        window.location.href = process.env.REACT_APP_OAUTH_URL as string

    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { maxWidth: "unset" } }}
        >
            <div style={{ display: 'flex' }}>
                <LeftContainer>
                    <img style={{ objectFit: 'cover', width: '100%' }} src={loginImage} alt='login illustrations' />
                </LeftContainer>
                {loginAcccount ? <Login handleClose={handleClose} toggleLogin={toggleLogin} /> : <SignUp handleClose={handleClose} toggleLogin={toggleLogin} />}
                <GoogleOneTapLogin onError={(error: any) => console.log(error)} onSuccess={(response: any) => console.log(response)} googleAccountConfigs={{ client_id: clientId }} />

                <Button variant='contained' onClick={onGoogleLogin}>Google</Button>

            </div>
        </Dialog>
    )
}

export default Register