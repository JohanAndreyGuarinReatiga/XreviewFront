// js/events/titulosEvents.js
import { obtenerTitulos, crearTitulo } from "../services/titulos.js";

export async function cargarCarrusel() {
  const track = document.getElementById("carouselTrack");
  track.innerHTML = "";

  const titulos = await obtenerTitulos();

  titulos.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("carousel-item");

    div.innerHTML = `
      <div class="item-image">
        <img src="${item.imagenUrl || "/placeholder.svg?height=200&width=300"}" alt="${item.titulo}">
        <div class="item-rank">${index + 1}</div>
      </div>
      <div class="item-content">
        <h3 class="item-title">${item.titulo}</h3>
        <p class="item-description">${item.descripcion}</p>
        <div class="item-stats">
          <span class="stat">⭐ ${item.estadisticas?.promedioCalificacion || 0}</span>
          <span class="stat">❤️ ${item.estadisticas?.meGusta || 0}</span>
          <span class="stat">👎 ${item.estadisticas?.noMeGusta || 0}</span>
          <span class="stat">💬 ${item.estadisticas?.totalResenas || 0}</span>
        </div>
      </div>
    `;

    track.appendChild(div);
  });
}

// --- Inicializar eventos del modal y formulario ---
export function initTituloEvents() {
  const modal = document.getElementById("crearTituloModal");
  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  const form = document.getElementById("crearTituloForm");

  if (!modal || !form) return;

  // Abrir modal
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  // Cerrar modal haciendo click fuera
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Manejar formulario de creación
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form);
      const nuevoTitulo = {};
      formData.forEach((value, key) => {
        nuevoTitulo[key] = value;
      });

      await crearTitulo(nuevoTitulo);

      modal.classList.add("hidden");
      form.reset();
      alert("Título creado correctamente. Espera aprobación para verlo en el carrusel.");
    } catch (error) {
      alert("Error al crear título: " + error.message);
    }
  });
}