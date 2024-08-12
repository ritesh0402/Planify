import React, { useEffect } from 'react'
import { Dialog, DialogTitle, TextField, Button, IconButton, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface Board {
  boardTitle: string;
  createdAt: string;
  creatorId: string;
  updatedAt: string;
  _id: string;
}

interface MyCreateBoardProps {
  open: boolean;
  boards: Board[];
  setOpen: (newState: boolean) => void;
  setBoards: (newState: Board[]) => void;
}

function CreateBoard(props: MyCreateBoardProps) {

  const { open, setOpen, boards, setBoards } = props;

  const handleClose = () => {
    setOpen(false);
  }

  const { register, handleSubmit, reset } = useForm({
    shouldUseNativeValidation: true
  })

  const onSubmit = async (data: any) => {
    try {
      const addBoardReq = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/board`, {
        boardTitle: data.boardTitle
      })

      const newBoard = {
        boardTitle: addBoardReq.data.data.board.boardTitle,
        createdAt: addBoardReq.data.data.board.createdAt,
        creatorId: addBoardReq.data.data.board.creatorId,
        updatedAt: addBoardReq.data.data.board.updatedAt,
        _id: addBoardReq.data.data.board._id
      }
      setBoards([...boards, newBoard])
      setOpen(false)
      // TODO display error on screen
    } catch (error) {
      // TODO display error on screen
      console.log(error)
    }
  }

  useEffect(() => {
    if (open) {
      // Reset the form when the dialog is opened
      reset({
        boardTitle: ""
      });
    }
  }, [open, reset]);


  // TODO (Ved) Auto focus on input box
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
        <TextField defaultValue="" autoFocus placeholder='Enter title...' {...register("boardTitle", {
          required: "Please enter a valid title!"
        })} />
        <Button variant='contained' onClick={handleSubmit(onSubmit)}>Create</Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBoard