import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";


export default function AppHeader() {

  return (
    <AppBar sx={{ bgcolor: 'success.light' }} position="static">
      <Toolbar variant="regular" >
        <Typography variant="h6" component="div" sx={{ "flexGrow": 1 }}>
          Stuff
        </Typography>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}