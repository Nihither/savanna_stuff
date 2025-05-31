import React from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";


export default function DeleteConfirm({handleConfirm, handleCancel}) {

  return (
    <Box component={"div"} sx={{paddingY: 4}}>
      <Typography variant="h6" align="center" sx={{paddingBottom: 4}}>Уверены, что хотите удалить?</Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-around">
        <Button variant="outlined" color="info" value="Отмена" onClick={handleCancel} >Отмена</Button>
        <Button variant="contained" color="primary" value="Удалить" onClick={handleConfirm} >Удалить</Button>
      </Stack>
    </Box>
  )
}