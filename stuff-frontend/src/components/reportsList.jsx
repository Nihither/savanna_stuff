import React from 'react';
import {List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {formatDateTime, getFullName} from "../utils/formating.js";
import {EventAvailable} from "@mui/icons-material";


function getMessageLink(lesson) {
  const message = lesson.student.messages.report_message
  const phone_number = lesson.student.has_parent ? lesson.student.parent_phone : lesson.student.phone
  return `https://wa.me/${phone_number}?text=${message}`
}

export default function ReportsList(props) {

  const reports = props.reports;

  return (
    <List sx={{'& ul': { padding: 0 } }} >
      {reports.map((lesson) => (
        <ListItemButton key={lesson.id} component={'a'} href={getMessageLink(lesson)} target="_blank">
          <ListItemAvatar>
            <EventAvailable />
          </ListItemAvatar>
          <ListItemText
            primary={getFullName(lesson.student)}
            secondary={`${getFullName(lesson.teacher)} ${formatDateTime(lesson.day, lesson.timestamp)}`}
          />
        </ListItemButton>
      ))}
    </List>
  )
}

// TODO 2 buttons to send reminder to wa or tg