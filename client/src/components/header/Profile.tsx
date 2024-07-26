import * as React from "react";
import UpdateProfile from "./UpdateProfile";

import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import EditIcon from '@mui/icons-material/Edit';

import axios from "axios"
import { useCookies } from "react-cookie";
import { useAppDispatch } from "src/redux/hooks/hook"
import { removeUser } from "src/redux/slices/userSlice"

export interface IProfileProps {}

export default function Profile(props: IProfileProps) {
    const [ open, setOpen ] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cookie, setCookie, removeCookie] = useCookies(['userId']);
  const dispatch = useAppDispatch()
  const openMenu = Boolean(anchorEl);

  const onLoggedOut = async () => {
    try {
        const logoutRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/logout`)
        removeCookie('userId', { path: '/' });
        dispatch(removeUser())
        window.location.href = `${process.env.REACT_APP_URL}/#/app/`
    } 
    catch (error) {
        console.log(error)
    }
    handleClose();
  }
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="My Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openMenu ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>V</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          User ID : 66939a1a518933513364b77e
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Username : vedjaiswal
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setOpen(true)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit Account
        </MenuItem>
        <MenuItem onClick={onLoggedOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
}
