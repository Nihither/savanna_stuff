import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Alert, Box, LinearProgress} from "@mui/material";


function Profile(props) {

  let getPerson = props.getPerson
  const {id} = useParams();
  const [person, setPerson] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    getPerson(id)
      .then(teacher => {
        setPerson(teacher);
      })
      .catch(error => {
        setError(error)
      })
  }, [getPerson, id]);

  return (
    <div>
      {/*Person details section*/}
      { error ?
        (
          <Alert severity="error">
            Network error. Please try later
          </Alert>
        ) :
        ( person ?
          (
            person.first_name
          ) : (
            <Box sx={{width: '100%'}}>
              <LinearProgress/>
            </Box>
          ))}

      {/*LessonsByPerson section*/}
      {}
    </div>
  )
}

export default Profile;