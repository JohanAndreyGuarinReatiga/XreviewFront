import { apiRequest } from "../api/api.js";
import { getToken } from "./auth.js";

export async function crearTitulo(data) {
  try {
    return await apiRequest("/titulos/crear", "POST", data, getToken());
  } catch (error) {
    console.error("Error creando título:", error);
    throw error;
  }
}

// Buscar por título exacto
export async function buscarTitulo(titulo) {
  try {
    return await apiRequest(
      `/titulos/buscar/${encodeURIComponent(titulo)}`,
      "GET",
      null,
      getToken()
    );
  } catch (error) {
    console.error("Error buscando título:", error);
    return null;
  }
}

// Listar con filtros dinámicos
export async function listarConFiltros(filtros = {}) {
  try {
    const query = new URLSearchParams(filtros).toString();
    return await apiRequest(
      `/titulos/filtros${query ? "?" + query : ""}`,
      "GET",
      null,
      getToken()
    );
  } catch (error) {
    console.error("Error listando con filtros:", error);
    return [];
  }
}


//listar todos los titulos
export async function obtenerTitulos() {
  try {
    return await apiRequest("/titulos/listar", "GET", null, getToken());
  } catch (error) {
    console.error("Error al obtener títulos:", error);
    return [];
  }
}

// Obtener títulos más gustados
export async function obtenerMasGustados() {
  try {
    return await apiRequest("/titulos/masGustados", "GET", null, getToken());
  } catch (error) {
    console.error("Error al obtener más gustados:", error);
    return [];
  }
}

// Obtener top ranking
export async function obtenerTopRanking() {
  try {
    return await apiRequest("/titulos/top", "GET", null, getToken());
  } catch (error) {
    console.error("Error al obtener top ranking:", error);
    return [];
  }
}