import {AUTH_ROUTES} from "../common/staticValues.js";


export function getUser() {
  return localStorage.getItem("user")
}

export function getToken() {
  return localStorage.getItem("token")
}

export function cleanAuthInfo() {
  localStorage.clear()
}

export async function signIn(formData) {
  let url = AUTH_ROUTES.SIGN_IN;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  if (response.ok) {
    const data = await response.json()
    localStorage.setItem("user", data.username)
    localStorage.setItem("token", data.token)
  } else {
    throw new Error(response.statusText);
  }
}

export function signout() {
  let url = AUTH_ROUTES.SIGN_OUT
  fetch(url, {
    method: "GET",
    headers: {
      'Authorization': `Token ${getToken()}`,
    }
  })
  cleanAuthInfo()
}