import {handleResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";


export async function createLesson(formData) {
  let url = `${STUFF_ROUTES.LESSONS}`
  let response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response)
}

export async function updateLesson(id, formData) {
  let url = `${STUFF_ROUTES.LESSONS}/${id}`
  let response = await fetch(url, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(formData)
  })
  return handleResponse(response);
}

export async function deleteLesson(id) {
  let url = `${STUFF_ROUTES.LESSONS}/${id}`
  let response = await fetch(url, {
    method: "DELETE",
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  })
  return handleResponse(response)
}