import {handleResponse} from "./response_handler.js";


export async function getReportsList() {
  let url = 'http://192.168.0.47:8080/api/reports'
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}