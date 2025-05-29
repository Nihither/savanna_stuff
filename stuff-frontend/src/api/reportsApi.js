import {handleDataResponse} from "./responseHandlers.js";
import {STUFF_ROUTES} from "../common/staticValues.js";
import {getToken} from "./authApi.js";


export async function getReportsList() {
  let url = STUFF_ROUTES.REPORTS;
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })
  return handleDataResponse(response)
}