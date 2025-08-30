import { apiRequest } from "../api/api.js";
import { getToken } from "./auth.js";

export function getProfile() {
  return apiRequest("/usuarios/profile", "GET", null, getToken());
}

export function listarUsuarios() {
  return apiRequest("/usuarios/listar", "GET", null, getToken());
}

export function eliminarUsuario(userId) {
  return apiRequest(`/usuarios/eliminar/${userId}`, "DELETE", null, getToken());
}

export function editarUsuario(userId, data) {
  return apiRequest(`/usuarios/editar/${userId}`, "PUT", data, getToken());
}
