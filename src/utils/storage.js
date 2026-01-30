export function getUserData(username) {
  const data = localStorage.getItem(`expense_data_${username}`)
  return data ? JSON.parse(data) : null
}

export function setUserData(username, data) {
  localStorage.setItem(`expense_data_${username}`, JSON.stringify(data))
}
