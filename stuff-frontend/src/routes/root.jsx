import React from 'react';
import {Box} from "@mui/material";
import {Outlet} from "react-router-dom";
import BottomMenu from "../components/bottom_menu.jsx";
import AppHeader from "../components/app_header.jsx";


export default function Root () {

  return (
    <>
      <AppHeader />

      <Box sx={{ margin: 2, marginBottom: 11 }}>
        <Outlet />
      </Box>

      <BottomMenu />
    </>
  )
}