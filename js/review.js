// js/review.js
import { apiRequest } from "./api.js";
import { getToken } from "./auth.js";

export function crearResenia(data) {
  return apiRequest("/resenias/post", "POST", data, getToken());
}

export function listarResenias() {
  return apiRequest("/resenias/", "GET", null, getToken());
}

export function editarResenia(id, data) {
  return apiRequest(`/resenias/editar/${id}`, "PUT", data, getToken());
}

export function eliminarResenia(id) {
  return apiRequest(`/resenias/eliminar/${id}`, "DELETE", null, getToken());
}

export function likeResenia(id) {
  return apiRequest(`/resenias/like/${id}`, "POST", null, getToken());
}

export function dislikeResenia(id) {
  return apiRequest(`/resenias/dislike/${id}`, "POST", null, getToken());
}
