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
import {deleteTeacher, getLessonsByTeacher, getTeacherDetails, updateTeacher} from "../api/teachersApi.js";
import {formatDateFromString, getFullName} from "../utils/formating.js";
import {Cake, Delete, Edit, MoreVert, Phone, Telegram, WhatsApp} from "@mui/icons-material";
import DeleteConfirm from "../components/elements/deleteConfirm.jsx";
import TeacherForm from "../forms/teacherForm.jsx";
import CustomAlert from "../components/elements/customAlert.jsx";
import Lessons from "../components/lessons.jsx";
import {STUFF} from "../common/staticValues.js";


export default function TeacherProfile() {

  const navigate = useNavigate();
  const {id} = useParams();
  const [person, setPerson] = useState(null);
  const [dataLoadingError, setDataLoadingError] = useState('');
  const [edit, setEdit] = useState(false);
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
    setEdit(false);
    setDeleting(false);
    toggleDrawer(false);
  };
  const handleOptionMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditPersonButton = () => {
    setEdit(true);
    handleOptionMenuClose()
    toggleDrawer(true)
  };
  const handleDeletePersonButton = () => {
    setDeleting(true);
    handleOptionMenuClose();
    toggleDrawer(true);
  };
  const handleTeacherDelete = () => {
    deleteTeacher(id)
      .then(() => {
        setAlertText("Successfully deleted")
        setAlertSeverity("success")
        setAlertOpen(true)
        setTimeout(() => {
          navigate("/teachers")
        }, 2000)
      })
      .catch((error) => {
        setAlertText(error.toString())
        setAlertSeverity("error")
        setAlertOpen(true)
      })
    handleDrawerClose()
  };
  const handleTeacherEdit = (data) => {
    updateTeacher(id, data)
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

  const fetchData = () => {
    getTeacherDetails(id)
      .then(teacher => {
        setPerson(teacher);
      })
      .catch(error => {
        setDataLoadingError(error.toString())
      })
  }

  useEffect(() => {
    fetchData();
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
                  <ListItemText primary="Изменить данные препродавателя"/>
                </MenuItem>
                <MenuItem onClick={handleDeletePersonButton}>
                  <ListItemIcon>
                    <Delete fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primary="Удалить преподавателя"/>
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
          </Box>
        ) : (
          <Box sx={{width: '100%'}}>
            <LinearProgress/>
          </Box>
        ))}

      {/*LessonsByPerson section*/}
      <Lessons fetchLessons={getLessonsByTeacher} byPerson={STUFF.TEACHER}/>

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
            <TeacherForm
              teacher={person}
              handleDrawerClose={handleDrawerClose}
              handleTeacherSave={handleTeacherEdit}
            />
          ) : (
            deleting ? (
              <DeleteConfirm handleCancel={handleDrawerClose} handleConfirm={handleTeacherDelete}/>
            ) : (
              <></>
            )
          )}
        </Drawer>
      </React.Fragment>
    </Box>)
}