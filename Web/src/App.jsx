import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import SiteLayout from './components/layout/SiteLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import PartnersPage from './pages/PartnersPage'
import DownloadPage from './pages/DownloadPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Navigate to="/view/main-view" replace />} />
            <Route path="/view/main-view" element={<HomePage />} />
            <Route path="/view/about-us" element={<PartnersPage />} />
            <Route path="/view/download" element={<DownloadPage />} />
            <Route path="/view/sign-up" element={<RegisterPage />} />
            <Route path="/view/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/view/reset-password/:token/:id" element={<ResetPasswordPage />} />
            <Route path="/view/client-profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App