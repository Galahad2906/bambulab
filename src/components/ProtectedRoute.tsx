import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { ReactNode } from 'react'
import Loader from './Loader' // podés eliminar si no querés mostrar nada durante loading

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, loading] = useAuthState(auth)

  if (loading) return <Loader /> // Mostramos loader mientras Firebase verifica sesión

  if (!user) return <Navigate to="/login" replace />

  return <>{children}</>
}

export default ProtectedRoute
