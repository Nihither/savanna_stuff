import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField} from "@mui/material";


export default function TeacherForm({handleTeacherSave, handleDrawerClose, teacher}) {

  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [birthday, setBirthday] = useState(null)
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
  const onFormSubmit = (e) => {
    e.preventDefault()
    const data = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      birthday: birthday
    }
    handleTeacherSave(data)
    handleDrawerClose()
  }

  useEffect(() => {
    if (teacher) {
      setFirstName(teacher.first_name)
      setLastName(teacher.last_name)
      setPhone(teacher.phone)
      setBirthday(teacher.birthday)
    }
  }, [teacher]);

  return (
    <Box component={"form"}
         onSubmit={onFormSubmit}
         sx={{'& .MuiTextField-root': {my: 1}, marginY: 4, marginX: 3}}
         autoComplete="off">
      <TextField
        fullWidth
        required
        name="first_name"
        label="Имя"
        type="text"
        onChange={handleFirstNameChange}
        value={first_name ? first_name : ''}
      />
      <TextField
        fullWidth
        required
        name="last_name"
        label="Фамилия"
        type="text"
        onChange={handleLastNameChange}
        value={last_name ? last_name : ''}
      />
      <TextField
        fullWidth
        name="phone"
        label="Телефон"
        type="tel"
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
        <Button variant="outlined" color="info" onClick={handleDrawerClose}>Отмена</Button>
        <Button type="submit" variant="contained" color="primary">Сохранить</Button>
      </Stack>
    </Box>
  )
}