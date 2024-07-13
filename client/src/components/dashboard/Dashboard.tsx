import React, { useState } from 'react'
import { Button, Typography, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CreateBoard from './CreateBoard';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
})

const HeaderText = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '45%'
})

const Boards = styled('div')({
  backgroundColor: '#fff',
  width: '45%',
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'space-between',
})

const IconContainer = styled(Button)({
  padding: 0,
  color: '#111',
  ":hover": {
    // backgroundColor : '#f00'
  }
})

function Dashboard() {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container>
      <HeaderText>
        <Typography variant='h5'><b>My Boards</b></Typography>
        <Button style={{ textTransform: "none" }} onClick={() => setOpen(true)} variant='contained'><AddIcon /> Create new</Button>
      </HeaderText>
      <Boards>
        <div style={{ padding: 15 }}>
          <Typography variant='h6'><b>Intro board</b></Typography>
          <Typography style={{ color: '#726767', fontSize: '0.8rem' }} variant='subtitle2'> Date Created : <b>Fri Jul 12 2024</b></Typography>
        </div>
        <IconContainer>
          <DeleteOutlineIcon />
        </IconContainer>
      </Boards>
      <CreateBoard open={open} setOpen={setOpen} />
    </Container>
  )
}

export default Dashboard