import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { FaWhatsapp } from 'react-icons/fa'

type Producto = {
  id: string
  nombre: string
  imagen: string
  precio?: number
  categoria?: string
  destacado?: boolean
}

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [soloDestacados, setSoloDestacados] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'productos'))
        const datos = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Producto[]
        setProductos(datos)
      } catch (error) {
        console.error('Error al cargar productos:', error)
      }
    }

    obtenerProductos()
  }, [])

  const productosFiltrados = productos
    .filter(p =>
      categoriaSeleccionada === 'Todas' ? true : p.categoria === categoriaSeleccionada
    )
    .filter(p => (soloDestacados ? p.destacado : true))

  const mostrarToast = (mensaje: string) => {
    setToast(mensaje)
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <section
      id="productos"
      role="region"
      aria-label="Catálogo de productos"
      className="py-20 px-4 sm:px-6 bg-white text-bambu"
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Nuestros productos</h2>
        <p className="mt-2 text-gray-700">Diseños únicos hechos a medida</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value)
            mostrarToast(`Filtro aplicado: ${e.target.value}`)
          }}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="Todas">Todas las categorías</option>
          {Array.from(new Set(productos.map(p => p.categoria).filter(Boolean))).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={soloDestacados}
            onChange={(e) => {
              setSoloDestacados(e.target.checked)
              mostrarToast(
                e.target.checked
                  ? 'Mostrando solo destacados'
                  : 'Mostrando todos los productos'
              )
            }}
            className="w-4 h-4"
          />
          Solo destacados
        </label>

        {(categoriaSeleccionada !== 'Todas' || soloDestacados) && (
          <button
            onClick={() => {
              setCategoriaSeleccionada('Todas')
              setSoloDestacados(false)
              mostrarToast('Filtros restablecidos')
            }}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Productos */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-auto max-w-6xl">
        {productosFiltrados.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay productos que coincidan con los filtros seleccionados.
          </p>
        ) : (
          productosFiltrados.map((prod, i) => (
            <div
              key={prod.id}
              className="relative w-full max-w-xs rounded-lg shadow-md overflow-hidden bg-white group transition-transform hover:scale-[1.02]"
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
                {prod.precio && (
                  <p className="text-sm text-gray-600 mt-1">
                    {prod.precio.toLocaleString()} Gs
                  </p>
                )}
                {prod.categoria && (
                  <p className="text-xs text-gray-400">{prod.categoria}</p>
                )}
                {prod.destacado && (
                  <span className="inline-block mt-2 text-xs text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full">
                    ⭐ Destacado
                  </span>
                )}
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
          ))
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-bambu text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50"
          role="alert"
        >
          {toast}
        </div>
      )}
    </section>
  )
}

export default Productos
