import React, { useState } from 'react'
import { Dialog, DialogTitle, TextField, Button, IconButton, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface MyCreateBoardProps {
    open : boolean;
    setOpen : (newState : boolean)=> void;
}

function CreateBoard(props : MyCreateBoardProps) {

    const { open, setOpen } = props;

    const handleClose = () =>{
        setOpen(false);
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
        <DialogContent style={{width : '20vw', gap : '1rem', display : 'flex', flexDirection : 'column'}}>
            <TextField placeholder='Enter title...' />
            <Button variant='contained'>Create</Button>
        </DialogContent>
    </Dialog>
  )
}

export default CreateBoard