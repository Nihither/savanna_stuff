import React, {useEffect, useState} from 'react';
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import StuffList from "../components/stuff_list.jsx";
import {getTeachersList} from "../api/teachers_api.js";


function Teachers() {

  const [teachers, setTeachers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    getTeachersList()
      .then(teachers => {
        setTeachers(teachers);
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
        Преподаватели
      </Typography>

      {error ?
        (
          <Alert severity="error">
            Network error. Please try later
          </Alert>
        ) :
        (isLoaded ?
          (Array.isArray(teachers) && teachers.length > 0 ?
            (
              <StuffList stuff={teachers}/>
            ) : (
              <Typography variant="body1">No Content</Typography>
            )) : (
            <Box sx={{width: '100%'}}>
              <LinearProgress/>
            </Box>
          ))}
    </div>
  )
}

export default Teachers;