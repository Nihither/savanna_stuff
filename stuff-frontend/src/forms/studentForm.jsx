import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, FormControlLabel, Stack, Switch, TextField} from "@mui/material";


export default function StudentForm({handleStudentSave, handleDrawerClose, student}) {

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [phone, setPhone] = useState(null)
  const [birthday, setBirthday] = useState(null)
  const [hasParent, setHasParent] = useState(false)
  const [parentFirstName, setParentFirstName] = useState(null)
  const [parentLastName, setParentLastName] = useState(null)
  const [parentBirthday, setParentBirthday] = useState(null)
  const [parentPhone, setParentPhone] = useState(null)
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }
  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value)
  }
  const handleHasParentChange = (e) => {
    setHasParent(e.target.checked)
  }
  const handleParentFirstNameChange = (e) => {
    setParentFirstName(e.target.value)
  }
  const handleParentLastNameChange = (e) => {
    setParentLastName(e.target.value)
  }
  const handleParentBirthdayChange = (e) => {
    setParentBirthday(e.target.value)
  }
  const handleParentPhoneChange = (e) => {
    setParentPhone(e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      birthday: birthday,
      has_parent: hasParent,
      parent_first_name: parentFirstName,
      parent_last_name: parentLastName,
      parent_birthday: parentBirthday,
      parent_phone: parentPhone
    }
    handleStudentSave(data)
    handleDrawerClose()
  }

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name)
      setLastName(student.last_name)
      setPhone(student.phone)
      setBirthday(student.birthday)
      setHasParent(student.has_parent)
      setParentFirstName(student.parent_first_name)
      setParentLastName(student.parent_last_name)
      setParentBirthday(student.parent_birthday)
      setParentPhone(student.parent_phone)
    }
  }, [student]);

  return (
    <Box component={"form"}
         onSubmit={onFormSubmit}
         sx={{'& .MuiTextField-root': {my: 1}, '& .MuiButton-root': {my: 1}, marginY: 4, marginX: 3}}
         autoComplete="off">
      <TextField
        fullWidth
        required
        name="first_name"
        label="Имя"
        type="text"
        onChange={handleFirstNameChange}
        value={firstName ? firstName : ''}
      />
      <TextField
        fullWidth
        required
        name="last_name"
        label="Фамилия"
        type="text"
        onChange={handleLastNameChange}
        value={lastName ? lastName : ''}
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
      <FormControlLabel
        control={
          <Switch checked={hasParent} name="has_parent" onChange={handleHasParentChange}/>
        } label="Есть родитель?"
      />
      {hasParent ? (
        <>
          <TextField
            fullWidth
            required
            name="parent_first_name"
            label="Имя родителя"
            type="text"
            onChange={handleParentFirstNameChange}
            value={parentFirstName ? parentFirstName : ''}
          />
          <TextField
            fullWidth
            required
            name="parent_last_name"
            label="Фамилия родителя"
            type="text"
            onChange={handleParentLastNameChange}
            value={parentLastName ? parentLastName : ''}
          />
          <TextField
            fullWidth
            name="parent_phone"
            label="Телефон родителя"
            type="tel"
            onChange={handleParentPhoneChange}
            value={parentPhone ? parentPhone : ''}
          />
          <TextField
            fullWidth
            name="parent_birthday"
            label="День рождения родителя"
            onChange={handleParentBirthdayChange}
            value={parentBirthday ? parentBirthday : ''}
          />
        </>
      ) : undefined}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button variant="outlined" color="info" onClick={handleDrawerClose}>Отмена</Button>
        <Button type="submit" variant="contained" color="primary">Сохранить</Button>
      </Stack>
    </Box>
  )
}