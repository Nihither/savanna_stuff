import React from 'react';
import {Box,} from "@mui/material";
import LoginForm from "../forms/loginForm.jsx";


export default function SignIn() {

  return (
    <Box component={"div"}
         sx={{height: '95vh', alignContent: "center", justifyContent: "center", padding: 2}}
    >
      <LoginForm />
    </Box>
  )
}