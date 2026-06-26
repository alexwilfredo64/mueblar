import { createContext, useContext, useState, useCallback } from 'react'
import { loginUser, logoutUser, getToken } from '../services/authService'

const AuthContext = createContext(null)

const USER_KEY = 'auth_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (!getToken()) return null
    try {
      const stored = localStorage.getItem(USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const loading = false

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password)
    const userData = { ...data }
    delete userData.token 
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData)
    return userData
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    setUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}