import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../services/authService'
import { validatePassword } from '../services/validator'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('email')

    function validate() {
        const newErrors = {}
        const passwordError = validatePassword(password)
        if (passwordError) newErrors.password = passwordError
        if (!confirm) newErrors.confirm = 'Confirma tu contraseña.'
        else if (password !== confirm) newErrors.confirm = 'Las contraseñas no coinciden.'
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
        await resetPassword(email, password)
        navigate('/login')
        } catch (err) {
        setErrors({ server: err.message })
        }
    }

    // Si no hay email en la URL, el enlace es inválido
    if (!email) {
        return (
        <main>
            <h1>Enlace inválido</h1>
            <p>El enlace de recuperación no es válido o ha expirado.</p>
        </main>
        )
    }

    return (
        <main>
        <h1>Nueva contraseña</h1>
        <p>Ingresa tu nueva contraseña para <strong>{email}</strong>.</p>

        <form onSubmit={handleSubmit} noValidate>
            <div>
            <label>Nueva contraseña</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
            />
            {errors.password && <p role="alert">{errors.password}</p>}
            </div>

            <div>
            <label>Confirmar contraseña</label>
            <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
            />
            {errors.confirm && <p role="alert">{errors.confirm}</p>}
            </div>

            {errors.server && <p role="alert">{errors.server}</p>}

            <button type="submit">Cambiar contraseña</button>
        </form>
        </main>
    )
}