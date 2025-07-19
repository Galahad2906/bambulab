import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-bambu p-4">
      <h1 className="text-3xl font-bold mb-6">Panel de Administrador</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default AdminPanel
