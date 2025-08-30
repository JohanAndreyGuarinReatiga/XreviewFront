import { registerUser, loginUser, logoutUser, getToken, getCurrentUser } from "./auth.js";
import { showMessage, toggleForms, showDashboard, logoutUI } from "./ui.js";
import { crearResenia, listarResenias, editarResenia, eliminarResenia, likeResenia, dislikeResenia } from "./review.js";
import { getProfile } from "./user.js";

document.addEventListener("DOMContentLoaded", () => {
  // Switch entre login y registro
  document.getElementById("showRegister").addEventListener("click", () => toggleForms(true));
  document.getElementById("showLogin").addEventListener("click", () => toggleForms(false));

  // Registro
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const apodo = e.target.apodo.value;
    try {
      await registerUser(email, password, apodo);
      showMessage("Usuario registrado con éxito ✅");
      toggleForms(false);
    } catch (err) {
      showMessage(err.message, "error");
    }
  });

  // Login
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const { token, usuario } = await loginUser(email, password);
      showMessage("Login exitoso ✅");
      showDashboard(usuario, token);
    } catch (err) {
      showMessage(err.message, "error");
    }
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    logoutUser();
    logoutUI();
    showMessage("Sesión cerrada ✅");
  });

  // Crear reseña
  const createReviewForm = document.getElementById("createReviewForm");
  createReviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      tituloId: e.target.tituloId.value,
      encabezado: e.target.encabezado.value,
      comentario: e.target.comentario.value,
      calificacion: parseInt(e.target.calificacion.value, 10)
    };
    try {
      
      const res = await crearResenia(data);
      showMessage("Reseña creada ✅");
      e.target.reset();
      renderResenias(); // refrescar lista
    } catch (err) {
      showMessage(err.message, "error");
    }
  });

  // Renderizar reseñas
  async function renderResenias() {
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

  // Autologin si existe token
  const token = getToken();
  const user = getCurrentUser();
  if (token && user) {
    showDashboard(user, token);
    renderResenias();
    getProfile().catch(() => {
      logoutUser();
      logoutUI();
    });
  }


});
