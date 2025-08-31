// js/events/titulosEvents.js
import { obtenerTitulos } from "../services/titulos.js";

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
