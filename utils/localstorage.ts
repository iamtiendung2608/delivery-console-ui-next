export const LOCAL_STORAGE_USER_DATA = 'access_token'
export const isLocalStorageAccess = () => {
  try {
    return !!(window && window.localStorage)
  } catch (error) {
    return false
  }
}

export const getDataLocalStorage = () => {
  if (isLocalStorageAccess()) {
    const token = window?.localStorage?.getItem(LOCAL_STORAGE_USER_DATA)
    console.log(token);
    const json = token ? JSON.parse(token) : null
    return json
  }
  return null
}

export const setDataLocalStorage = (data: any) => {
  isLocalStorageAccess() && window.localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(data))
}

export const clearTokenLocalStorage = () => {
  isLocalStorageAccess() && window.localStorage.removeItem(LOCAL_STORAGE_USER_DATA)
}
