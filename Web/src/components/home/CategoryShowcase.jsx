import Figure from '../ui/Figure'

/*
  Bento grid de categorías de la Home.
  Datos y subcomponente definidos a nivel de módulo (sin recrearse por render).
*/

const CATEGORIES = [
  { title: 'Sillas', subtitle: 'Colección Essential', img: '/images/cat-sillas.jpg', tone: 'warm', span: 'md:col-span-2' },
  { title: 'Mesas', subtitle: 'Estructura & Forma', img: '/images/cat-mesas.jpg', tone: 'stone', span: 'md:col-span-1' },
  { title: 'Lámparas', subtitle: 'Esculpir la Luz', img: '/images/cat-lamparas.jpg', tone: 'amber', span: 'md:col-span-1' },
  { title: 'Decoración', subtitle: 'El Detalle Final', img: '/images/cat-decoracion.jpg', tone: 'sage', span: 'md:col-span-2' },
]

function CategoryCard({ title, subtitle, img, tone, span }) {
  return (
    <Figure
      src={img}
      tone={tone}
      alt={title}
      className={`group min-h-[230px] cursor-pointer md:min-h-[260px] ${span}`}
      imgClassName="transition-transform duration-500 group-hover:scale-105"
      overlay={
        <div className="flex h-full flex-col justify-end p-6">
          <h3 className="font-display text-2xl text-ink">{title}</h3>
          <span className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-soft/70">
            {subtitle}
          </span>
        </div>
      }
    />
  )
}

export default function CategoryShowcase() {
  return (
    <section id="categorias" className="bg-bg py-20 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
