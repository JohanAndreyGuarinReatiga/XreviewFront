export function showMessage(text, type = "success") {
    const msg = document.getElementById("message");
    msg.textContent = text;
    msg.className = `message ${type}`;
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 3000);
  }
  
  export function toggleForms(showRegister = false) {
    document.getElementById("login-form").classList.toggle("active", !showRegister);
    document.getElementById("register-form").classList.toggle("active", showRegister);
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
        dropdownMenu.insertBefore(btn, dropdownMenu.querySelector(".dropdown-separator"));
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
    container.innerHTML = usuarios.map(u => `
      <div class="user-card">
        <p><strong>Apodo:</strong> ${u.apodo}</p>
        <p><strong>Email:</strong> ${u.email}</p>
        <p><strong>Rol:</strong> ${u.rol}</p>
        <button class="edit-user" data-id="${u._id}">✏️ Editar</button>
        <button class="delete-user" data-id="${u._id}">🗑️ Eliminar</button>
      </div>
    `).join("");
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
    container.innerHTML = `<p class="no-results">❌ No se encontraron títulos</p>`;
    return;
  }

  results.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";

    // Si tu backend devuelve una imagen (ej: url de Cloudinary)
    const image = item.imagenUrl 
      ? `<img src="${item.imagenUrl}" alt="${item.titulo}" class="result-image" />`
      : `<div class="result-placeholder">🎬</div>`;

    card.innerHTML = `
      ${image}
      <div class="result-info">
        <h3>${item.titulo}</h3>
        <p><strong>Categoría:</strong> ${item.categoria}</p>
        <p><strong>Tipo:</strong> ${item.tipo}</p>
        <p><strong>Año:</strong> ${item.anio}</p>
      </div>
    `;

    container.appendChild(card);
  });
}
