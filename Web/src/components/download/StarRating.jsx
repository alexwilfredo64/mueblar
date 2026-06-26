import { Star, StarHalf } from '../ui/icons'

/*
  Fila de estrellas en tono cobre.
  `value` admite medias estrellas (ej. 4.5). `size` controla el tamaño.
*/

export default function StarRating({ value = 5, size = 'h-4 w-4', className = '' }) {
  const full = Math.floor(value)
  const hasHalf = value - full >= 0.5
  return (
    <div className={`inline-flex items-center gap-1 text-copper ${className}`} aria-label={`${value} de 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className={size} />
      ))}
      {hasHalf && <StarHalf className={size} />}
    </div>
  )
}
