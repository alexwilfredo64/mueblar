import Figure from '../components/ui/Figure'
import { Eyebrow } from '../components/ui/Tags'
import StoreBadge from '../components/download/StoreBadge'
import StarRating from '../components/download/StarRating'
import ReviewCard from '../components/download/ReviewCard'

const REVIEWS = [
  {
    featured: true,
    rating: 5,
    quote:
      '"La fidelidad de las texturas en AR es increíble. Pude ver exactamente cómo quedaba el terciopelo de la silla \'Eames\' con la luz de mi sala."',
    name: 'Valentina Rossi',
    role: 'Interiorista Senior',
    initials: 'VR',
  },
  {
    quote:
      '"Finalmente una app que entiende que el diseño no es solo vender, es curar espacios. Minimalista y potente."',
    name: 'Julian Dominguez',
    role: 'Arquitecto',
    initials: 'JD',
  },
]

const SPECS = [
  {
    label: 'Versión Actual',
    value: '4.2.1',
    tag: 'Stable',
    note: 'Optimizada para Metal 3 y renderizado fotorrealista en tiempo real.',
  },
  {
    label: 'Tamaño',
    value: '624.5 MB',
    note: 'Incluye catálogo base con más de 1,200 modelos 3D en alta fidelidad.',
  },
  {
    label: 'Compatibilidad',
    value: 'Android 7.0',
    note: 'Requiere dispositivo con Android 7.0 para poder tener una experiencia AR premium.',
  },
]

/* Maqueta de teléfono (placeholder de la captura real de la app). */
function PhoneMockup() {
  return (
    <div className="mx-auto w-[260px] rounded-[2.5rem] border-[6px] border-elevated bg-black p-2 shadow-2xl">
      <Figure
        src="/images/app-screenshot.jpg"
        tone="warm"
        alt="Captura de la app MueblAR mostrando una silla en AR"
        rounded="rounded-[2rem]"
        className="min-h-[480px]"
      />
    </div>
  )
}

function DownloadHero() {
  return (
    <section className="px-6 pt-36 text-center md:px-10">
      <h1 className="mx-auto max-w-3xl font-display text-5xl leading-[1.1] text-ink md:text-6xl">
        MueblAR: <span className="italic text-copper-gradient">Redefiniendo</span> el
        Espacio
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
        Lleva la realidad aumentada a tu hogar con la colección más exclusiva de
        muebles y decoración. Visualiza cada detalle antes de decidir.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        <StoreBadge />
        <div className="flex items-center gap-2">
          <StarRating value={4.5} size="h-3.5 w-3.5" />
          <span className="text-[11px] uppercase tracking-[0.15em] text-faint">
            4.9 · 3K reseñas de usuarios
          </span>
        </div>
      </div>

      <div className="mt-16">
        <PhoneMockup />
      </div>
    </section>
  )
}

function ReviewsSection() {
  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-6 md:px-10">
      <h2 className="font-display text-4xl text-ink md:text-5xl">
        Experiencias que <span className="italic text-copper-gradient">habitan</span>.
      </h2>
      <p className="mt-3 text-sm text-muted">
        Lo que dicen nuestros usuarios sobre la precisión y estética de MueblAR.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <ReviewCard {...REVIEWS[0]} />
        </div>
        <ReviewCard {...REVIEWS[1]} />
      </div>
    </section>
  )
}

function TechSpecs() {
  return (
    <section className="mx-auto mt-24 max-w-[1280px] px-6 pb-24 md:px-10">
      <div className="grid gap-10 border-t border-line pt-12 md:grid-cols-4">
        <div>
          <Eyebrow tone="muted">Especificaciones</Eyebrow>
          <h3 className="mt-3 font-display text-3xl leading-tight text-ink">
            Información
            <br />
            Técnica
          </h3>
        </div>

        {SPECS.map((spec) => (
          <div key={spec.label}>
            <span className="text-[11px] uppercase tracking-[0.2em] text-faint">
              {spec.label}
            </span>
            <p className="mt-3 text-2xl text-ink">
              {spec.value}
              {spec.tag && (
                <span className="ml-2 text-sm text-muted">({spec.tag})</span>
              )}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{spec.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function DownloadPage() {
  return (
    <>
      <DownloadHero />
      <ReviewsSection />
      <TechSpecs />
    </>
  )
}
