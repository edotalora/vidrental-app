import http from "./httpService";
import config from "../config.json";
import _ from "lodash"; //underscore js library upgrade
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

//this was defined to get rid of bidirectional dependencies.
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};