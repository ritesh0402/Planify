import * as React from 'react';
import { Dialog, Button, Box, Avatar, TextField, FormControl, Input, InputLabel, IconButton, InputAdornment, styled } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export interface IUpdateProfileProps {
    open : boolean;
    setOpen : (newState : boolean) => void;
}

const StyledTextField = styled(TextField)(({ theme })=>({
    width: 300,
    
}));

const MainContainer = styled(Box)({
  display:"flex",
  justifyContent:"center",
  alignItems : "center",
  flexDirection : "column",
  gap : "1.5rem",
  margin : 50,
})

export default function UpdateProfile (props: IUpdateProfileProps) {

    const [ preview, setPreview ] = React.useState<string>("");
    const [showPassword, setShowPassword] = React.useState(false);
    const { open, setOpen } = props;


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

    const handleImageChange = (event : any) => {
        const file = event.target.files[0];
    if(file) {
      setPreview(URL.createObjectURL(file));
    }
      };
    
      const onInputChange = () =>{
        
      }
    
      const onFormSubmit = async() =>{
        handleClose();
      }

    const handleClose = () =>{
        setOpen(false);
    }

  return (
    <Dialog open={open} onClose={handleClose}>
        <MainContainer>
      <Avatar alt="Profile photo" src={preview} sx={{ width: 200, height: 200 }} />
      <Button sx={{ textTransform:"none"}} variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
      <StyledTextField focused onChange={onInputChange} label="Username" variant="standard" />
      <FormControl focused sx={{ m: 1, width: 300 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      <Button onClick={onFormSubmit} variant="contained" sx={{ textTransform:"none"}}>Update Profile</Button>
    </MainContainer>
    </Dialog>
  );
}
