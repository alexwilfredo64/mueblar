import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../services/validator'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { login } = useAuth()

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
      await login(email, password) // actualiza el estado global (navbar reacciona)
      navigate('/')
    } catch (err) {
      setErrors({ server: err.message })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pb-20 pt-32">
      <div className="w-full max-w-md">
        <h1 className="font-display text-5xl text-ink">Bienvenido</h1>
        <p className="mt-3 text-[15px] text-muted">
          Ingrese sus credenciales para acceder a la galería.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <Field
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            autoComplete="email"
            error={errors.email}
          />

          <Field
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password}
          />

          <Link
            to="/forgot-password"
            className="block text-sm italic text-muted transition-colors hover:text-copper-light"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          {errors.server && (
            <p role="alert" className="text-sm text-red-400/90">
              {errors.server}
            </p>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth>
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-8 border-t border-line pt-6 text-center text-sm text-muted">
          ¿No tienes una cuenta?{' '}
          <Link
            to="/register"
            className="text-copper-light underline underline-offset-4 hover:text-copper"
          >
            Crear una cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
