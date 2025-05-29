import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {signIn} from "../api/authApi.js";
import {useNavigate} from "react-router-dom";


export default function LoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password
    }
    signIn(data)
      .then(() => {
        navigate("/reminders")
      })
      .catch(() => {
        setError("Некорректные имя пользователя или пароль")
      })
  }

  return (
    <Box component={"form"}
         sx={{'& .MuiTextField-root': {my: 1}, '& .MuiButton-root': {my: 1}, m: 1}}
         onSubmit={handleFormSubmit}
    >
      <TextField
        fullWidth
        required
        name="username"
        label="Username"
        type="text"
        onChange={handleUsernameChange}
        value={username}
      />
      <TextField
        fullWidth
        required
        name="password"
        label="Password"
        type="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <Typography variant="subtitle1" color="error" sx={{marginY: 1}}>{error}</Typography>
      <Button type="submit" variant="contained" fullWidth >
        Sign in
      </Button>
    </Box>
  )
}