import React, { useState } from 'react'
import { Dialog, Box, styled } from '@mui/material'

import Login from './Login'
import SignUp from './SignUp'

import loginImage from '../../images/login.png'

interface MyRegisterProps {
    setOpenDialogBox : (newState : boolean) => void;
    login : boolean;
}

const LeftContainer = styled(Box)({
    width : 450,
})

const Register: React.FC<MyRegisterProps> = ({ setOpenDialogBox, login }) => {

    const [ open, setOpen ] = useState<boolean>(true);
    const [ loginAcccount, setLoginAccount ] = useState<boolean>(login);

    const toggleLogin = () =>{
        setLoginAccount(!loginAcccount);
    }

    const handleClose = () =>{
        setOpen(false);
        setOpenDialogBox(false);
    }

  return (
    <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxWidth: "unset" } }}
      >
        <div style={{display : 'flex'}}>
            <LeftContainer>
                <img style={{objectFit : 'cover', width : '100%'}} src={loginImage} alt='login illustrations' />
            </LeftContainer>
            { loginAcccount ? <Login toggleLogin={toggleLogin} /> : <SignUp toggleLogin={toggleLogin} /> }
        </div>
      </Dialog>
  )
}

export default Register