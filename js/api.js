const APIService = {
    async makeRequest(url, options = {}) {
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        })
  
        const data = await response.json()
  
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }
  
        return data
      } catch (error) {
        console.error("API Request Error:", error)
        throw error
      }
    },
  
    async makeAuthenticatedRequest(url, options = {}) {
      const AuthService = {
        // Declare AuthService here or import it
        getToken: () => "your_token_here", // Example implementation
      }
      const token = AuthService.getToken()
      if (!token) {
        throw new Error("No authentication token found")
      }
  
      return this.makeRequest(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      })
    },
  }
  