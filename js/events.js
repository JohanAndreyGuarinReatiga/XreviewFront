const EventHandlers = {
    async handleLogin(e) {
      e.preventDefault()
  
      const formData = new FormData(window.DOM.loginForm)
      const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
      }
  
      window.UIManager.clearErrors()
  
      if (!window.FormValidator.validateLogin(loginData)) {
        return
      }
  
      const submitBtn = window.DOM.loginForm.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.classList.add("loading")
  
      try {
        const data = await window.AuthService.login(loginData)
  
        if (data.token) {
          window.AuthService.saveUserSession(data.token, data.usuario)
          window.UIManager.showMessage("¡Login exitoso! Bienvenido.", "success")
  
          setTimeout(() => {
            window.UIManager.showDashboard(data.usuario, data.token)
          }, 1000)
        } else {
          if (data.errors) {
            this.displayServerErrors(data.errors, "login")
          } else {
            window.UIManager.showMessage(data.error || "Error en el login", "error")
          }
        }
      } catch (error) {
        console.error("Login error:", error)
        window.UIManager.showMessage("Error de conexión. Verifica que el servidor esté ejecutándose.", "error")
      } finally {
        submitBtn.disabled = false
        submitBtn.classList.remove("loading")
      }
    },
  
    async handleRegister(e) {
      e.preventDefault()
  
      const formData = new FormData(window.DOM.registerForm)
      const registerData = {
        email: formData.get("email"),
        password: formData.get("password"),
        apodo: formData.get("apodo"),
        rol: formData.get("rol"),
      }
  
      window.UIManager.clearErrors()
  
      if (!window.FormValidator.validateRegister(registerData)) {
        return
      }
  
      const submitBtn = window.DOM.registerForm.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.classList.add("loading")
  
      try {
        const data = await window.AuthService.register(registerData)
  
        if (data.mensaje || !data.error) {
          window.UIManager.showMessage("¡Registro exitoso! Ahora puedes iniciar sesión.", "success")
  
          setTimeout(() => {
            window.UIManager.switchToLogin()
            document.getElementById("loginEmail").value = registerData.email
          }, 2000)
        } else {
          if (data.errors) {
            this.displayServerErrors(data.errors, "register")
          } else {
            window.UIManager.showMessage(data.error || "Error en el registro", "error")
          }
        }
      } catch (error) {
        console.error("Register error:", error)
        window.UIManager.showMessage("Error de conexión. Verifica que el servidor esté ejecutándose.", "error")
      } finally {
        submitBtn.disabled = false
        submitBtn.classList.remove("loading")
      }
    },
  
    handleLogout() {
      window.AuthService.logout()
  
      window.DOM.dashboard.classList.add("hidden")
      window.DOM.authWrapper.style.display = "block"
  
      window.DOM.loginForm.reset()
      window.DOM.registerForm.reset()
      window.UIManager.clearErrors()
      window.UIManager.clearMessages()
  
      window.UIManager.switchToLogin()
      window.UIManager.showMessage("Sesión cerrada correctamente", "success")
    },
  
    async handleEditProfile(e) {
      e.preventDefault()
  
      const formData = new FormData(window.DOM.editProfileForm)
      await window.ProfileManager.saveProfile(formData)
    },
  
    displayServerErrors(errors, formType) {
      errors.forEach((error) => {
        const field = error.path || error.param
        const message = error.msg || error.message
  
        if (field === "email") {
          window.UIManager.showFieldError(`${formType}EmailError`, message)
        } else if (field === "password") {
          window.UIManager.showFieldError(`${formType}PasswordError`, message)
        } else if (field === "apodo") {
          window.UIManager.showFieldError(`${formType}ApodoError`, message)
        }
      })
    },
  }

  