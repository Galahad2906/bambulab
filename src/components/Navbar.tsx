import logo from '../assets/logo-blanco.png'

const enlaces = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#productos', texto: 'Productos' },
  { href: '#servicios', texto: 'Servicios' },
  { href: '#contacto', texto: 'Contacto' }
]

const Navbar = () => {
  return (
    <nav
      className="bg-bambu w-full py-4 px-4 sm:px-6 shadow-md"
      role="navigation"
      aria-label="Navegación principal"
      data-aos="fade-down"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#inicio" aria-label="Ir al inicio">
          <img src={logo} alt="Logo de Bambulab" className="h-10" />
        </a>

        <ul className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-white font-semibold text-sm sm:text-base">
          {enlaces.map(({ href, texto }) => (
            <li key={href}>
              <a href={href} aria-label={`Ir a ${texto.toLowerCase()}`} className="hover:underline">
                {texto}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
