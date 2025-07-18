import logo from '../assets/logo-blanco.png'

const Navbar = () => {
  return (
    <nav
      className="bg-bambu w-full py-4 px-4 sm:px-6 shadow-md"
      aria-label="Navegación principal"
      data-aos="fade-down"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Bambulab logo" className="h-10" />
        <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-white font-semibold text-sm sm:text-base">
          <li><a href="#inicio" className="hover:underline">Inicio</a></li>
          <li><a href="#productos" className="hover:underline">Productos</a></li>
          <li><a href="#servicios" className="hover:underline">Servicios</a></li>
          <li><a href="#contacto" className="hover:underline">Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
