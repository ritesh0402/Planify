import React, { useEffect, useState } from 'react'
import { Button, Typography, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import CreateBoard from './CreateBoard';
import axios from 'axios';
import { useAppSelector } from 'src/redux/hooks/hook';
axios.defaults.withCredentials = true;

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
  const user = useAppSelector((state) => state.user)
  const [boards, setBoards] = useState([])
  console.log(boards)
  useEffect(() => {
    const getBoards = async () => {
      try {
        const boardsRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${user.userId}/boards`)
        setBoards(boardsRes.data.data)
        // TODO display error on screen
      } catch (error) {
        console.log(error)
        // TODO display error on screen
      }
    }

    getBoards()
  }, [])

  // TODO create board component and display all boards
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