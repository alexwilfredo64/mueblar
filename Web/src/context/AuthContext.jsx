import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  getToken
} from '../services/authService'

/*
  Estado global de autenticación (React Context).
  Expone el usuario actual y las acciones login/logout/refresh.
  - Al montar, si hay token en localStorage, hidrata el usuario desde la API.
  - login() guarda el token y carga el perfil.
  - logout() borra el token y limpia el estado.
*/

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Hidratación inicial: si hay token guardado, recupera el perfil
  useEffect(() => {
    let active = true

    async function hydrate() {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const data = await getCurrentUser()
        if (active) setUser(data)
      } catch {
        logoutUser() // token inválido/expirado
      } finally {
        if (active) setLoading(false)
      }
    }

    hydrate()
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    await loginUser(email, password) // guarda el token en localStorage
    const data = await getCurrentUser() // lee el perfil enviando el token
    setUser(data)
    return data
  }, [])

  const logout = useCallback(() => {
    logoutUser() // borra el token de localStorage
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const data = await getCurrentUser()
    setUser(data)
    return data
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
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
