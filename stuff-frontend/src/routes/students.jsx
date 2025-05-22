import React, {useEffect, useState} from 'react';
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import StuffList from "../components/stuff_list.jsx";
import {getStudentsList} from "../api/students_api.js";


function Students() {

  const [students, setStudents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    getStudentsList()
      .then(students => {
        setStudents(students);
        setIsLoaded(true)
      })
      .catch(error => {
        setError(error.toString())
        setIsLoaded(true)
      })
  }, []);

  return (
    <div>
      <Typography variant="h5" component="div" padding={2}>
        Ученики
      </Typography>

      {error ?
        (
          <Alert severity="error">
            Network error. Please try later
          </Alert>
        ) :
        (isLoaded ?
          (Array.isArray(students) && students.length > 0 ?
            (
              <StuffList stuff={students}/>
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

export default Students;