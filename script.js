// API Configuration
const API_BASE_URL = "http://localhost:5500/v1/auth"

// DOM Elements
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")
const loginFormDiv = document.getElementById("login-form")
const registerFormDiv = document.getElementById("register-form")
const showRegisterLink = document.getElementById("showRegister")
const showLoginLink = document.getElementById("showLogin")
const messageDiv = document.getElementById("message")
const dashboard = document.getElementById("dashboard")
const authWrapper = document.querySelector(".auth-wrapper")
const logoutBtn = document.getElementById("logoutBtn")
const userApodo = document.getElementById("userApodo")
const userRol = document.getElementById("userRol")
const tokenDisplay = document.getElementById("tokenDisplay")

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  const token = localStorage.getItem("authToken")
  if (token) {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    showDashboard(userData, token)
  }

  // Form switching
  showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault()
    switchToRegister()
  })

  showLoginLink.addEventListener("click", (e) => {
    e.preventDefault()
    switchToLogin()
  })

  // Form submissions
  loginForm.addEventListener("submit", handleLogin)
  registerForm.addEventListener("submit", handleRegister)

  // Logout
  logoutBtn.addEventListener("click", handleLogout)
})

// Form switching functions
function switchToRegister() {
  loginFormDiv.classList.remove("active")
  registerFormDiv.classList.add("active")
  clearMessages()
  clearErrors()
}

function switchToLogin() {
  registerFormDiv.classList.remove("active")
  loginFormDiv.classList.add("active")
  clearMessages()
  clearErrors()
}

// Login handler
async function handleLogin(e) {
  e.preventDefault()

  const formData = new FormData(loginForm)
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  // Clear previous errors
  clearErrors()

  // Client-side validation
  if (!validateLogin(loginData)) {
    return
  }

  const submitBtn = loginForm.querySelector('button[type="submit"]')
  submitBtn.disabled = true
  submitBtn.classList.add("loading")

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    const data = await response.json()

    if (response.ok) {
      // Store token and user data
      localStorage.setItem("authToken", data.token)
      localStorage.setItem("userData", JSON.stringify(data.usuario))

      showMessage("¡Login exitoso! Bienvenido.", "success")

      // Show dashboard after a brief delay
      setTimeout(() => {
        showDashboard(data.usuario, data.token)
      }, 1000)
    } else {
      // Handle server errors
      if (data.errors) {
        displayServerErrors(data.errors, "login")
      } else {
        showMessage(data.error || "Error en el login", "error")
      }
    }
  } catch (error) {
    console.error("Login error:", error)
    showMessage("Error de conexión. Verifica que el servidor esté ejecutándose.", "error")
  } finally {
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
  }
}

// Register handler
async function handleRegister(e) {
  e.preventDefault()

  const formData = new FormData(registerForm)
  const registerData = {
    email: formData.get("email"),
    password: formData.get("password"),
    apodo: formData.get("apodo"),
    rol: formData.get("rol"),
  }

  // Clear previous errors
  clearErrors()

  // Client-side validation
  if (!validateRegister(registerData)) {
    return
  }

  const submitBtn = registerForm.querySelector('button[type="submit"]')
  submitBtn.disabled = true
  submitBtn.classList.add("loading")

  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })

    const data = await response.json()

    if (response.ok) {
      showMessage("¡Registro exitoso! Ahora puedes iniciar sesión.", "success")

      // Switch to login form after successful registration
      setTimeout(() => {
        switchToLogin()
        // Pre-fill email in login form
        document.getElementById("loginEmail").value = registerData.email
      }, 2000)
    } else {
      // Handle server errors
      if (data.errors) {
        displayServerErrors(data.errors, "register")
      } else {
        showMessage(data.error || "Error en el registro", "error")
      }
    }
  } catch (error) {
    console.error("Register error:", error)
    showMessage("Error de conexión. Verifica que el servidor esté ejecutándose.", "error")
  } finally {
    submitBtn.disabled = false
    submitBtn.classList.remove("loading")
  }
}

// Client-side validation
function validateLogin(data) {
  let isValid = true

  if (!data.email || !isValidEmail(data.email)) {
    showFieldError("loginEmailError", "El email no es válido")
    isValid = false
  }

  if (!data.password) {
    showFieldError("loginPasswordError", "La contraseña es obligatoria")
    isValid = false
  }

  return isValid
}

function validateRegister(data) {
  let isValid = true

  if (!data.email || !isValidEmail(data.email)) {
    showFieldError("registerEmailError", "El email no es válido")
    isValid = false
  }

  if (!data.password || data.password.length < 2) {
    showFieldError("registerPasswordError", "La contraseña debe tener al menos 2 caracteres")
    isValid = false
  }

  if (!data.apodo || data.apodo.trim() === "") {
    showFieldError("registerApodoError", "El apodo es obligatorio")
    isValid = false
  }

  return isValid
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Error handling
function showFieldError(fieldId, message) {
  const errorElement = document.getElementById(fieldId)
  const inputElement = errorElement.previousElementSibling

  errorElement.textContent = message
  inputElement.classList.add("error")
}

function displayServerErrors(errors, formType) {
  errors.forEach((error) => {
    const field = error.path || error.param
    const message = error.msg || error.message

    if (field === "email") {
      showFieldError(`${formType}EmailError`, message)
    } else if (field === "password") {
      showFieldError(`${formType}PasswordError`, message)
    } else if (field === "apodo") {
      showFieldError(`${formType}ApodoError`, message)
    }
  })
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message")
  const inputElements = document.querySelectorAll("input.error")

  errorElements.forEach((el) => (el.textContent = ""))
  inputElements.forEach((el) => el.classList.remove("error"))
}

// Message handling
function showMessage(message, type) {
  messageDiv.textContent = message
  messageDiv.className = `message ${type}`
  messageDiv.classList.remove("hidden")

  // Auto-hide success messages
  if (type === "success") {
    setTimeout(() => {
      messageDiv.classList.add("hidden")
    }, 5000)
  }
}

function clearMessages() {
  messageDiv.classList.add("hidden")
  messageDiv.textContent = ""
}

// Dashboard functions
function showDashboard(userData, token) {
  authWrapper.style.display = "none"
  dashboard.classList.remove("hidden")

  // Display user info
  userApodo.textContent = userData.apodo || "Usuario"
  userRol.textContent = userData.rol || "usuario"
  tokenDisplay.value = token

  // Add role-specific styling
  if (userData.rol === "administrador") {
    userRol.style.background = "rgba(255, 193, 7, 0.8)"
  } else {
    userRol.style.background = "rgba(40, 167, 69, 0.8)"
  }
}

function handleLogout() {
  // Clear stored data
  localStorage.removeItem("authToken")
  localStorage.removeItem("userData")

  // Reset UI
  dashboard.classList.add("hidden")
  authWrapper.style.display = "block"

  // Clear forms
  loginForm.reset()
  registerForm.reset()
  clearErrors()
  clearMessages()

  // Switch to login form
  switchToLogin()

  showMessage("Sesión cerrada correctamente", "success")
}

// Utility function to make authenticated requests
function makeAuthenticatedRequest(url, options = {}) {
  const token = localStorage.getItem("authToken")

  if (!token) {
    throw new Error("No authentication token found")
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}

// Export for potential use in other modules
window.KarenFlixAuth = {
  makeAuthenticatedRequest,
  getCurrentUser: () => JSON.parse(localStorage.getItem("userData") || "{}"),
  getToken: () => localStorage.getItem("authToken"),
  isAuthenticated: () => !!localStorage.getItem("authToken"),
}
