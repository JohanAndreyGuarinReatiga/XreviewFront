// Import necessary modules
import AuthService from "./AuthService"
import UIManager from "./UIManager"
import DOM from "./DOM"
import EventHandlers from "./EventHandlers"
import ProfileManager from "./ProfileManager"
import UserService from "./UserService"
import FormValidator from "./FormValidator"
import APIService from "./APIService"

// Main initialization and event binding
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  if (AuthService.isAuthenticated()) {
    const userData = AuthService.getUserData()
    const token = AuthService.getToken()
    UIManager.showDashboard(userData, token)
  }

  // Form switching
  DOM.showRegisterLink.addEventListener("click", (e) => {
    e.preventDefault()
    UIManager.switchToRegister()
  })

  DOM.showLoginLink.addEventListener("click", (e) => {
    e.preventDefault()
    UIManager.switchToLogin()
  })

  // Form submissions
  DOM.loginForm.addEventListener("submit", EventHandlers.handleLogin)
  DOM.registerForm.addEventListener("submit", EventHandlers.handleRegister)

  // Dashboard navigation
  DOM.profileTab.addEventListener("click", () => UIManager.switchTab("profile"))
  DOM.usersTab.addEventListener("click", () => UIManager.switchTab("users"))

  // Profile management
  DOM.editProfileBtn.addEventListener("click", () => ProfileManager.openEditModal())
  DOM.editProfileForm.addEventListener("submit", EventHandlers.handleEditProfile)
  DOM.closeEditModal.addEventListener("click", () => ProfileManager.closeEditModal())
  DOM.cancelEditBtn.addEventListener("click", () => ProfileManager.closeEditModal())

  // Logout
  DOM.logoutBtn.addEventListener("click", EventHandlers.handleLogout)

  // Close modal when clicking outside
  DOM.editProfileModal.addEventListener("click", (e) => {
    if (e.target === DOM.editProfileModal) {
      ProfileManager.closeEditModal()
    }
  })
})

// Global API for external access
window.KarenFlixAuth = {
  AuthService,
  UserService,
  UIManager,
  ProfileManager,
  FormValidator,
  APIService,
}
