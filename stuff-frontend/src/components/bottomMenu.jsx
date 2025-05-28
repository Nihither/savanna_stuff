import React from 'react';
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import {BabyChangingStation, Notifications, School, TaskAlt} from "@mui/icons-material";


export default function BottomMenu() {

  return (
    <Paper elevation={15} sx={{position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: 2, zIndex: 100}}>
      <BottomNavigation showLabels={true}>
        <BottomNavigationAction component={Link} to="/reminders"
                                label="RemindersPage" icon={<Notifications />} />
        <BottomNavigationAction component={Link} to="/reports"
                                label="ReportsPage" icon={<TaskAlt />} />
        <BottomNavigationAction component={Link} to="/teachers"
                                label="TeachersPage" icon={<School />} />
        <BottomNavigationAction component={Link} to="/students"
                                label="StudentsPage" icon={<BabyChangingStation />} />
      </BottomNavigation>
    </Paper>
  )
}