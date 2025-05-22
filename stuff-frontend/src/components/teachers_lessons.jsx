import React, {useEffect, useState} from 'react';
import {
  Alert,
  Avatar,
  Box, IconButton,
  LinearProgress,
  List, ListItem,
  ListItemAvatar,
  ListItemButton, ListItemIcon,
  ListItemText, Menu, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {getLessonsByTeacher} from "../api/teachers_api.js";
import {formatDateTime, getFullName} from "../utils/formating.js";
import {Delete, Edit, MoreVert} from "@mui/icons-material";
import {useParams} from "react-router-dom";


export default function TeachersLessons() {

  const {id} = useParams();
  const [lessons, setLessons] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [lessonId, setLessonId] = useState(null)

  const handleOptionMenuClick = (event, lesson_id) => {
    setAnchorEl(event.currentTarget);
    setLessonId(lesson_id);
  };
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
    setLessonId(null);
  };
  const handleEditLessonButton = () => {
    console.log(lessonId)
  };
  const handleDeleteLessonButton = () => {
    console.log("delete")
  }

  useEffect(() => {
    getLessonsByTeacher(id)
      .then(res => {
        setLessons(res);
        setIsLoaded(true);
      })
      .catch(error => {
        setError(error);
        setIsLoaded(true);
      })
  }, []);

  return (
    <Box component="div">
      {error ? (
        <Alert severity="error">
          Network error. Please try later
        </Alert>
      ) : (
        isLoaded ? (
          Array.isArray(lessons) && lessons.length > 0 ? (
            <List sx={{'& ul': { padding: 0 } }}>
              {lessons.map(lesson => (
                <Stack direction="row" key={lesson.pk}>
                  <ListItem key={lesson.pk}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={getFullName(lesson.student)}
                      secondary={`${formatDateTime(lesson.day, lesson.timestamp)}`}
                    />
                  </ListItem>
                  <IconButton
                    id={"lesson-option-button-" + lesson.pk}
                    aria-controls={open ? "lesson-option-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(event) => handleOptionMenuClick(event, lesson.pk)}
                  >
                    <MoreVert/>
                  </IconButton>
                </Stack>
              ))}
              <Menu
                id="lesson-option-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleOptionMenuClose}
              >
                <MenuItem onClick={handleEditLessonButton}>
                  <ListItemIcon>
                    <Edit fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Изменить"/>
                </MenuItem>
                <MenuItem onClick={handleDeleteLessonButton}>
                  <ListItemIcon>
                    <Delete fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Удалить"/>
                </MenuItem>
              </Menu>
            </List>
          ) : (
            <Typography variant="body1">No Content</Typography>
          )
        ) : (
          <Box sx={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        ))}
    </Box>
  )
}