import React from 'react'
import { Dialog, DialogTitle, TextField, Button, IconButton, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface MyCreateBoardProps {
  open: boolean;
  setOpen: (newState: boolean) => void;
}

function CreateBoard(props: MyCreateBoardProps) {

  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  }

  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true
  })

  const onSubmit = async (data: any) => {
    try {
      const addBoardReq = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/board`, {
        boardTitle: data.boardTitle
      })
      console.log(addBoardReq.data.data)
      setOpen(false)
      // TODO display error on screen
    } catch (error) {
      // TODO display error on screen
      console.log(error)
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Give your board a title</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent style={{ width: '20vw', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
        <TextField placeholder='Enter title...' {...register("boardTitle", {
          required: "Please enter a valid title!"
        })} />
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>Create</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBoard