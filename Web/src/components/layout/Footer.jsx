import Logo from './Logo'

/*
  Pie de página minimalista presente en todas las vistas públicas.
*/

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-7 md:px-10">
        <Logo size="sm" />
        <p className="text-[11px] uppercase tracking-[0.2em] text-faint">
          © 2026 MueblAR Studio
        </p>
      </div>
    </footer>
  )
}
