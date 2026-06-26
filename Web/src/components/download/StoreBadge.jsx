import { PlayStore } from '../ui/icons'

/* Insignia "Descargar en Play Store" (placeholder de la badge oficial). */

export default function StoreBadge({ href = '#' }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 rounded-xl border border-line-strong bg-black px-5 py-2.5 transition-colors hover:border-copper"
    >
      <PlayStore className="h-7 w-7" />
      <span className="text-left leading-none">
        <span className="block text-[9px] uppercase tracking-[0.15em] text-muted">
          Descargar en
        </span>
        <span className="block text-base font-medium text-ink">Play Store</span>
      </span>
    </a>
  )
}
