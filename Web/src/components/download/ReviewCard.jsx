import StarRating from './StarRating'

/*
  Tarjeta de reseña reutilizable.
  - `featured`: variante grande con estrellas y cita destacada.
  - Avatar con iniciales (placeholder de la foto de usuario).
*/

export default function ReviewCard({ quote, name, role, initials, rating, featured = false }) {
  return (
    <article
      className={`flex flex-col rounded-2xl border border-line bg-panel/50 p-7 ${
        featured ? 'md:p-9' : ''
      }`}
    >
      {rating != null && <StarRating value={rating} className="mb-5" />}

      <p
        className={`flex-1 text-ink-soft ${
          featured ? 'font-display text-xl leading-relaxed md:text-2xl' : 'text-sm leading-relaxed'
        }`}
      >
        {quote}
      </p>

      <div className="mt-7 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-elevated text-xs font-medium text-copper-light">
          {initials}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-medium text-ink">{name}</span>
          <span className="block text-[10px] uppercase tracking-[0.18em] text-faint">
            {role}
          </span>
        </span>
      </div>
    </article>
  )
}
