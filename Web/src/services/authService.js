const BASE_URL = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  })

  if (!res.ok) {
    const text = await res.text()
    let message = `Error ${res.status}`
    try { message = JSON.parse(text)?.message ?? message } catch { message = text || message }
    throw new Error(message)
  }

  const text = await res.text()
  if (!text) return null
  try { return JSON.parse(text) } catch { return text }
}

export const getToken = () => localStorage.getItem('token')

export const isAuthenticated = () => !!localStorage.getItem('token')

export const loginUser = async (email, password) => {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  localStorage.setItem('token', data.token)
  return data
}

export const logoutUser = () => {
  localStorage.removeItem('token')
}

export const registerUser = (name, lastName, email, password) =>
  request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, lastName, email, password })
  })

export const recoveryEmail = (email) =>
  request('/api/auth/recovery-email', {
    method: 'POST',
    body: JSON.stringify({ email })
  })

export const resetPassword = (email, password) =>
  request('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })

export const getCurrentUser = () => request('/api/profile')

export const updateProfile = (payload) =>
  request('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(payload)
  })