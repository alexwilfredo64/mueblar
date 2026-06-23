import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../services/authService'
import { validateEmail, validatePassword, validateName } from '../services/validator'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function validate() {
    const newErrors = {}

    const nameError = validateName(name)
    if (nameError) newErrors.name = nameError

    const emailError = validateEmail(email)
    if (emailError) newErrors.email = emailError

    const passwordError = validatePassword(password)
    if (passwordError) newErrors.password = passwordError

    if (!confirm) {
      newErrors.confirm = 'Confirma tu contraseña.'
    } else if (password !== confirm) {
      newErrors.confirm = 'Las contraseñas no coinciden.'
    }

    return newErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors(null)

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    try {
      await registerUser(name, apellido, email, password)
      navigate('/login')
    } catch (err) {
      setErrors(err.message)
    }
  }

  return (
    <main>
      <h1>Crear cuenta</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Nombre</label>
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            autoComplete="name"
          />
          {errors.name && <p role="alert">{errors.name}</p>}
        </div>

        <div>
          <label>Apellido</label>
          <input type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            autoComplete="apellido"
          />
          {errors.apellido && <p role="alert">{errors.apellido}</p>}
        </div>

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
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
          />
          {errors.password && <p role="alert">{errors.password}</p>}
        </div>

        <div>
          <label>Confirmar contraseña</label>
          <input type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
          />
          {errors.confirm && <p role="alert">{errors.confirm}</p>}
        </div>

        <button type="submit">
          Entrar
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  )
}
