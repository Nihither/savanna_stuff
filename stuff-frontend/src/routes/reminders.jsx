import React, {useEffect, useState} from 'react';
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import RemindersList from "../components/reminders_list.jsx";
import {getRemindersList} from "../api/reminders_api.js";


export default function Reminders() {

  const [reminders, setReminders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    getRemindersList()
      .then(res => {
      setReminders(res);
      setIsLoaded(true);
    })
      .catch(error => {
        setError(error.toString())
        setIsLoaded(true)
      })
  }, []);

  return (
    <Box component={"div"}>
      <Typography variant="h5" sx={{marginX: 1, paddingY: 2}}>Напоминания</Typography>

      { error ?
        (
          <Alert severity="error">
            {error}
          </Alert>
        ) :
        ( isLoaded ?
          ( Array.isArray(reminders) && reminders.length > 0 ?
            (
              <RemindersList reminders={reminders} />
            ) : (
              <Typography variant="body1" >No Content</Typography>
            )) : (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ))}
    </Box>
  )
}