import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
  Alert,
  Box,
  Chip, Divider,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";
import {getTeacherDetails} from "../api/teachers_api.js";
import {formatDateFromString, getFullName} from "../utils/formating.js";
import {Cake, Delete, Edit, MoreVert, Phone, Telegram, WhatsApp} from "@mui/icons-material";
import TeachersLessons from "../components/teachers_lessons.jsx";


function TeacherProfile() {

  const {id} = useParams();
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOptionMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditPersonButton = () => {
    // setEdit(true);
    console.log("edit")
  };
  const handleDeletePersonButton = () => {
    console.log("delete")
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
        edit ? (
          <Box component={"form"}>
            <FormControl>
              <InputLabel/>
              <Input/>
            </FormControl>
          </Box>
        ) : (
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

            { person.birthday ? (
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
        )) : (
        <Box sx={{width: '100%'}}>
          <LinearProgress/>
        </Box>
      ))}

    {/*LessonsByPerson section*/}
    <Box component={"div"}>
      <Typography variant="subtitle1" sx={{paddingX: 1, paddingTop: 2}}>Занятия</Typography>
      <TeachersLessons />
    </Box>
  </div>)
}

export default TeacherProfile;