import { getProfile, listarUsuarios, eliminarUsuario, editarUsuario } from "../services/user.js";
import { showProfileUI, showDashboard, showUsersUI } from "../ui/ui.js";

export function initUserEvents() {
  console.log("User events inicializados");

  // --- PERFIL DEL USUARIO ---
  const profileBtn = document.querySelector(".dropdown-item[data-action='profile-section']");
  const backBtn = document.getElementById("backToDashboard");

  if (profileBtn) {
    profileBtn.addEventListener("click", async () => {
      try {
        const res = await getProfile();
        showProfileUI(res.user);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      }
    });
  }
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      showDashboard();
    });
  }

  // --- ADMIN: LISTAR USUARIOS ---
  const manageUsersBtn = document.querySelector(".dropdown-item[data-action='manage-users']");
  if (manageUsersBtn) {
    manageUsersBtn.addEventListener("click", async () => {
      try {
        const usuarios = await listarUsuarios();
        showUsersUI(usuarios); // UI para mostrar listado
      } catch (err) {
        console.error("Error al listar usuarios:", err);
      }
    });
  }

  // --- ADMIN: ELIMINAR / EDITAR USUARIOS ---
  document.addEventListener("click", async (e) => {
    // Eliminar usuario
    if (e.target.classList.contains("delete-user")) {
      const userId = e.target.dataset.id;
      if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        try {
          await eliminarUsuario(userId);
          const usuarios = await listarUsuarios();
          showUsersUI(usuarios); // refresca la lista
        } catch (err) {
          console.error("Error al eliminar usuario:", err);
        }
      }
    }

    // Editar usuario
    if (e.target.classList.contains("edit-user")) {
      const userId = e.target.dataset.id;
      const newApodo = prompt("Nuevo apodo:");
      const newEmail = prompt("Nuevo email:");
      const newRol = prompt("Nuevo rol (usuario / administrador):");
      if (newApodo && newEmail && newRol) {
        try {
          await editarUsuario(userId, {
            apodo: newApodo,
            email: newEmail,
            rol: newRol
          });
          const usuarios = await listarUsuarios();
          showUsersUI(usuarios);
        } catch (err) {
          console.error("Error al editar usuario:", err);
        }
      }
    }
  });
}
