import {handleDataResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";


export async function getRemindersList() {
  const url = STUFF_ROUTES.REMINDERS;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  });
  return handleDataResponse(response)
}