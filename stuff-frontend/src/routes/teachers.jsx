import React, {useEffect, useState} from 'react';
import {
  Alert,
  Box, Drawer,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem, Stack,
  Typography
} from "@mui/material";
import StuffList from "../components/stuffList.jsx";
import {createTeacher, getTeachersList} from "../api/teachersApi.js";
import {MoreVert, PersonAdd} from "@mui/icons-material";
import CustomAlert from "../components/elements/customAlert.jsx";
import TeacherForm from "../forms/teacherForm.jsx";


export default function Teachers() {

  const [teachers, setTeachers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null)
  const [edit, setEdit] = useState(false)
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
    toggleDrawer(false);
  };
  const handleOptionMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAddPersonButton = () => {
    setEdit(true);
    handleOptionMenuClose()
    toggleDrawer(true)
  };
  const handleTeacherSave = (data) => {
    createTeacher(data)
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

  const fetchData = () => {
    getTeachersList()
      .then(teachers => {
        setTeachers(teachers);
        setIsLoaded(true);
      })
      .catch(error => {
        setError(error.toString())
        setIsLoaded(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Box component={"div"}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" sx={{marginX: 1, paddingY: 2}}>Преподаватели</Typography>
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
          <MenuItem onClick={handleAddPersonButton}>
            <ListItemIcon>
              <PersonAdd fontSize="small"/>
            </ListItemIcon>
            <ListItemText primary="Добавить преподавателя"/>
          </MenuItem>
        </Menu>
      </Stack>

      {error ?
        (
          <Alert severity="error">
            {error}
          </Alert>
        ) :
        (isLoaded ?
          (Array.isArray(teachers) && teachers.length > 0 ?
            (
              <StuffList stuff={teachers}/>
            ) : (
              <Typography variant="body1">No Content</Typography>
            )) : (
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
            <TeacherForm
              handleDrawerClose={handleDrawerClose}
              handleTeacherSave={handleTeacherSave}
            />
          ) : (
            <></>
          )}
        </Drawer>
      </React.Fragment>
    </Box>
  )
}