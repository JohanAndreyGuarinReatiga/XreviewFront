import { registerUser, loginUser, logoutUser, getToken, getCurrentUser, logoutUser as clearAuth } from "../services/auth.js";
import { showMessage, toggleForms, showDashboard, logoutUI } from "../ui/ui.js";
import { getProfile } from "../services/user.js";
import { renderResenias } from "./reviewEvents.js";

export function initAuthEvents() {
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
      renderResenias();
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

  // Autologin
  const token = getToken();
  const user = getCurrentUser();
  if (token && user) {
    showDashboard(user, token);
    renderResenias();
    getProfile().catch(() => {
      clearAuth();
      logoutUI();
    });
  }
}
