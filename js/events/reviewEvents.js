import { crearResenia, listarResenias, editarResenia, eliminarResenia, likeResenia, dislikeResenia } from "../services/review.js";
import { showMessage } from "../ui/ui.js";
import { obtenerTitulos } from "../services/titulos.js";

export function initReviewEvents() {
  const btnToggleReviewForm = document.getElementById("toggleReviewForm");
  const reviewsPanel = document.getElementById("reviewsPanel");
  const createReviewForm = document.getElementById("createReviewForm");

  if (btnToggleReviewForm && reviewsPanel) {
    btnToggleReviewForm.addEventListener("click", async () => {
      reviewsPanel.classList.toggle("hidden");
      if (!reviewsPanel.classList.contains("hidden")) {
        await cargarTitulosEnSelect(); // cargar títulos cuando se abre
      }
    });
  }

   // Cerrar haciendo click fuera
   window.addEventListener("click", (e) => {
    if (e.target === reviewsPanel) {
      reviewsPanel.classList.add("hidden");
    }
  });

  // Crear reseña
  createReviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      tituloId: e.target.tituloId.value,
      encabezado: e.target.encabezado.value,
      comentario: e.target.comentario.value,
      calificacion: parseInt(e.target.calificacion.value, 10)
    };
    try {
      await crearResenia(data);
      showMessage("Reseña creada ✅");
      e.target.reset();
      renderResenias();
    } catch (err) {
      showMessage(err.message, "error");
    }
  });
}

// Función auxiliar para llenar el select de títulos
async function cargarTitulosEnSelect() {
  const select = document.getElementById("tituloId");
  if (!select) return;

  try {
    const titulos = await obtenerTitulos();

    select.innerHTML = `<option value="">-- Selecciona un título --</option>`;

    titulos.forEach(t => {
      const option = document.createElement("option");
      option.value = t._id;
      option.textContent = t.titulo;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error cargando títulos:", err);
  }
}


export async function renderResenias() {
  try {
    const respuesta = await listarResenias();
    const lista = respuesta.data;
    const ul = document.getElementById("reseniasLista");
    ul.innerHTML = "";

    if (!Array.isArray(lista) || lista.length === 0) {
      ul.innerHTML = "<li>No hay reseñas registradas</li>";
      return;
    }

    lista.forEach(r => {
      const li = document.createElement("li");
      li.className = "resenia-item";
      li.innerHTML = `
        <h4>${r.encabezado} - ⭐ ${r.calificacion}</h4>
        <p>${r.comentario}</p>
        <small>Autor: ${r.usuario?.apodo || "desconocido"}</small>
        <div class="resenia-actions">
          <button class="btn-secondary like-btn">👍 ${r.meGusta?.length || 0}</button>
          <button class="btn-secondary dislike-btn">👎 ${r.noMeGusta?.length || 0}</button>
          <button class="btn-secondary edit-btn">Editar</button>
          <button class="btn-secondary delete-btn">Eliminar</button>
        </div>
      `;

      // Like
      li.querySelector(".like-btn").addEventListener("click", async () => {
        try {
          await likeResenia(r._id);
          showMessage("Like registrado 👍");
          renderResenias();
        } catch (err) {
          showMessage(err.message, "error");
        }
      });

      // Dislike
      li.querySelector(".dislike-btn").addEventListener("click", async () => {
        try {
          await dislikeResenia(r._id);
          showMessage("Dislike registrado 👎");
          renderResenias();
        } catch (err) {
          showMessage(err.message, "error");
        }
      });

      // Editar
      li.querySelector(".edit-btn").addEventListener("click", async () => {
        const nuevoEncabezado = prompt("Nuevo encabezado", r.encabezado);
        const nuevoComentario = prompt("Nuevo comentario", r.comentario);
        const nuevaCalificacion = parseInt(prompt("Nueva calificación", r.calificacion), 10);
        if (nuevoEncabezado && nuevoComentario && nuevaCalificacion) {
          try {
            await editarResenia(r._id, {
              encabezado: nuevoEncabezado,
              comentario: nuevoComentario,
              calificacion: nuevaCalificacion
            });
            showMessage("Reseña actualizada ✏️");
            renderResenias();
          } catch (err) {
            showMessage(err.message, "error");
          }
        }
      });

      // Eliminar
      li.querySelector(".delete-btn").addEventListener("click", async () => {
        if (confirm("¿Eliminar reseña?")) {
          try {
            await eliminarResenia(r._id);
            showMessage("Reseña eliminada 🗑️");
            renderResenias();
          } catch (err) {
            showMessage(err.message, "error");
          }
        }
      });

      ul.appendChild(li);
    });
  } catch (err) {
    showMessage(err.message, "error");
  }
}
