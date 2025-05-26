import React, {useEffect, useState} from 'react';
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import ReportsList from "../components/reports_list.jsx";
import {getReportsList} from "../api/reports_api.js";


export default function Reports() {

  const [reports, setReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getReportsList()
      .then(res => {
        setReports(res);
        setIsLoaded(true)
      })
      .catch(error => {
        setError(error.toString())
        setIsLoaded(true)
      })
  }, []);

  return (
    <Box component={"div"}>
      <Typography variant="h5" sx={{marginX: 1, paddingY: 2}}>Отчеты</Typography>

      {error ?
        (
          <Alert severity="error">
            {error}
          </Alert>
        ) :
        (isLoaded ?
          (Array.isArray(reports) && reports.length > 0 ?
            (
              <ReportsList reports={reports}/>
            ) : (
              <Typography variant="body1">No Content</Typography>
            )) : (
            <Box sx={{width: '100%'}}>
              <LinearProgress/>
            </Box>
          ))}
    </Box>
  )
}