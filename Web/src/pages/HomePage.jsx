import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate()

    return (
        <div>
        <h1>Home</h1>
        <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        <button onClick={() => navigate('/register')}>Registro</button>
        </div>
    )
}

export default HomePage