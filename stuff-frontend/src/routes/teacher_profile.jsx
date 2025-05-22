import React, {useEffect, useState} from 'react';
import {redirect, useParams} from "react-router-dom";
import {
  Alert,
  Box, Button,
  Chip, Divider, Drawer,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack, TextField,
  Typography
} from "@mui/material";
import {deleteTeacher, getTeacherDetails} from "../api/teachers_api.js";
import {formatDateFromString, getFullName} from "../utils/formating.js";
import {Cake, Delete, Edit, MoreVert, Phone, Telegram, WhatsApp} from "@mui/icons-material";
import TeachersLessons from "../components/teachers_lessons.jsx";


export default function TeacherProfile() {

  const {id} = useParams();
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false)
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
    console.log("deleted")
    handleDrawerClose()
    // deleteTeacher(id)
    //   .then(() => {
    //     redirect("/teachers")
    //   })
  };
  const handleTeacherEdit = () => {
    console.log("updated")
    handleDrawerClose()
  }

  useEffect(() => {
    getTeacherDetails(id)
      .then(teacher => {
        setPerson(teacher);
      })
      .catch(error => {
        setError(error)
      })
  }, [getTeacherDetails, id]);

  return (<div>
    {/*Person details section*/}
    {error ? (
      <Alert severity="error">
        Network error. Please try later
      </Alert>
    ) : (
      person ? (
        <Box component={"div"}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" sx={{marginX: 1, paddingY: 2}}>{getFullName(person)}</Typography>
            <IconButton
              id="person-option-button"
              aria-controls={open ? 'person-option-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOptionMenuClick}
            >
              <MoreVert/>
            </IconButton>
            <Menu
              id="person-option-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleOptionMenuClose}
            >
              <MenuItem onClick={handleEditPersonButton}>
                <ListItemIcon>
                  <Edit fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Изменить"/>
              </MenuItem>
              <MenuItem onClick={handleDeletePersonButton}>
                <ListItemIcon>
                  <Delete fontSize="small"/>
                </ListItemIcon>
                <ListItemText primary="Удалить"/>
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
    <Box component={"div"}>
      <Typography variant="subtitle1" sx={{paddingX: 1, paddingTop: 2}}>Занятия</Typography>
      <TeachersLessons/>
    </Box>

    {/* Modal */}
    <React.Fragment>
      <Drawer
        anchor="bottom"
        open={modalOpen}
        onClose={handleDrawerClose}
      >
        {edit ? (
          <Box component={"form"}
               sx={{ '& .MuiTextField-root': { my: 1}, marginY: 4, marginX: 3}}
               autoComplete="off">
            <TextField
              fullWidth
              required
              id="first_name"
              label="Имя"
              value={person.first_name}
            />
            <TextField
              fullWidth
              required
              id="last_name"
              label="Фамилия"
              value={person.last_name}
            />
            <TextField
              fullWidth
              id="phone"
              label="Телефон"
              value={person.phone}
            />
            <TextField
              fullWidth
              id="birthday"
              label="День рождения"
              value={person.birthday}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Button variant="outlined" color="info" onClick={handleDrawerClose} >Отмена</Button>
              <Button variant="contained" color="primary" onClick={handleTeacherEdit} >Сохранить</Button>
            </Stack>
          </Box>
        ) : (
          deleting ? (
            <Box component={"div"} sx={{paddingY: 4}}>
              <Typography variant="h6" align="center" sx={{paddingBottom: 4}}>Уверены, что хотите удалить?</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-around">
                <Button variant="outlined" color="info" value="Отмена" onClick={handleDrawerClose} >Отмена</Button>
                <Button variant="contained" color="primary" value="Удалить" onClick={handleTeacherDelete} >Удалить</Button>
              </Stack>
            </Box>
          ) : (
            () => toggleDrawer(false)
          )
        )}
      </Drawer>
    </React.Fragment>
  </div>)
}