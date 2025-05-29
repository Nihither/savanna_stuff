import {handleResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";
import {getToken} from "./authApi.js";


export async function createLesson(formData) {
  let url = `${STUFF_ROUTES.LESSONS}`
  let response = await fetch(url, {
    method: "POST",
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
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
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
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
      'Authorization': `Token ${getToken()}`,
    }
  })
  return handleResponse(response)
}