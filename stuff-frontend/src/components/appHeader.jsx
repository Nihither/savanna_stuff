import React from 'react';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemIcon, ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import {getUser, signout} from "../api/authApi.js";
import {AUTH_ROUTES} from "../common/staticValues.js";
import {useNavigate} from "react-router-dom";
import {Logout} from "@mui/icons-material";


export default function AppHeader() {

  const navigate = useNavigate();
  const user = getUser();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    signout();
    navigate('/login')
  }

  return (
    <AppBar sx={{ bgcolor: 'success.light' }} position="static">
      <Toolbar variant="regular" >
        <Typography variant="h6" component="div" sx={{ "flexGrow": 1, color: 'black' }}>
          Stuff
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="button" sx={{color: 'black'}}>{user}</Typography>
          <IconButton
            id="profile-button"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar sx={{color: 'black'}}>{user ? user.at(0).toUpperCase() : 'XX'}</Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItem>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}