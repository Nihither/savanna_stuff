import {handleDataResponse, handleResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";
import Cookie from 'js-cookie';

export async function getTeachersList() {
  let url = STUFF_ROUTES.TEACHERS;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}

export async function getTeacherDetails(id) {
  let url = `${STUFF_ROUTES.TEACHERS}/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}

export async function createTeacher(formData) {
  let url = STUFF_ROUTES.TEACHERS;
  let response  = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function updateTeacher(id, formData) {
  let url = `${STUFF_ROUTES.TEACHERS}/${id}`;
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function deleteTeacher(id) {
  let url = `${STUFF_ROUTES.TEACHERS}/${id}`;
  let token = Cookie.get('csrftoken')
  console.log(token)
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`,
      // 'X-CSRFToken': Cookie.get('csrftoken')
    },
  })
  return handleResponse(response)
}

export async function getLessonsByTeacher(id){
  let url = `${STUFF_ROUTES.TEACHERS}/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}