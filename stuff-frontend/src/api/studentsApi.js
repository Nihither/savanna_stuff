import {handleDataResponse, handleResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";


export async function getStudentsList() {
  let url = `${STUFF_ROUTES.STUDENTS}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}

export async function getStudentDetail(id) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}

export async function createStudent(formData) {
  let url = `${STUFF_ROUTES.STUDENTS}`
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

export async function updateStudent(id, formData) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}`
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

export async function deleteStudent(id) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}`
  let response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
  return handleResponse(response)
}

export async function getLessonsByStudent(id) {
  let url = `${STUFF_ROUTES.STUDENTS}/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}