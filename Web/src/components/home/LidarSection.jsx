import Figure from '../ui/Figure'

/* Sección a dos columnas: copy sobre LiDAR + imagen del escaneo en el hogar. */

export default function LidarSection() {
  return (
    <section className="bg-bg">
      <div className="grid items-stretch md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 md:px-10 md:py-28 lg:pl-[calc((100vw-1280px)/2+2.5rem)]">
          <div className="max-w-md">
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              Visualiza en tu hogar con{' '}
              <span className="text-copper">LiDAR</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              Nuestra tecnología AR utiliza el sensor LiDAR para mapear tu espacio
              con precisión de grado arquitectónico. Siente la textura, mide el
              volumen y decide con total confianza.
            </p>
          </div>
        </div>

        <Figure
          src="/images/lidar-scan.jpg"
          tone="dark"
          alt="Persona escaneando su sala con un teléfono"
          rounded="rounded-none"
          className="min-h-[360px] md:min-h-[520px]"
        />
      </div>
    </section>
  )
}
