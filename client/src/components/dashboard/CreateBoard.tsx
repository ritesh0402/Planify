import React, { useState } from 'react'
import { Dialog, DialogTitle, TextField, Button, IconButton, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface MyCreateBoardProps {
    setBoards : (newState : string[]) => void;
    boards : string[];
    open : boolean;
    setOpen : (newState : boolean)=> void;
}

function CreateBoard(props : MyCreateBoardProps) {

    const { setBoards, boards, open, setOpen } = props;
    const [ title, setTitle ] = useState<string>('');

    const handleClose = () =>{
        setOpen(false);
    }

    const onCreateBoardClick = (board : string) =>{
      setBoards([...boards, board]);
      handleClose();
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
            <TextField value={title} onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTitle(e.target.value)} placeholder='Enter title...' />
            <Button onClick={()=>onCreateBoardClick(title)} variant='contained'>Create</Button>
        </DialogContent>
    </Dialog>
  )
}

export default CreateBoard