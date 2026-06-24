import { useState } from 'react'
import { Link } from 'react-router-dom'
import { recoveryEmail } from '../services/authService'
import { validateEmail } from '../services/validator'
import Field from '../components/ui/Field'
import Button from '../components/ui/Button'
import Figure from '../components/ui/Figure'
import { Eyebrow } from '../components/ui/Tags'
import { ArrowLeft } from '../components/ui/icons'

/* Panel visual izquierdo de la tarjeta (imagen + cita). Estático y reutilizable. */
function AsideArt() {
  return (
    <Figure
      src="/images/forgot-aside.jpg"
      tone="dark"
      alt="Espacio interior en penumbra"
      rounded="rounded-none"
      className="hidden min-h-[460px] md:block"
      overlay={
        <div className="flex h-full flex-col justify-end p-8">
          <Eyebrow className="mb-2">Curaduría del Espacio</Eyebrow>
          <p className="font-display text-2xl text-ink">
            La armonía de lo invisible.
          </p>
        </div>
      }
    />
  )
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const validation = validateEmail(email)
    if (validation) {
      setEmailError(validation)
      return
    }

    setEmailError(null)

    try {
      await recoveryEmail(email)
      setSent(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-28">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl md:grid-cols-2">
        <AsideArt />

        <div className="flex flex-col justify-center p-8 md:p-12">
          {sent ? (
            <>
              <h1 className="font-display text-3xl leading-tight text-ink">
                Correo enviado
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Si el correo <strong className="text-ink-soft">{email}</strong> está
                registrado, recibirás un enlace para restablecer tu contraseña en los
                próximos minutos.
              </p>
              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-copper-light"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl leading-tight text-ink">
                Recuperar
                <br />
                Contraseña
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Ingresa tu correo electrónico para recibir las instrucciones de
                restablecimiento.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-8">
                <Field
                  label="Correo electrónico"
                  type="email"
                  variant="underline"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@ejemplo.com"
                  autoComplete="email"
                  error={emailError}
                />

                {error && (
                  <p role="alert" className="text-sm text-red-400/90">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Enviar Instrucciones
                </Button>
              </form>

              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-copper-light"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
