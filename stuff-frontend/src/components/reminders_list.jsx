import React from 'react';
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader} from "@mui/material";
import {formatDate, getFormatedReminderMessage, getFullName} from "../utils/formating.js";


function RemindersList(props) {

  function getMessageLink(lesson) {
    const message = getFormatedReminderMessage(lesson.student.messages.reminder_message, lesson.timestamp)
    const phone_number = lesson.student.has_parent ? lesson.student.parent_phone : lesson.student.phone
    return `https://wa.me/${phone_number}?text=${message}`
  }

  const reminders = props.reminders;

  return (
    <List sx={{'& ul': {padding: 0},}} subheader={<li/>}>
      {reminders.map((teacher) => (
        <li key={teacher.id}>
          <ul>
            <ListSubheader>{getFullName(teacher)}</ListSubheader>
            {teacher.lessons.map((lesson) => (
              <ListItemButton key={lesson.pk} component={'a'} href={getMessageLink(lesson)} target="_blank">
                <ListItemAvatar>
                  <Avatar/>
                </ListItemAvatar>
                <ListItemText
                  primary={getFullName(lesson.student)} secondary={formatDate(lesson.day, lesson.timestamp)}
                />
              </ListItemButton>
            ))}
          </ul>
        </li>
      ))}
    </List>
  )
}

export default RemindersList;

