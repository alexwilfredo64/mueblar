import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/authService'
import { validateEmail} from '../services/validator'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validate() {
    const newErrors = {}
    const emailError = validateEmail(email)
    if (emailError) newErrors.email = emailError
    if (!password) newErrors.password = 'La contraseña es obligatoria.'
    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    try {
      await loginUser(email, password)
      navigate('/')
    } catch (err) {
      setErrors({ server: err.message })
    }
  }

  return (
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Correo electrónico</label>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            autoComplete="email"
          />
          {errors.email && <p role="alert">{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          {errors.password && <p role="alert">{errors.password}</p>}
        </div>

        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>

        {errors.server && <p role="alert">{errors.server}</p>}

        <button type="submit">Entrar</button>
      </form>

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </main>
  )
}
