import { FaWhatsapp } from 'react-icons/fa'

import alcancias from '../assets/productos/alcancias.jpg'
import choperas1 from '../assets/productos/choperas1.jpg'
import choperas2 from '../assets/productos/choperas2.jpg'
import lentes from '../assets/productos/lentes.jpg'
import abanicos from '../assets/productos/abanicos.jpg'
import copas from '../assets/productos/copas.jpg'
import botella from '../assets/productos/botella.jpg'

const productos = [
  { nombre: 'Alcancías', imagen: alcancias },
  { nombre: 'Choperas', imagen: choperas1 },
  { nombre: 'Choperas', imagen: choperas2 },
  { nombre: 'Lentes', imagen: lentes },
  { nombre: 'Abanicos', imagen: abanicos },
  { nombre: 'Copas', imagen: copas },
  { nombre: 'Botellas', imagen: botella },
]

const Productos = () => {
  return (
    <section
      id="productos"
      role="region"
      aria-label="Catálogo de productos personalizados"
      className="py-20 px-4 sm:px-6 bg-white text-bambu"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Nuestros productos</h2>
        <p className="mt-2 text-gray-700">Diseños únicos hechos a medida</p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-auto max-w-6xl">
        {productos.map((prod, i) => (
          <div
            key={i}
            className="relative w-full max-w-xs rounded-lg shadow-md overflow-hidden bg-white group"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <img
              src={prod.imagen}
              alt={`Producto: ${prod.nombre}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {prod.nombre}
              </h3>
            </div>
            <a
              href={`https://wa.me/595986271647?text=Hola,%20quiero%20info%20sobre%20${encodeURIComponent(
                prod.nombre
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 text-green-500 hover:scale-110 transition-transform"
              title="Consultar por WhatsApp"
            >
              <FaWhatsapp size={28} />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Productos
