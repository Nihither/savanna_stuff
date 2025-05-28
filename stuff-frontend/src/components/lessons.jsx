import React, {useEffect, useState} from 'react';
import {
  Alert,
  Avatar,
  Box, Drawer, IconButton,
  LinearProgress,
  List, ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText, Menu, MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {getTeachersList} from "../api/teachersApi.js";
import {formatDateTime, getFullName} from "../utils/formating.js";
import {AddCircleOutline, Delete, Edit, MoreVert, PersonAdd} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import CustomAlert from "../elements/customAlert.jsx";
import DeleteConfirm from "../elements/deleteConfirm.jsx";
import {createLesson, deleteLesson, updateLesson} from "../api/lessonsApi.js";
import LessonForm from "../forms/lessonForm.jsx";
import {getStudentsList} from "../api/studentsApi.js";


export default function Lessons({fetchLessons, byPerson}) {

  const {id} = useParams();
  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [lessonId, setLessonId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dataLoadingError, setDataLoadingError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const [anchorAddMenu, setAnchorAddMenu] = useState(null);
  const addLessonMenuOpen = Boolean(anchorAddMenu);
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
    setAdding(false);
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
  const handleAddLessonMenuClick = (event) => {
    setAnchorAddMenu(event.currentTarget);
    setAdding(true);
  };
  const handleAddLessonMenuClose = () => {
    setAnchorAddMenu(null);
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
  const handleAddLessonButton = () => {
    setEdit(true);
    handleAddLessonMenuClose()
    toggleDrawer(true)
  };
  const handleLessonCreate = (data) => {
    createLesson(data)
      .then(() => {
        setAlertText("Successfully created")
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
  }
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
    fetchLessons(id)
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
      <Stack
        direction="row"
        spacing={2}
        sx={{paddingX: 1}}
        alignItems="end"
        justifyContent="space-between"
      >
        <Typography variant="h6" sx={{paddingX: 1, paddingTop: 2}}>Занятия</Typography>
        <IconButton
          id="add-lesson-button"
          aria-controls={anchorAddMenu ? 'add-lesson-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={anchorAddMenu ? 'true' : undefined}
          onClick={handleAddLessonMenuClick}
        >
          <AddCircleOutline color="info" fontSize='small'/>
        </IconButton>
        <Menu
          id="add-lesson-menu"
          anchorEl={anchorAddMenu}
          open={addLessonMenuOpen}
          onClose={handleAddLessonMenuClose}
        >
          <MenuItem onClick={handleAddLessonButton}>
            <ListItemIcon>
              <PersonAdd fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Добавить занятие"/>
          </MenuItem>
        </Menu>
      </Stack>

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
                      // primary={getFullName(lesson.student)}
                      primary={ byPerson === 'teacher' ? (getFullName(lesson.student)) : (getFullName(lesson.teacher))}
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
              lesson={!adding ? lesson : null}
              teachers={teachers}
              students={students}
              handleDrawerClose={handleDrawerClose}
              handleLessonSave={adding ? handleLessonCreate : handleLessonEdit}
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