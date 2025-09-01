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
  
    document.getElementById("userApodo").textContent = user.apodo;
    document.getElementById("userRol").textContent = user.rol;
    document.getElementById("tokenDisplay").value = token;
  }
  
  export function logoutUI() {
    document.querySelector(".container").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
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
