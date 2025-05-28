import {handleDataResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";


export async function getReportsList() {
  let url = STUFF_ROUTES.REPORTS;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
  })
  return handleDataResponse(response)
}