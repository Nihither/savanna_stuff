import {handleDataResponse, handleResponse} from "./response_handlers.js";


export async function getTeachersList() {
  let url = 'http://192.168.0.47:8080/api/teachers'
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleDataResponse(response)
}

export async function getTeacherDetails(id) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleDataResponse(response)
}

export async function createTeacher(formData) {
  let url = 'http://192.168.0.47:8080/api/teachers'
  let response  = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function updateTeacher(id, formData) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function deleteTeacher(id) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: 'DELETE'
  })
  return handleResponse(response)
}

export async function getLessonsByTeacher(id){
  let url = `http://192.168.0.47:8080/api/teachers/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleDataResponse(response)
}