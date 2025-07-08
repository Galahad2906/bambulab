import { FaWhatsapp } from 'react-icons/fa'

const productos = [
  { nombre: "Alcancías", imagen: "/src/assets/productos/alcancias.jpg" },
  { nombre: "Choperas (Negro)", imagen: "/src/assets/productos/choperas1.jpg" },
  { nombre: "Choperas (Rojo)", imagen: "/src/assets/productos/choperas2.jpg" },
  { nombre: "Lentes", imagen: "/src/assets/productos/lentes.jpg" },
  { nombre: "Abanicos", imagen: "/src/assets/productos/abanicos.jpg" },
  { nombre: "Copas", imagen: "/src/assets/productos/copas.jpg" },
  { nombre: "Botellas", imagen: "/src/assets/productos/botella.jpg" },
]

const Productos = () => {
  return (
    <section id="productos" className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-bambu mb-10">Productos destacados</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {productos.map((prod, i) => (
          <div
            key={i}
            className="relative w-64 rounded-lg shadow-md overflow-hidden bg-white group"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <img
              src={prod.imagen}
              alt={`Producto: ${prod.nombre}`}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{prod.nombre}</h3>
            </div>
            <a
              href={`https://wa.me/595986271647?text=Hola,%20quiero%20info%20sobre%20${encodeURIComponent(prod.nombre)}`}
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
