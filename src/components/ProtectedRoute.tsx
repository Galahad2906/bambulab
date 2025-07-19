// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const [user, loading] = useAuthState(auth)

  if (loading) return null // opcional: podés mostrar un <Loader />

  return user ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
