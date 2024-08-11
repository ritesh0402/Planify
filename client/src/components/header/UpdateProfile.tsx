import * as React from 'react';
import { Dialog, Button, Box, Avatar, TextField, FormControl, Input, InputLabel, IconButton, InputAdornment, styled } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks/hook';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { updateUser } from 'src/redux/slices/userSlice';

export interface IUpdateProfileProps {
  open: boolean;
  setOpen: (newState: boolean) => void;
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: 300,

}));

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1.5rem",
  margin: 50,
})

export default function UpdateProfile(props: IUpdateProfileProps) {

  const user = useAppSelector(state => state.user)
  const [preview, setPreview] = React.useState<string>(user.userProfile);
  const [showPassword, setShowPassword] = React.useState(false);
  const { open, setOpen } = props;
  const { register, handleSubmit, setValue } = useForm({
    shouldUseNativeValidation: true
  })
  const dispatch = useAppDispatch()


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('profile', file);
    }
  };

  const onInputChange = () => {
    //TODO (ved) debounce and check if username is already used
  }

  const onFormSubmit = async (data: any) => {
    const userUpg: any = {};
    if (data.profile !== preview) {
      let compressedFile;
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      }
      try {
        compressedFile = await imageCompression(data.profile, options);
        const formData = new FormData();
        formData.append('file', data.profile);
        formData.append('folder', 'user_profiles');
        formData.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`);
        formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);

        try {
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, { withCredentials: false });
          userUpg.profile = response.data.url
        } catch (error) {
          console.error('Error uploading the image', error);
        }


      } catch (error) {
        console.log("compression err");
        console.log(error);
      }
    }
    if (user.username !== data.username) {
      userUpg.username = data.username
    }

    if (data.password !== "") {
      userUpg.password = data.password
    }


    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/${user.userId}/update`, userUpg)
      const newData = res.data.data
      dispatch(updateUser({
        username: newData.username,
        userProfile: newData.profile,
        userId: newData._id,
        isAuthenticated: newData.isVerified
      }))
    } catch (error) {
      console.log(error)
    }

    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
  }
  //TODO (ved) clear form after component is closed ()
  return (
    <Dialog open={open} onClose={handleClose}>
      <MainContainer>
        <Avatar alt="Profile photo" src={preview} sx={{ width: 200, height: 200 }} />
        <Button sx={{ textTransform: "none" }} variant="contained" component="label">
          Upload Image
          <input type="file" hidden {...register('profile')} onChange={handleImageChange} />
        </Button>
        <StyledTextField focused {...register('username')} defaultValue={user.username} onChange={onInputChange} label="Username" variant="standard" />
        <FormControl focused sx={{ m: 1, width: 300 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
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
        <Button onClick={handleSubmit(onFormSubmit)} variant="contained" sx={{ textTransform: "none" }}>Update Profile</Button>
      </MainContainer>
    </Dialog>
  );
}
