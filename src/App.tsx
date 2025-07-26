import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Servicios from './components/Servicios'
import Testimonios from './components/Testimonios'
import SobreNosotros from './components/SobreNosotros'
import Contacto from './components/Contacto'
import Login from './components/admin/Login'
import AdminPanel from './components/admin/AdminPanel'
import RutaPrivada from './components/ProtectedRoute'
import Loader from './components/Loader'

type Producto = {
  id: string
  nombre: string
  imagen: string
  precio?: number
  categoria?: string
  destacado?: boolean
  descripcion?: string
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas')
  const [soloDestacados, setSoloDestacados] = useState(false)

  const [banner, setBanner] = useState<{ mensaje?: string; activo: boolean } | null>(null)
  const [bannerImagen, setBannerImagen] = useState('')
  const [bannerEnlace, setBannerEnlace] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const [productosSnap, bannerSnap] = await Promise.all([
          getDocs(collection(db, 'productos')),
          getDocs(collection(db, 'banner')),
        ])

        const productosData = productosSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Producto[]
        setProductos(productosData)

        if (!bannerSnap.empty) {
          const data = bannerSnap.docs[0].data()
          setBannerImagen(data.imagen || '')
          setBannerEnlace(data.enlace || '')
          setBanner({ activo: data.activo, mensaje: data.mensaje })
        }
      } catch (error) {
        toast.error('Ocurrió un error al cargar datos')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    fetchTodo()
  }, [])

  const productosFiltrados = productos
    .filter(p =>
      categoriaSeleccionada === 'Todas' ? true : p.categoria === categoriaSeleccionada
    )
    .filter(p => (soloDestacados ? p.destacado : true))

  if (cargando) return <Loader />

  return (
    <div className="overflow-x-hidden font-sans">
      {/* Banner superior */}
      {banner?.activo && bannerImagen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {bannerEnlace ? (
            <a href={bannerEnlace} target="_blank" rel="noopener noreferrer">
              <img
                src={bannerImagen}
                alt="Imagen promocional de Bambulab"
                className="w-full h-auto max-h-64 sm:max-h-80 object-cover rounded-md shadow hover:opacity-90 transition-opacity"
                loading="lazy"
              />
            </a>
          ) : (
            <img
              src={bannerImagen}
              alt="Imagen promocional de Bambulab"
              className="w-full h-auto max-h-64 sm:max-h-80 object-cover rounded-md shadow"
              loading="lazy"
            />
          )}
        </motion.div>
      )}

      {/* Mensaje opcional del banner */}
      {banner?.activo && banner.mensaje && (
        <div className="bg-yellow-100 text-yellow-800 text-center py-2 font-medium shadow">
          {banner.mensaje}
        </div>
      )}

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section
                id="productos"
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
                    className="p-2 border border-gray-300 rounded-md"
                    value={categoriaSeleccionada}
                    onChange={(e) => {
                      setCategoriaSeleccionada(e.target.value)
                      toast.success(`Filtro aplicado: ${e.target.value}`)
                    }}
                  >
                    <option value="Todas">Todas las categorías</option>
                    {Array.from(new Set(productos.map(p => p.categoria).filter(Boolean))).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      checked={soloDestacados}
                      onChange={(e) => {
                        setSoloDestacados(e.target.checked)
                        toast.success(
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
                        toast.success('Filtros restablecidos')
                      }}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium transition"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>

                {/* Lista de productos */}
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center mx-auto max-w-6xl">
                  {productosFiltrados.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                      No hay productos que coincidan con los filtros seleccionados.
                    </p>
                  ) : (
                    productosFiltrados.map((prod, i) => (
                      <div
                        key={prod.id}
                        className="relative w-full max-w-xs rounded-lg shadow-md overflow-hidden bg-white group"
                        data-aos="fade-up"
                        data-aos-delay={Math.min(i * 100, 800)}
                      >
                        <img
                          src={prod.imagen}
                          alt={`Producto: ${prod.nombre}`}
                          className="h-48 w-full object-cover"
                          loading="lazy"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800">{prod.nombre}</h3>
                          {prod.descripcion && (
                            <p className="text-sm text-gray-700 mt-2">{prod.descripcion}</p>
                          )}
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
                          href={`https://wa.me/595986271647?text=Hola,%20quiero%20info%20sobre%20${encodeURIComponent(prod.nombre)}`}
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
              </section>

              <Servicios />
              <Testimonios />
              <SobreNosotros />
              <Contacto />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <AdminPanel />
            </RutaPrivada>
          }
        />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
