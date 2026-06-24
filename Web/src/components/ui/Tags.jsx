/*
  Etiquetas tipográficas pequeñas reutilizadas en todo el sitio.
  - Eyebrow: rótulo en mayúsculas con tracking (ej. "RED DE COLABORADORES").
  - Pill: cápsula con borde para categorías (ej. "MUEBLERÍA").
*/

export function Eyebrow({ children, className = '', tone = 'copper' }) {
  const color = tone === 'copper' ? 'text-copper' : 'text-faint'
  return (
    <span
      className={`block text-[11px] font-medium uppercase tracking-[0.25em] ${color} ${className}`}
    >
      {children}
    </span>
  )
}

export function Pill({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted ${className}`}
    >
      {children}
    </span>
  )
}
