import {handleResponse} from "./response_handler.js";


export async function getTeachersList() {
  let url = 'http://192.168.0.47:8080/api/teachers'
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}

export async function getTeacherDetails(id) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}

export async function deleteTeacher(id) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: 'DELETE'
  })
  return response;
}

export async function getLessonsByTeacher(id){
  let url = `http://192.168.0.47:8080/api/teachers/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}