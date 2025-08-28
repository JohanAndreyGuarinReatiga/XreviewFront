// Import UIManager or declare it before using
const UIManager = {
    showFieldError: (fieldId, errorMessage) => {
      console.log(`Error in field ${fieldId}: ${errorMessage}`)
    },
  }
  
  // Form validation functions
  const FormValidator = {
    validateLogin(data) {
      let isValid = true
  
      if (!data.email || !this.isValidEmail(data.email)) {
        UIManager.showFieldError("loginEmailError", "El email no es válido")
        isValid = false
      }
  
      if (!data.password) {
        UIManager.showFieldError("loginPasswordError", "La contraseña es obligatoria")
        isValid = false
      }
  
      return isValid
    },
  
    validateRegister(data) {
      let isValid = true
  
      if (!data.email || !this.isValidEmail(data.email)) {
        UIManager.showFieldError("registerEmailError", "El email no es válido")
        isValid = false
      }
  
      if (!data.password || data.password.length < 2) {
        UIManager.showFieldError("registerPasswordError", "La contraseña debe tener al menos 2 caracteres")
        isValid = false
      }
  
      if (!data.apodo || data.apodo.trim() === "") {
        UIManager.showFieldError("registerApodoError", "El apodo es obligatorio")
        isValid = false
      }
  
      return isValid
    },
  
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
  }
  