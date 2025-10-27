import {STUFF_ROUTES} from "../common/staticValues.js";
import {getToken} from "./authApi.js";
import {handleDataResponse, handleResponse} from "./responseHandlers.js";


export async function getMessages(studentId) {
  let url = `${STUFF_ROUTES.STUDENTS}/${studentId}/messages`
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}

export async function updateMessages(studentId, messages) {
  let url = `${STUFF_ROUTES.STUDENTS}/${studentId}/messages`
  let response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages)
  })
  return handleResponse(response)
}