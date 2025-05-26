import {handleResponse} from "./response_handlers.js";


export async function createLesson(formData) {
  let url = 'http://192.168.0.47:8080/api/lessons'
  let response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function updateLesson(id, formData) {
  let url = `http://192.168.0.47:8080/api/lessons/${id}`
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response);
}

export async function deleteLesson(id) {
  let url = `http://192.168.0.47:8080/api/lessons/${id}`
  let response = await fetch(url, {
    method: "DELETE",
  })
  return handleResponse(response)
}