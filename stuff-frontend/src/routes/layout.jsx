import React from 'react';
import AppHeader from "../components/appHeader.jsx";
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import BottomMenu from "../components/bottomMenu.jsx";


export function Layout({children}) {

  return (
    <>
      <AppHeader />

      <Box sx={{ margin: 2, marginBottom: 11}}>
        {children ?? <Outlet />}
      </Box>

      <BottomMenu />
    </>
  )
}