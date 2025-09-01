// js/events/titulosEvents.js
import { obtenerTitulos, crearTitulo, aprobarTitulo } from "../services/titulos.js";
import { showMessage } from "../ui/ui.js";

export async function cargarCarrusel() {
  const track = document.getElementById("carouselTrack");
  track.innerHTML = "";

  const titulos =(await obtenerTitulos()).filter(t => t.aprobado);

  titulos.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("carousel-item");

    div.innerHTML = `
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

export function initApprovalEvents() {
  const btnToggleApproval = document.getElementById("toggleApprovalPanel");
  const approvalPanel = document.getElementById("approvalPanel");
  const closeApprovalPanel = document.getElementById("closeApprovalPanel");
  const approvalList = document.getElementById("approvalList");

  if (!btnToggleApproval || !approvalPanel) return;

  // Abrir el panel
  btnToggleApproval.addEventListener("click", async () => {
    approvalPanel.classList.remove("hidden");
    renderApprovalList();
  });

  // Cerrar
  closeApprovalPanel.addEventListener("click", () => {
    approvalPanel.classList.add("hidden");
  });

  // Renderizar lista
  async function renderApprovalList() {
    try {
      const response = await obtenerTitulos();
      const titulos = response || [];

      approvalList.innerHTML = "";

      if (titulos.length === 0) {
        approvalList.innerHTML = "<li>No hay títulos registrados</li>";
        return;
      }

      titulos.forEach(t => {
        const li = document.createElement("li");
        li.className = "approval-item";
        li.innerHTML = `
          <strong>${t.titulo}</strong> (${t.tipo} - ${t.categoria})
          <span class="status">Estado: ${t.aprobado ? "✅ Aprobado" : "⏳ Pendiente"}</span>
          ${!t.aprobado ? `<button class="btn-primary approve-btn">Aprobar</button>` : ""}
        `;

        // Evento aprobar
        if (!t.aprobado) {
          li.querySelector(".approve-btn").addEventListener("click", async () => {
            try {
              await aprobarTitulo(t._id);
              showMessage(`Título "${t.titulo}" aprobado ✅`);
              renderApprovalList();
            } catch (err) {
              showMessage(err.message, "error");
            }
          });
        }

        approvalList.appendChild(li);
      });
    } catch (err) {
      showMessage(err.message, "error");
    }
  }
}