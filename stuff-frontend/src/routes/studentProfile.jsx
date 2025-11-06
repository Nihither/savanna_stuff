import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {formatDateFromString, getFullName} from "../utils/formating.js";
import {Cake, Delete, Edit, Message, MoreVert, Phone, Telegram, WhatsApp} from "@mui/icons-material";
import DeleteConfirm from "../components/elements/deleteConfirm.jsx";
import CustomAlert from "../components/elements/customAlert.jsx";
import {
  deleteStudent,
  getCancelledLessonsByStudent,
  getLessonsByStudent,
  getStudentDetail,
  updateStudent
} from "../api/studentsApi.js";
import Lessons from "../components/lessons.jsx";
import StudentForm from "../forms/studentForm.jsx";
import {getMessages, updateMessages} from "../api/messagesApi.js";
import MessagesForm from "../forms/messagesForm.jsx";
import {STUFF} from "../common/staticValues.js";
import CancelledLessons from "../components/cancelledLessons.jsx";


export default function StudentProfile() {

  const navigate = useNavigate();
  const {id} = useParams();
  const [person, setPerson] = useState(null);
  const [messages, setMessages] = useState(null)
  const [dataLoadingError, setDataLoadingError] = useState('');
  const [editProfile, setEditProfile] = useState(false);
  const [editMessages, setEditMessages] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertText, setAlertText] = useState(null)
  const [alertSeverity, setAlertSeverity] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAlertClose = () => {
    setAlertOpen(false)
  }
  const toggleDrawer = (newOpen) => {
    setModalOpen(newOpen);
  };
  const handleDrawerClose = () => {
    setEditProfile(false);
    setDeleting(false);
    setEditMessages(false);
    toggleDrawer(false);
  };
  const handleOptionMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditPersonButton = () => {
    setEditProfile(true);
    handleOptionMenuClose()
    toggleDrawer(true)
  };
  const handleDeletePersonButton = () => {
    setDeleting(true);
    handleOptionMenuClose();
    toggleDrawer(true);
  };
  const handleEditMessagesButton = () => {
    setEditMessages(true)
    handleOptionMenuClose()
    toggleDrawer(true)
  }
  const handleStudentDelete = () => {
    deleteStudent(id)
      .then(() => {
        setAlertText("Successfully deleted")
        setAlertSeverity("success")
        setAlertOpen(true)
        setTimeout(() => {
          navigate("/students")
        }, 2000)
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
    handleDrawerClose()
  };
  const handleStudentEdit = (data) => {
    updateStudent(id, data)
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
  }
  const handleMessageEdit = (data) => {
    updateMessages(id, data)
      .then(() => {
        setAlertText("Successfully updated")
        setAlertSeverity("success")
        setAlertOpen(true)
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
    handleDrawerClose()
  }

  const fetchData = () => {
    getStudentDetail(id)
      .then(student => {
        setPerson(student);
      })
      .catch(error => {
        setDataLoadingError(error.toString())
      })
  }
  const fetchMessages = () => {
    getMessages(id)
      .then(messages => {
        setMessages(messages)
      })
      .catch(error => {
        setDataLoadingError(error.toString())
      })
  }

  useEffect(() => {
    fetchData()
    fetchMessages()
  }, []);

  return (
    <Box component={"div"}>
      {/*Person details section*/}
      {dataLoadingError ? (
        <Alert severity="error">
          {dataLoadingError}
        </Alert>
      ) : (
        person ? (
          <Box component={"div"}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" sx={{marginX: 1, paddingY: 2}}>{getFullName(person)}</Typography>
              <IconButton
                id="person-option-button"
                aria-controls={menuOpen ? 'person-option-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? 'true' : undefined}
                onClick={handleOptionMenuClick}
              >
                <MoreVert/>
              </IconButton>
              <Menu
                id="person-option-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleOptionMenuClose}
              >
                <MenuItem onClick={handleEditPersonButton}>
                  <ListItemIcon>
                    <Edit fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Изменить данные студента"/>
                </MenuItem>
                <MenuItem onClick={handleEditMessagesButton}>
                  <ListItemIcon>
                    <Message fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Изменить шаблоны сообщений"/>
                </MenuItem>
                <MenuItem onClick={handleDeletePersonButton}>
                  <ListItemIcon>
                    <Delete fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Удалить студента"/>
                </MenuItem>
              </Menu>
            </Stack>

            {person.birthday ? (
              <Chip icon={<Cake/>} label={formatDateFromString(person.birthday)} sx={{paddingX: 1}}/>
            ) : undefined}

            {person.phone ? (
              <Stack
                direction="row"
                spacing={2}
                sx={{paddingX: 1}}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1" color="textSecondary" sx={{paddingY: 2}}>
                  Tel: +{person.phone}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton component={"a"} href={`https://wa.me/${person.phone}`} target="_blank">
                    <WhatsApp color="success"/>
                  </IconButton>
                  <IconButton component={"a"} href={`https://t.me/+${person.phone}`} target="_blank">
                    <Telegram color="primary"/>
                  </IconButton>
                  <IconButton component={"a"} href={`tel://${person.phone}`}>
                    <Phone color="warning"/>
                  </IconButton>
                </Stack>
              </Stack>
            ) : (
              <Typography variant="body1" color="textSecondary">Телефон не указан</Typography>
            )}

            <Divider variant="middle" component="div"/>

            {person.has_parent ? (
              <Box component="div">
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                  <Typography variant="h6" sx={{marginX: 1, paddingY: 1}}>
                    {person.parent_first_name} {person.parent_last_name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">Родитель</Typography>
                </Stack>

                {person.parent_birthday ? (
                  <Chip icon={<Cake/>} label={formatDateFromString(person.parent_birthday)} sx={{paddingX: 1}}/>
                ) : undefined}

                {person.parent_phone ? (
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{paddingX: 1}}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="body1" color="textSecondary" sx={{paddingY: 1}}>
                      Tel: +{person.parent_phone}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <IconButton component={"a"} href={`https://wa.me/${person.parent_phone}`} target="_blank">
                        <WhatsApp color="success"/>
                      </IconButton>
                      <IconButton component={"a"} href={`https://t.me/+${person.parent_phone}`} target="_blank">
                        <Telegram color="primary"/>
                      </IconButton>
                      <IconButton component={"a"} href={`tel://${person.parent_phone}`}>
                        <Phone color="warning"/>
                      </IconButton>
                    </Stack>
                  </Stack>
                ) : (
                  <Typography variant="body1" color="textSecondary">Телефон не указан</Typography>
                )}
              </Box>
            ) : undefined}

            <Divider variant="fullWidth" component="div"/>
          </Box>
        ) : (
          <Box sx={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        ))}

      {/*LessonsByPerson section*/}
      <CancelledLessons fetchLessons={getCancelledLessonsByStudent} byPerson={STUFF.STUDENT}/>
      <Lessons fetchLessons={getLessonsByStudent} byPerson={STUFF.STUDENT}/>

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
          {editProfile ? (
            <StudentForm
              student={person}
              handleDrawerClose={handleDrawerClose}
              handleStudentSave={handleStudentEdit}
            />
          ) : (
            deleting ? (
              <DeleteConfirm handleCancel={handleDrawerClose} handleConfirm={handleStudentDelete}/>
            ) : (
              editMessages ? (
                <MessagesForm
                  messages={messages}
                  handleDrawerClose={handleDrawerClose}
                  handleMessageSave={handleMessageEdit}
                />
              ) : undefined
            )
          )}
        </Drawer>
      </React.Fragment>
    </Box>)
}