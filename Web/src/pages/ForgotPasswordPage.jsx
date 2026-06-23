import { useState } from 'react'
import { Link } from 'react-router-dom'
import { passwordReset } from '../services/authService'
import { validateEmail } from '../services/validator'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [error, setError] = useState(null)
    const [sent, setSent] = useState(false)

    async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const error = validateEmail(email)
        if (error) {
            setEmailError(error)
            return
        }

    setEmailError(null)
    
    try {
        await passwordReset(email)
        setSent(true)
    } catch (err) {
        setError(err.message)
    } 
    }

    if (sent) {
        return (
        <main>
            <h1>Correo enviado</h1>
            <p>
            Si el correo <strong>{email}</strong> está registrado, recibirás
            un enlace para restablecer tu contraseña en los próximos minutos.
            </p>
            <p>
            <Link to="/login">Volver al inicio de sesión</Link>
            </p>
        </main>
        )
    }

return (
    <main>
        <h1>Recuperar contraseña</h1>
        <p>Ingresa tu correo electrónico para recibir las instrucciones de restablecimiento.</p>

        <form onSubmit={handleSubmit} noValidate>
        <div>
            <label>Correo electrónico</label>
            <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@ejemplo.com"
            autoComplete="email"
            />
            {emailError && <p role="alert">{emailError}</p>}
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit">
            Enviar
        </button>
        </form>

        <p>
        <Link to="/login">Volver al inicio de sesión</Link>
        </p>
    </main>
    )
}
