import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {WEEKDAYS} from "../common/staticValues.js";
import {getFullName} from "../utils/formating.js";
import {useParams} from "react-router-dom";


export default function LessonForm({lesson, teachers, students, handleDrawerClose, handleLessonSave, byPerson}) {

  const {id} = useParams()
  const [teacher, setTeacher] = useState(null)
  const [student, setStudent] = useState(null)
  const [day, setDay] = useState(null)
  const [timestamp, setTimestamp] = useState(null)
  const handleTeacherChange = (e) => {
    setTeacher(e.target.value)
  };
  const handleStudentChange = (e) => {
    setStudent(e.target.value)
  };
  const handleDayChange = (e) => {
    setDay(e.target.value)
  };
  const handleTimestampChange = (e) => {
    setTimestamp(e.target.value)
  };
  const onFormSubmit = (e) => {
    e.preventDefault()
    const data = {
      teacher: teacher,
      student: student,
      day: day,
      timestamp: timestamp
    }
    handleLessonSave(data);
    handleDrawerClose();
  };

  useEffect(() => {
    if (lesson) {
      setTeacher(byPerson === "teacher" ? id : lesson.teacher.id);
      setStudent(byPerson === "student" ? id : lesson.student.id);
      setDay(lesson.day);
      setTimestamp(lesson.timestamp)
    }
  }, []);

  return (
    <Box component={"form"}
         onSubmit={onFormSubmit}
         sx={{'& .MuiTextField-root': {my: 1}, '& .MuiButton-root': {my: 1}, marginY: 4, marginX: 3}}
         autoComplete="off"
    >
      <FormControl fullWidth sx={{my: 1}}>
        <FormLabel id="teacher-select-label">Преподаватель</FormLabel>
        <Select
          required
          labelId="teacher-select-label"
          id="teacher-select"
          value={teacher}
          onChange={handleTeacherChange}
        >
          { Array.isArray(teachers) && teachers.length > 0 ? (
            teachers.map(person => (
              <MenuItem value={person.id}>{getFullName(person)}</MenuItem>
            ))
          ) : (
            setTeacher("Network error.")
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{my: 1}}>
        <FormLabel id="student-select-label">Ученик</FormLabel>
        <Select
          required
          labelId="student-select-label"
          id="student-select"
          value={student}
          onChange={handleStudentChange}
        >
          { Array.isArray(students) && students.length > 0 ? (
            students.map(person => (
              <MenuItem value={person.id}>{getFullName(person)}</MenuItem>
            ))
          ) : (
            setTeacher("Network error.")
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{my: 1}}>
        <FormLabel id="day-select-label">День недели</FormLabel>
        <Select
          required
          labelId="day-select-label"
          id="day-select"
          value={day}
          onChange={handleDayChange}
        >
          {WEEKDAYS.map(weekday => (
            <MenuItem value={weekday.id}>{weekday.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{my: 1}}>
        <FormLabel id="timestamp-label">Время</FormLabel>
        <TextField
          fullWidth
          name="timestamp"
          onChange={handleTimestampChange}
          value={timestamp}
        />
      </FormControl>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button variant="outlined" color="info" onClick={handleDrawerClose}>Отмена</Button>
        <Button type="submit" variant="contained" color="primary">Сохранить</Button>
      </Stack>
    </Box>
  )
}