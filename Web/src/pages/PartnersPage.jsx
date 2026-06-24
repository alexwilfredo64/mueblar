import Figure from '../components/ui/Figure'
import Button from '../components/ui/Button'
import { Eyebrow } from '../components/ui/Tags'
import PartnerCard from '../components/partners/PartnerCard'

/* Datos de socios a nivel de módulo (no se recrean en cada render). */
const PARTNERS = [
  {
    category: 'Ferretería',
    name: 'Ferretería El Record',
    description:
      'Líderes en suministros industriales y soluciones para el hogar. Tradición y excelencia técnica en cada proyecto constructivo.',
    location: 'San Pedro Sula, Honduras',
  },
  {
    category: 'Mueblería',
    name: 'Muebles Elements',
    description:
      'Diseño contemporáneo que redefine los espacios modernos. Piezas exclusivas que fusionan estética y funcionalidad ergonómica.',
    location: 'Tegucigalpa, Honduras',
  },
  {
    category: 'Decoración',
    name: 'Larach & Cía',
    description:
      'El referente nacional en ferretería y hogar. Calidad garantizada y una gama inigualable de productos para transformar tus ambientes.',
    location: 'Multiplaza, Honduras',
  },
  {
    category: 'Mueblería',
    name: 'Amueblar',
    description:
      'Personalización y confort. Especialistas en crear muebles que cuentan historias y se adaptan a la personalidad de cada usuario.',
    location: 'Colonia Palmira, Honduras',
  },
]

function PartnersHero() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-36 md:px-10">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <Eyebrow>Red de Colaboradores</Eyebrow>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
            Nuestros Socios
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            Conectamos con los proveedores líderes en Honduras para ofrecerte una
            experiencia de visualización en AR sin precedentes. Calidad artesanal y
            tecnología de vanguardia.
          </p>
        </div>
        <Figure
          src="/images/partners-showroom.jpg"
          tone="office"
          alt="Showroom de mobiliario de un socio"
          className="min-h-[260px] md:min-h-[320px]"
        />
      </div>
    </section>
  )
}

function PartnersGrid() {
  return (
    <section className="mx-auto mt-16 max-w-[1280px] px-6 md:px-10">
      {/* gap-px sobre fondo de línea: genera separadores limpios de 1px en la cuadrícula */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {PARTNERS.map((p) => (
          <div key={p.name} className="bg-bg">
            <PartnerCard {...p} />
          </div>
        ))}
      </div>
    </section>
  )
}

function PartnersCta() {
  return (
    <section className="mt-24">
      <div className="mx-auto max-w-[1280px] px-6 py-20 text-center md:px-10 md:py-28">
        <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-ink md:text-5xl">
          Impulsa tu marca con la{' '}
          <span className="underline decoration-copper decoration-2 underline-offset-8">
            Realidad Aumentada.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
          Únete a la plataforma que está transformando cómo los hondureños compran
          muebles. Muestra tus productos en el espacio real de tus clientes.
        </p>
        <Button variant="copper" size="lg" className="mt-10" to="/register">
          Convertirse en Socio
        </Button>
      </div>
      <Figure
        src="/images/partners-cta.jpg"
        tone="stone"
        alt="Silla de diseño en un estudio"
        rounded="rounded-none"
        className="min-h-[320px]"
      />
    </section>
  )
}

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnersGrid />
      <PartnersCta />
    </>
  )
}
