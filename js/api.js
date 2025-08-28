const API_BASE = "http://localhost:5500/v1";

export async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ mensaje: "Error desconocido" }));
    throw new Error(error.mensaje || "Error en la petición");
  }

  return response.json();
}
