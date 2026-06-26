const BASE_URL = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const { skipAuth = false, ...fetchOptions } = options
  const token = !skipAuth ? localStorage.getItem('token') : null

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...fetchOptions.headers
    }
  })

  if (!res.ok) {
    const text = await res.text()
    let message = `Error ${res.status}`
    try {
      const parsed = JSON.parse(text)
      message = parsed?.message ?? parsed?.errors?.[0]?.message ?? message
    } catch {
      message = text || message
    }
    const err = new Error(message)
    err.status = res.status
    throw err
  }

  const text = await res.text()
  if (!text) return null
  try { return JSON.parse(text) } catch { return text }
}

export const getToken = () => localStorage.getItem('token')

export const isAuthenticated = () => !!localStorage.getItem('token')

export const loginUser = async (email, password) => {
  const data = await request('/api/auth/login', {
    skipAuth: true,
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
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ name, lastName, email, password })
  })

export const recoveryEmail = (email) =>
  request('/api/auth/recovery-email', {
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ email })
  })

export const resetPassword = (email, password) =>
  request('/api/auth/reset-password', {
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ email, password })
  })