/*
  Contenedor de imagen reutilizable.
  - Si se pasa `src`, muestra la foto real (colocar en /public).
  - Si no, muestra un degradado tonal como PLACEHOLDER aproximando el color
    dominante de la imagen del diseño, para conservar la composición.
  `overlay` permite superponer texto/elementos (con gradiente de legibilidad).
*/

const TONES = {
  warm: 'from-[#3a2415] via-[#5a3a22] to-[#1a120c]',   // sofá / cuero cobre
  dark: 'from-[#1c1a17] via-[#2a2620] to-[#0e0c0a]',   // habitación oscura
  amber: 'from-[#4a3410] via-[#7a5418] to-[#140f06]',  // lámpara cálida
  stone: 'from-[#2a2a28] via-[#3a3a36] to-[#15140f]',  // mesas / piedra
  sage: 'from-[#23231d] via-[#34342a] to-[#121210]',   // decoración
  office: 'from-[#241a10] via-[#3a2a18] to-[#0c0a07]', // oficina socios
}

export default function Figure({
  src,
  alt = '',
  tone = 'dark',
  overlay,
  rounded = 'rounded-2xl',
  className = '',
  imgClassName = '',
}) {
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`h-full w-full bg-gradient-to-br ${TONES[tone]}`}
        />
      )}
      {overlay && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div className="absolute inset-0">{overlay}</div>
        </>
      )}
    </div>
  )
}
