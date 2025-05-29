import {handleDataResponse, handleResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";
import {getToken} from "./authApi.js";


export async function getStudentsList() {
  let url = `${STUFF_ROUTES.STUDENTS}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}

export async function getStudentDetail(id) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}

export async function createStudent(formData) {
  let url = `${STUFF_ROUTES.STUDENTS}`
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

export async function updateStudent(id, formData) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}`
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

export async function deleteStudent(id) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}`
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${getToken()}`,
    }
  })
  return handleResponse(response)
}

export async function getLessonsByStudent(id) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}