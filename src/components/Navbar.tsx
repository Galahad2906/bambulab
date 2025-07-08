import logo from '../assets/logo-blanco.png'

const Navbar = () => {
  return (
    <nav
      className="bg-bambu flex items-center justify-between px-6 py-4 shadow-md"
      aria-label="Navegación principal"
      data-aos="fade-down"
    >
      <img src={logo} alt="Bambulab logo" className="h-10" />
      <ul className="flex flex-wrap gap-4 sm:gap-6 text-white font-semibold">
        <li><a href="#inicio" className="hover:underline">Inicio</a></li>
        <li><a href="#productos" className="hover:underline">Productos</a></li>
        <li><a href="#servicios" className="hover:underline">Servicios</a></li>
        <li><a href="#contacto" className="hover:underline">Contacto</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
