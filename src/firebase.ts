// src/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  browserLocalPersistence,
  setPersistence,
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// 🔐 Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAjQb4BLoEDm1kMbTev0Ar3jxZwOBIWGQQ',
  authDomain: 'bambulab-b076d.firebaseapp.com',
  projectId: 'bambulab-b076d',
  storageBucket: 'bambulab-b076d.appspot.com',
  messagingSenderId: '846411272044',
  appId: '1:846411272044:web:37420103ce62a87fad6d49',
}

// 🔥 Inicializar Firebase
const app = initializeApp(firebaseConfig)

// 📦 Exportar servicios
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app) // Nuevo export para Firebase Storage

// 💾 Persistencia local de sesión
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log('✅ Persistencia de sesión activada'))
  .catch((error) =>
    console.error('❌ Error al establecer la persistencia:', error)
  )
