import { Pill } from '../ui/Tags'
import { ArrowUpRight, MapPin } from '../ui/icons'

/* Tarjeta de socio para la cuadrícula de la página Nosotros. */

export default function PartnerCard({ category, name, description, location }) {
  return (
    <article className="group flex min-h-[260px] flex-col p-8 transition-colors hover:bg-panel/40 md:p-10">
      <div className="flex items-start justify-between">
        <Pill>{category}</Pill>
        <ArrowUpRight className="h-5 w-5 text-faint transition-colors group-hover:text-copper-light" />
      </div>

      <h3 className="mt-6 font-display text-2xl text-ink">{name}</h3>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-auto flex items-center gap-2 pt-8 text-[11px] uppercase tracking-[0.18em] text-faint">
        <MapPin className="h-4 w-4" />
        {location}
      </div>
    </article>
  )
}
