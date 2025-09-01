export function showMessage(text, type = "success") {
  const msg = document.getElementById("message");
  msg.textContent = text;
  msg.className = `message ${type}`;
  msg.classList.remove("hidden");
  setTimeout(() => msg.classList.add("hidden"), 3000);
}

export function toggleForms(showRegister = false) {
  document
    .getElementById("login-form")
    .classList.toggle("active", !showRegister);
  document
    .getElementById("register-form")
    .classList.toggle("active", showRegister);
}

export function showDashboard(user, token) {
  document.querySelector(".container").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("profileSection").classList.add("hidden");
  document.getElementById("userManagement").classList.add("hidden");

  document.getElementById("userApodo").textContent = user.apodo;
  document.getElementById("userRol").textContent = user.rol;
  document.getElementById("tokenDisplay").value = token;

  // Mostrar menú "Gestión de usuarios" solo si el rol es admin
  const dropdownMenu = document.getElementById("dropdownMenu");
  if (user.rol === "administrador") {
    if (!dropdownMenu.querySelector("[data-action='manage-users']")) {
      const btn = document.createElement("button");
      btn.className = "dropdown-item";
      btn.dataset.action = "manage-users";
      btn.textContent = "👥 Gestión de usuarios";
      dropdownMenu.insertBefore(
        btn,
        dropdownMenu.querySelector(".dropdown-separator")
      );
    }
  }
}

export function logoutUI() {
  document.querySelector(".container").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}
export function showProfileUI(user) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("profileSection").classList.remove("hidden");

  // rellenar datos de perfil
  document.getElementById("profileApodo").textContent = user.apodo;
  document.getElementById("profileEmail").textContent = user.email;
  document.getElementById("profileRol").textContent = user.rol;
}

export function showUsersUI(usuarios) {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("profileSection").classList.add("hidden");
  document.getElementById("userManagement").classList.remove("hidden");

  const container = document.getElementById("userList");
  container.innerHTML = usuarios
    .map(
      (u) => `
      <div class="user-card">
        <p><strong>Apodo:</strong> ${u.apodo}</p>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Rol:</strong> ${u.rol}</p>
        <button class="edit-user" data-id="${u._id}">✏️ Editar</button>
        <button class="delete-user" data-id="${u._id}">🗑️ Eliminar</button>
      </div>
    `
    )
    .join("");
}

export function mostrarModal(modal) {
  modal.classList.remove("hidden");
}

export function ocultarModal(modal) {
  modal.classList.add("hidden");
}

export function renderResults(results, container) {
  if (!container) return;
  container.innerHTML = "";

  if (!results || results.length === 0) {
    container.innerHTML = "<p>No se encontraron resultados</p>";
    return;
  }

  results.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("result-item");

    card.innerHTML = `
    <div class="card">
  <div class="card-header">
    <h3 class="card-title">${item.titulo}</h3>
    <p class="card-description">${item.descripcion || "Sin descripción"}</p>
  </div>

  <p class="card-meta">
    <strong>Categoría:</strong> ${item.categoria || "N/A"} |
    <strong>Tipo:</strong> ${item.tipo || "N/A"} |
    <strong>Año:</strong> ${item.anio || "N/A"}
  </p>

  <div class="card-stats">
    <span class="stat">⭐ ${item.estadisticas?.promedioCalificacion || 0}</span>
    <span class="stat">❤️ ${item.estadisticas?.meGusta || 0}</span>
    <span class="stat">👎 ${item.estadisticas?.noMeGusta || 0}</span>
    <span class="stat">💬 ${item.estadisticas?.totalResenas || 0}</span>
  </div>
</div>
    `;

    container.appendChild(card);
  });
}
