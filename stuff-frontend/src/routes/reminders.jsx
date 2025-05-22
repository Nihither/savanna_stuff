import React, {useEffect, useState} from 'react';
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import RemindersList from "../components/reminders_list.jsx";
import {getRemindersList} from "../api/reminders_api.js";


function Reminders() {

  const [reminders, setReminders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null)

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
    <div>
      <Typography variant="h5" component="div" padding={2}>
        Напоминания
      </Typography>

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
    </div>
  )
}

export default Reminders;