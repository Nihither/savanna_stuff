import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {Outlet, redirect, useNavigate} from "react-router-dom";
import BottomMenu from "../components/bottomMenu.jsx";
import AppHeader from "../components/appHeader.jsx";
import {getUser} from "../api/authApi.js";


export function rootLoader() {
  // const user = getUser();
  // if (!user) {
  //   return redirect('/login')
  // }
  // return user;
}

export default function RootPage ({children}) {

  const navigate = useNavigate()

  useEffect(() => {
    navigate('/reminders')
  }, []);

  return (
    <>
      <AppHeader />

      <Box sx={{ margin: 2, marginBottom: 11 }}>
        {children ?? <Outlet />}
      </Box>

      <BottomMenu />
    </>
  )
}