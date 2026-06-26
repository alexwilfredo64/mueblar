import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/*
  Layout público compartido: Navbar fijo + contenido (Outlet) + Footer.
  Se usa como ruta contenedora en App.jsx para no repetir nav/footer por página.
*/

export default function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
