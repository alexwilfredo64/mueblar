import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import SiteLayout from './components/layout/SiteLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PartnersPage from './pages/PartnersPage'
import DownloadPage from './pages/DownloadPage'
import ProfilePage from './pages/ProfilePage'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Layout público compartido: Navbar + Footer en todas las vistas */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/nosotros" element={<PartnersPage />} />
            <Route path="/descargar" element={<DownloadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
