import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
  Alert,
  Box, Button,
  Chip, Divider, Drawer,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem, Snackbar,
  Stack, TextField,
  Typography
} from "@mui/material";
import {deleteTeacher, getTeacherDetails, updateTeacher} from "../api/teachers_api.js";
import {formatDateFromString, getFullName} from "../utils/formating.js";
import {Cake, Delete, Edit, MoreVert, Phone, Telegram, WhatsApp} from "@mui/icons-material";
import TeachersLessons from "../components/teachers_lessons.jsx";


export default function TeacherProfile() {

  const navigate = useNavigate();
  const {id} = useParams();
  const [person, setPerson] = useState(null);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('')
  const [dataLoadingError, setDataLoadingError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleting, setDeleting] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  };
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value)
  }
  const handleTeacherEdit = (e) => {
    e.preventDefault()
    const formData = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      birthday: birthday,
    }
    updateTeacher(id, formData)
      .then(() => {
        setPerson({
          ...person,
          "first_name": first_name,
          "last_name": last_name,
          "phone": phone,
          "birthday": birthday
        })
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

  useEffect(() => {
    getTeacherDetails(id)
      .then(teacher => {
        setPerson(teacher);
        setFirstName(teacher.first_name);
        setLastName(teacher.last_name);
        setPhone(teacher.phone);
        setBirthday(teacher.birthday);
      })
      .catch(error => {
        setDataLoadingError(error.toString())
      })
  }, [getTeacherDetails, id]);

  return (<div>
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

    {/*Alert section*/}
    <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} sx={{marginBottom: 10}}>
      <Alert
        onClose={handleAlertClose}
        severity={alertSeverity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alertText}
      </Alert>
    </Snackbar>

    {/* Modal */}
    <React.Fragment>
      <Drawer
        anchor="bottom"
        open={modalOpen}
        onClose={handleDrawerClose}
      >
        {edit ? (
          <Box component={"form"}
               onSubmit={handleTeacherEdit}
               sx={{ '& .MuiTextField-root': { my: 1}, marginY: 4, marginX: 3}}
               autoComplete="off">
            <TextField
              fullWidth
              required
              name="first_name"
              label="Имя"
              onChange={handleFirstNameChange}
              value={first_name ? first_name : ''}
            />
            <TextField
              fullWidth
              required
              name="last_name"
              label="Фамилия"
              onChange={handleLastNameChange}
              value={last_name ? last_name : ''}
            />
            <TextField
              fullWidth
              name="phone"
              label="Телефон"
              onChange={handlePhoneChange}
              value={phone ? phone : ''}
            />
            <TextField
              fullWidth
              name="birthday"
              label="День рождения"
              onChange={handleBirthdayChange}
              value={birthday ? birthday : ''}
            />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Button variant="outlined" color="info" onClick={handleDrawerClose} >Отмена</Button>
              <Button type="submit" variant="contained" color="primary" >Сохранить</Button>
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
            <></>
          )
        )}
      </Drawer>
    </React.Fragment>
  </div>)
}