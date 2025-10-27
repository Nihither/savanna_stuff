import React, {useEffect, useState} from "react";
import {Box, Button, Stack, TextField} from "@mui/material";


export default function MessagesForm({messages, handleMessageSave, handleDrawerClose}) {

  const [reminderIsRequired, setReminderIsRequired] = useState(true);
  const [reminder, setReminder] = useState(null);
  const [reportIsRequired, setReportIsRequired] = useState(true);
  const [report, setReport] = useState(null);

  const handleReminderChange = (e) => {
    setReminder(e.target.value);
  }

  const handleReportChange = (e) => {
    setReport(e.target.value);
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const data = {
      reminder_is_required: reminderIsRequired,
      reminder_message: reminder,
      report_is_required: reportIsRequired,
      report_message: report
    }
    handleMessageSave(data);
    handleDrawerClose();
  }

  useEffect(() => {
    if (messages) {
      setReminderIsRequired(messages.reminder_is_required)
      setReminder(messages.reminder_message)
      setReportIsRequired(messages.report_is_required)
      setReport(messages.report_message)
    }
  }, [messages])

  return (
    <Box component={'form'}
         onSubmit={onFormSubmit}
         sx={{'& .MuiTextField-root': {my: 1}, '& .MuiButton-root': {my: 1}, marginY: 4, marginX: 3}}
         autoComplete="off">
      <TextField
        fullWidth
        required
        name="reminder"
        label="Сообщение для напоминания"
        type="text"
        onChange={handleReminderChange}
        multiline={true}
        rows={5}
        value={reminder ? reminder : ''}
        helperText="Для шаблона даты и времени используйте слова date и time"
      />
      <TextField
        fullWidth
        required
        name="report"
        label="Сообщение для отчета"
        type="text"
        onChange={handleReportChange}
        multiline={true}
        rows={5}
        value={report ? report : ''}
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button variant="outlined" color="info" onClick={handleDrawerClose}>Отмена</Button>
        <Button type="submit" variant="contained" color="primary">Сохранить</Button>
      </Stack>
    </Box>
  )
}