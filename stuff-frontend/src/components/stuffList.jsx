import React from 'react';
import {List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {getFullName} from "../utils/formating.js";
import {Link, useLocation} from "react-router-dom";
import {Person} from "@mui/icons-material";


export default function StuffList(props) {

  const stuff = props.stuff;
  const location = useLocation();

  return (
    <List sx={{'& ul': { padding: 0 }, }} >
      {stuff.map((person) => (
        <ListItemButton key={person.id} component={Link} to={`${location.pathname}/${person.id}`}>
          <ListItemAvatar>
            <Person />
          </ListItemAvatar>
          <ListItemText primary={getFullName(person)} />
        </ListItemButton>
      ))}
    </List>
  )
}