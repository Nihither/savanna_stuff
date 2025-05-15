export async function handleResponse(response) {
  if (response.status === 200) {
    const json = await response.json()
    return Promise.resolve(json)
  } else if (response.status === 204) {
    return Promise.resolve()
  } else {
    const error = response.statusText
    return Promise.reject(error)
  }
}