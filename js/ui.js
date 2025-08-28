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
    document.querySelector(".auth-wrapper").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  
    document.getElementById("userApodo").textContent = user.apodo;
    document.getElementById("userRol").textContent = user.rol;
    document.getElementById("tokenDisplay").value = token;
  }
  
  export function logoutUI() {
    document.querySelector(".auth-wrapper").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
  }
  