import React, {useEffect, useState} from 'react';
import {
  Alert,
  Avatar,
  Box, Drawer, IconButton,
  LinearProgress,
  List, ListItem,
  ListItemAvatar,
  ListItemButton, ListItemIcon,
  ListItemText, Menu, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {getLessonsByTeacher, getTeachersList} from "../api/teachers_api.js";
import {formatDateTime, getFullName} from "../utils/formating.js";
import {Delete, Edit, MoreVert} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import CustomAlert from "../elements/custom_alert.jsx";
import TeacherForm from "../forms/teacher_form.jsx";
import DeleteConfirm from "../elements/delete_confirm.jsx";
import {deleteLesson, updateLesson} from "../api/lessons_api.js";
import LessonForm from "../forms/lesson_form.jsx";
import {getStudentsList} from "../api/students_api.js";


export default function TeachersLessons() {

  const {id} = useParams();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessonId, setLessonId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataLoadingError, setDataLoadingError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const handleAlertClose = () => {
    setAlertOpen(false)
  }
  const toggleDrawer = (newOpen) => {
    setModalOpen(newOpen);
  };
  const handleDrawerClose = () => {
    setEdit(false);
    setDeleting(false);
    toggleDrawer(false);
  };
  const handleOptionMenuClick = (event, lesson) => {
    setAnchorEl(event.currentTarget);
    setLessonId(lesson.pk);
    setLesson(lesson);
  };
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditLessonButton = () => {
    setEdit(true);
    handleOptionMenuClose()
    toggleDrawer(true)
  };
  const handleDeleteLessonButton = () => {
    setDeleting(true);
    handleOptionMenuClose();
    toggleDrawer(true);
  };
  const handleLessonEdit = (data) => {
    updateLesson(lessonId, data)
      .then(() => {
        setAlertText("Successfully updated")
        setAlertSeverity("success")
        setAlertOpen(true)
        fetchData()
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
    handleDrawerClose()
  };
  const handleLessonDelete = () => {
    deleteLesson(lessonId)
      .then(() => {
        setAlertText("Successfully deleted")
        setAlertSeverity("success")
        setAlertOpen(true)
        fetchData();
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
    handleDrawerClose()
  };

  const fetchTeachers = () => {
    getTeachersList()
      .then((res) => {
        setTeachers(res);
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
  }
  const fetchStudents = () => {
    getStudentsList()
      .then((res) => {
        setStudents(res);
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
  }

  const fetchData = () => {
    getLessonsByTeacher(id)
      .then(res => {
        setLessons(res);
      })
      .catch(error => {
        setDataLoadingError(error);
      })
      .finally(() => {
        setIsLoaded(true);
      })
  }

  useEffect(() => {
    fetchData();
    fetchTeachers();
    fetchStudents();
  }, []);

  return (
    <Box component="div">
      {dataLoadingError ? (
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
                    aria-controls={menuOpen ? "lesson-option-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? 'true' : undefined}
                    onClick={(event) => handleOptionMenuClick(event, lesson)}
                  >
                    <MoreVert/>
                  </IconButton>
                </Stack>
              ))}
              <Menu
                id="lesson-option-menu"
                anchorEl={anchorEl}
                open={menuOpen}
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

      {/*Alert section*/}
      <CustomAlert
        alertOpen={alertOpen}
        handleAlertClose={handleAlertClose}
        alertSeverity={alertSeverity}
        alertText={alertText}
      />

      {/* Modal */}
      <React.Fragment>
        <Drawer
          anchor="bottom"
          open={modalOpen}
          onClose={handleDrawerClose}
        >
          {edit ? (
            <LessonForm
              lesson={lesson}
              teachers={teachers}
              students={students}
              handleDrawerClose={handleDrawerClose}
              handleLessonSave={handleLessonEdit}
            />
          ) : (
            deleting ? (
              <DeleteConfirm handleCancel={handleDrawerClose} handleConfirm={handleLessonDelete}/>
            ) : (
              <></>
            )
          )}
        </Drawer>
      </React.Fragment>
    </Box>
  )
}