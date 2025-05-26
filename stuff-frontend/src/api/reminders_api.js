import {handleDataResponse} from "./response_handlers.js";


export async function getRemindersList() {
  const url = 'http://192.168.0.47:8080/api/reminders'
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return handleDataResponse(response)
}