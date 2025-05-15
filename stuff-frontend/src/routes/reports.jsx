import React, {useEffect, useState} from 'react';
import {Alert, Box, LinearProgress, Typography} from "@mui/material";
import ReportsList from "../components/reports_list.jsx";
import {getReportsList} from "../api/reports_api.js";


function Reports() {

  const [reports, setReports] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

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
    <div>
      <Typography variant="h5" component="div" padding={2}>
        Отчеты
      </Typography>

      {error ?
        (
          <Alert severity="error">
            Network error. Please try later
          </Alert>
        ) :
        (isLoaded ?
          (reports.length > 0 ?
            (
              <ReportsList reports={reports}/>
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

export default Reports;