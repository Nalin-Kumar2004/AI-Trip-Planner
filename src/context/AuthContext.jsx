import React, { createContext, useContext, useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

// Create the context
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Google login handler
  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      setLoading(true)
      try {
        const response = await axios.get(
          'https://www.googleapis.com/oauth2/v1/userinfo',
          {
            headers: {
              Authorization: `Bearer ${credentialResponse.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(response.data))
        localStorage.setItem('access_token', credentialResponse.access_token)
        
        // Update context state - this triggers re-render in all components using useAuth()
        setUser(response.data)
        
        setLoading(false)
        return { success: true, user: response.data }
      } catch (error) {
        console.error('Failed to fetch user info:', error)
        setLoading(false)
        return { success: false, error: error.message }
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error)
      setLoading(false)
      return { success: false, error: error }
    },
  })

  // Logout handler
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
