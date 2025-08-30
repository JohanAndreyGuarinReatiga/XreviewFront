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

    document.getElementById("userApodo").textContent = user.apodo;
    document.getElementById("userRol").textContent = user.rol;
    document.getElementById("tokenDisplay").value = token;
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
  