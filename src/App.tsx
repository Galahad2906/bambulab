import Navbar from './components/Navbar'
import Productos from './components/Productos'
import Servicios from './components/Servicios'
import SobreNosotros from './components/SobreNosotros'
import Contacto from './components/Contacto';
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'

function App() {
  return (
    <div className="bg-bambu text-white min-h-screen">
      <Navbar />

      <main
        id="inicio"
        className="bg-bambu text-white py-24 px-6 text-center"
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
      <SobreNosotros />
      <Contacto />
      <Footer />

      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsapp />
    </div>
  )
}

export default App
