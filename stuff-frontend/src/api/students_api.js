import {handleResponse} from "./response_handler.js";


export async function getStudentsList() {
  let url = 'http://192.168.0.47:8080/api/students'
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}

export async function getStudentDetail(id) {
  let url = `http://192.168.0.47:8080/api/students/${id}`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}

export async function getLessonsByStudent(id) {
  let url = `http://192.168.0.47:8080/api/students/${id}/lessons`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}