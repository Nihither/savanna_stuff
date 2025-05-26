import React from 'react';
import {Alert, Snackbar} from "@mui/material";


export default function CustomAlert({alertSeverity, alertText, alertOpen, handleAlertClose}) {

  return (
    <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} sx={{marginBottom: 10}}>
      <Alert
        onClose={handleAlertClose}
        severity={alertSeverity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alertText}
      </Alert>
    </Snackbar>
  )
}