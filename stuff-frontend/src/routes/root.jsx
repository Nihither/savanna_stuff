import React from 'react';
import {Box} from "@mui/material";
import {Outlet, redirect} from "react-router-dom";
import BottomMenu from "../components/bottomMenu.jsx";
import AppHeader from "../components/appHeader.jsx";
import {getToken, getUser} from "../api/authApi.js";
import {Layout} from "./layout.jsx";


export function rootLoader() {
  const authenticated = (getUser() && getToken())
  if (!authenticated) {
    return redirect('/login')
  }
}

export default function Root () {

  return (
    <Layout />
  )
}