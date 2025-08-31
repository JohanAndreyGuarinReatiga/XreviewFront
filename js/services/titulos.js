import { apiRequest } from "../api/api.js";
import { getToken } from "./auth.js";

// Buscar por título exacto
export function buscarTitulo(titulo) {
  return apiRequest(`/titulos/buscar/${encodeURIComponent(titulo)}`, "GET", null, getToken());
}

// Listar con filtros dinámicos
export function listarConFiltros(filtros = {}) {
  // Convertir filtros en query string: ?fecha=hoy&categoria=tecnologia
  const query = new URLSearchParams(filtros).toString();
  return apiRequest(`/titulos/filtros${query ? "?" + query : ""}`, "GET", null, getToken());
}

//listar todos los titulos
export async function obtenerTitulos() {
  try {
    const response = await apiRequest("/titulos/listar", "GET", null, getToken());
    return response; // el array que devuelve tu backend
  } catch (error) {
    console.error("Error al obtener títulos:", error);
    return [];
  }
}