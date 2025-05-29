import {handleDataResponse, handleResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";
import {getToken} from "./authApi.js";

export async function getTeachersList() {
  let url = STUFF_ROUTES.TEACHERS;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}

export async function getTeacherDetails(id) {
  let url = `${STUFF_ROUTES.TEACHERS}/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}

export async function createTeacher(formData) {
  let url = STUFF_ROUTES.TEACHERS;
  let response  = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
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
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function deleteTeacher(id) {
  let url = `${STUFF_ROUTES.TEACHERS}/${id}`;
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${getToken()}`,
    },
  })
  return handleResponse(response)
}

export async function getLessonsByTeacher(id){
  let url = `${STUFF_ROUTES.TEACHERS}/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}