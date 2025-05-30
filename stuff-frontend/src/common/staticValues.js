const API_HOST = 'http://192.168.0.47:8080'
const AUTH_BASE_URL = `${API_HOST}/api/auth`
const STUFF_BASE_URL = `${API_HOST}/api/stuff`

export const AUTH_ROUTES = {
  SIGN_IN: `${AUTH_BASE_URL}/signin`,
  SIGN_OUT: `${AUTH_BASE_URL}/signout`
}

export const STUFF_ROUTES = {
  REMINDERS: `${STUFF_BASE_URL}/reminders`,
  REPORTS: `${STUFF_BASE_URL}/reports`,
  TEACHERS: `${STUFF_BASE_URL}/teachers`,
  STUDENTS: `${STUFF_BASE_URL}/students`,
  LESSONS: `${STUFF_BASE_URL}/lessons`
}

export const WEEKDAYS = [
  {id: 0, name: "Понедельник"},
  {id: 1, name: "Вторник"},
  {id: 2, name: "Среда"},
  {id: 3, name: "Четверг"},
  {id: 4, name: "Пятница"},
  {id: 5, name: "Суббота"},
  {id: 6, name: "Воскресенье"},
]