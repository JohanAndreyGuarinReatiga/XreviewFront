// Configuration and DOM elements
const API_CONFIG = {
    BASE_URL: "http://localhost:5500/v1",
    ENDPOINTS: {
      AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
      }
    },
  }
  
  const DOM = {
    // Auth elements
    loginForm: document.getElementById("loginForm"),
    registerForm: document.getElementById("registerForm"),
    loginFormDiv: document.getElementById("login-form"),
    registerFormDiv: document.getElementById("register-form"),
    showRegisterLink: document.getElementById("showRegister"),
    showLoginLink: document.getElementById("showLogin"),
    messageDiv: document.getElementById("message"),
    authWrapper: document.querySelector(".auth-wrapper"),
  
    // Dashboard elements
    dashboard: document.getElementById("dashboard"),
    logoutBtn: document.getElementById("logoutBtn"),
    userApodo: document.getElementById("userApodo"),
    userRol: document.getElementById("userRol"),
    tokenDisplay: document.getElementById("tokenDisplay"),
  
  }
  