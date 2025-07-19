import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/admin') // redirige al panel si el login fue exitoso
    } catch (err: any) {
      setError('Credenciales inválidas o error al iniciar sesión.')
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-bambu">Login administrador</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-bambu text-white font-semibold py-2 rounded hover:scale-105 transition-transform"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
