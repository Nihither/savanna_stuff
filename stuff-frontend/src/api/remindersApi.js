import {handleDataResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";
import {getToken} from "./authApi.js";


export async function getRemindersList() {
  const url = STUFF_ROUTES.REMINDERS;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  });
  return handleDataResponse(response)
}