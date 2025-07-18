import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Productos from './components/Productos'
import Servicios from './components/Servicios'
import Testimonios from './components/Testimonios'
import SobreNosotros from './components/SobreNosotros'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import Loader from './components/Loader'

import 'swiper/css'
import 'swiper/css/pagination'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <div className="bg-bambu text-white min-h-screen overflow-x-hidden">
      <Navbar />

      <main
        id="inicio"
        className="bg-bambu text-white py-24 px-4 sm:px-6 text-center"
        data-aos="fade"
      >
        <h1 className="text-4xl md:text-5xl font-black leading-tight">
          Diseñamos artículos únicos<br />para tus momentos inolvidables
        </h1>
        <p className="mt-6 text-lg md:text-xl font-light">
          Personalizados con amor, estilo y creatividad 💚
        </p>
        <a
          href="#productos"
          className="mt-10 inline-block bg-white text-bambu font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Ver catálogo
        </a>
      </main>

      <Productos />
      <Servicios />
      <Testimonios />
      <SobreNosotros />
      <Contacto />
      <Footer />
    </div>
  )
}

export default App
