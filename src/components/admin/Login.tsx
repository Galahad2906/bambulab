import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase' // ✅ Corrección clave
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('⚠️ Completá todos los campos.')
      return
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailValido.test(email)) {
      toast.error('Correo electrónico no válido.')
      return
    }

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('✅ Sesión iniciada')
      navigate('/admin')
    } catch (err) {
      console.error(err)
      toast.error('❌ Credenciales inválidas o error al iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-bambu">
          Login administrador
        </h2>

        <label htmlFor="email" className="sr-only">Correo electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />

        <label htmlFor="password" className="sr-only">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className={`w-full bg-bambu text-white font-semibold py-2 rounded transition-transform ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
          disabled={loading}
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  )
}

export default Login
