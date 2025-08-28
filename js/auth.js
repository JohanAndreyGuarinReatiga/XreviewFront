import { apiRequest } from "./api.js";

let token = null;
let currentUser = null;

export async function registerUser(email, password, apodo) {
  return apiRequest("/auth/register", "POST", { email, password, apodo, rol: "usuario" });
}

export async function loginUser(email, password) {
  const data = await apiRequest("/auth/login", "POST", { email, password });
  token = data.token;
  currentUser = data.usuario;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(currentUser));
  return data;
}

export function logoutUser() {
  token = null;
  currentUser = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getToken() {
  if (!token) token = localStorage.getItem("token");
  return token;
}

export function getCurrentUser() {
  if (!currentUser) {
    const saved = localStorage.getItem("user");
    if (saved) currentUser = JSON.parse(saved);
  }
  return currentUser;
}
