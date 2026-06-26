import { Link } from 'react-router-dom'

/*
  Botón reutilizable con variantes que replican las píldoras del diseño.
  - Si recibe `to`, se renderiza como <Link> (navegación interna).
  - Si recibe `href`, como <a>. En otro caso, como <button>.
  Definido a nivel de módulo para evitar re-renders innecesarios.
*/

const VARIANTS = {
  // Píldora cobre con degradado + glow (CTA principal de formularios)
  primary:
    'bg-copper-gradient text-white shadow-[0_10px_30px_-8px_rgba(192,122,74,0.55)] hover:brightness-110',
  // Naranja sólido brillante (Registrarse)
  orange:
    'bg-orange text-[#241405] font-semibold hover:brightness-105',
  // Cobre sólido apagado (Iniciar Sesión / Descargar en nav, Convertirse en socio)
  copper:
    'bg-copper/85 text-white hover:bg-copper',
  // Contorno sutil sobre fondo oscuro
  outline:
    'border border-line-strong text-ink hover:border-copper hover:text-copper-light',
  // Sólo texto
  ghost:
    'text-ink-soft hover:text-ink',
}

const SIZES = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-medium',
    'tracking-wide transition-all duration-200 cursor-pointer select-none',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-copper/60',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
