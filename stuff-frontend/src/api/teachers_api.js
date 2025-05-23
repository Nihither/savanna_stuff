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

export async function updateTeacher(id, formData) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  if (response.ok) {
    return response;
  } else {
    throw new Error(response.statusText)
  }
}

export async function deleteTeacher(id) {
  let url = `http://192.168.0.47:8080/api/teachers/${id}`
  let response = await fetch(url, {
    method: 'DELETE'
  })

  if (response.ok) {
    return response;
  } else {
    throw new Error(response.statusText)
  }
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