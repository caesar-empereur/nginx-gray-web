import Cookies from 'js-cookie'

const token = "token";

export function getToken() {
  return localStorage.getItem(token)
}

export function setToken(tokenVal) {
    localStorage.setItem(token, tokenVal);
}

export function removeToken() {
  return localStorage.removeItem(token)
}
