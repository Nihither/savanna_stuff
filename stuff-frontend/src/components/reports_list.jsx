import React from 'react';
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {formatDate, getFullName} from "../utils/formating.js";


function ReportsList(props) {

  function getMessageLink(lesson) {
    const message = lesson.student.messages.report_message
    const phone_number = lesson.student.has_parent ? lesson.student.parent_phone : lesson.student.phone
    return `https://wa.me/${phone_number}?text=${message}`
  }

  const reports = props.reports;

  return (
    <List sx={{'& ul': { padding: 0 }, }} >
      {reports.map((lesson) => (
        <ListItemButton key={lesson.id} component={'a'} href={getMessageLink(lesson)} target="_blank">
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={getFullName(lesson.student)}
            secondary={`${getFullName(lesson.teacher)} ${formatDate(lesson.day, lesson.timestamp)}`}
          />
        </ListItemButton>
      ))}
    </List>
  )
}

export default ReportsList;