import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/logo-blanco.png'

const Footer = () => {
  return (
    <footer className="bg-bambu text-white py-10 px-4 sm:px-6 mt-16" data-aos="fade">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Logo y nombre */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <img src={logo} alt="Bambulab logo" className="h-10" />
          <span className="font-bold text-lg">Bambulab</span>
        </div>

        {/* Menú de navegación */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
          <a href="#inicio" className="hover:underline">Inicio</a>
          <a href="#productos" className="hover:underline">Productos</a>
          <a href="#servicios" className="hover:underline">Servicios</a>
          <a href="#contacto" className="hover:underline">Contacto</a>
        </nav>

        {/* Redes sociales */}
        <div className="flex justify-center md:justify-end gap-4">
          <a
            href="https://wa.me/595986271647"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="hover:text-white/80"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href="https://instagram.com/bambumktlab"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="hover:text-white/80"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Derechos reservados */}
      <p className="text-center text-sm mt-6 text-white/80">
        © {new Date().getFullYear()} Bambulab · Todos los derechos reservados
      </p>
    </footer>
  )
}

export default Footer
