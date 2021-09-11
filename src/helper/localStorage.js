function saveLocalStorage(key, payload) {
  return localStorage.setItem(key, JSON.stringify(payload));
}

function getLocalStorage(key) {
  return localStorage.getItem(key);
}

function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export { saveLocalStorage, getLocalStorage, removeLocalStorage };
