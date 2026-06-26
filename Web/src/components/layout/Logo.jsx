import { Link } from 'react-router-dom'

/*
  Marca textual "MueblAR".
  NOTA: el logotipo del diseño usa una tipografía geométrica personalizada.
  Aquí se aproxima con texto estilizado a modo de placeholder; reemplazar por
  el SVG/fuente real cuando esté disponible (ver notas de assets).
*/

export default function Logo({ className = '', size = 'md' }) {
  const sizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl' }
  return (
    <Link
      to="/"
      className={`font-semibold tracking-[0.02em] text-ink ${sizes[size]} ${className}`}
      aria-label="MueblAR — inicio"
    >
      Muebl<span className="text-copper-light">AR</span>
    </Link>
  )
}
