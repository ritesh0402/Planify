import React, { useState } from 'react'
import { Dialog, Box, styled } from '@mui/material'

import Login from './Login'
import SignUp from './SignUp'

import loginImage from '../../images/login.png'

interface MyRegisterProps {
    setOpenDialogBox : (newState : boolean) => void;
}

const LeftContainer = styled(Box)({
    width : 450,
})


const Register: React.FC<MyRegisterProps> = ({ setOpenDialogBox }) => {

    const [ open, setOpen ] = useState<boolean>(true);
    const [ login, setLogin ] = useState<boolean>(false);

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
            { login ? <Login /> : <SignUp /> }
        </div>
      </Dialog>
  )
}

export default Register