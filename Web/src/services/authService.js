const BASE_URL = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.message || `Error ${res.status}`)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

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

export const isAuthenticated = () => !!localStorage.getItem('token')

export const registerUser = (name, apellido, email, password) =>
  request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, apellido, email, password })
  })

export const passwordReset = (email) =>
  request('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
