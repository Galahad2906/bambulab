import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebase'
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

type Producto = {
  id: string
  nombre: string
  descripcion: string
  imagen: string
  precio: number
  categoria: string
  destacado: boolean
}

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: '',
    categoria: '',
    destacado: false,
  })

  const [productos, setProductos] = useState<Producto[]>([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [productoEditandoId, setProductoEditandoId] = useState<string | null>(null)
  const [paginaActual, setPaginaActual] = useState(1)
  const productosPorPagina = 6

  const [bannerData, setBannerData] = useState({ mensaje: '', activo: false })
  const [sobreData, setSobreData] = useState({ texto: '', imagen: '' })

  const navigate = useNavigate()

  const totalPaginas = Math.ceil(productos.length / productosPorPagina)
  const indexUltimo = paginaActual * productosPorPagina
  const indexPrimero = indexUltimo - productosPorPagina
  const productosVisibles = productos.slice(indexPrimero, indexUltimo)

  const toastBambu = (mensaje: string, tipo: 'success' | 'error' = 'success') =>
    toast[tipo](mensaje, {
      icon: '🎉',
      style: {
        background: '#b3cd23',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      },
      duration: 3000,
    })

  const fetchProductos = async () => {
    const snapshot = await getDocs(collection(db, 'productos'))
    const datos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Producto, 'id'>),
    }))
    setProductos(datos)
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  useEffect(() => {
    const obtenerBanner = async () => {
      const ref = doc(db, 'banner', 'principal')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setBannerData(snap.data() as { mensaje: string; activo: boolean })
      }
    }
    obtenerBanner()
  }, [])

  useEffect(() => {
    const obtenerSobre = async () => {
      const ref = doc(db, 'config', 'sobre')
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setSobreData(snap.data() as { texto: string; imagen: string })
      }
    }
    obtenerSobre()
  }, [])
  const guardarBanner = async () => {
    try {
      await setDoc(doc(db, 'banner', 'principal'), bannerData)
      toastBambu('🎉 Banner actualizado correctamente')
    } catch (error) {
      console.error(error)
      toastBambu('❌ Error al guardar el banner', 'error')
    }
  }

  const guardarSobre = async () => {
    try {
      await setDoc(doc(db, 'config', 'sobre'), sobreData)
      toastBambu('✅ Sección "Sobre Bambulab" actualizada')
    } catch (error) {
      console.error(error)
      toastBambu('❌ Error al guardar sección sobre', 'error')
    }
  }

  const handleEditar = (producto: Producto) => {
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      precio: producto.precio.toString(),
      categoria: producto.categoria,
      destacado: producto.destacado,
    })
    setProductoEditandoId(producto.id)
    setModoEdicion(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      imagen: '',
      precio: '',
      categoria: '',
      destacado: false,
    })
    setModoEdicion(false)
    setProductoEditandoId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { nombre, descripcion, imagen, precio, categoria, destacado } = formData

    if (!nombre || !descripcion || !imagen || !precio || !categoria) {
      toastBambu('⚠️ Completá todos los campos obligatorios.', 'error')
      return
    }

    try {
      const data = {
        nombre,
        descripcion,
        imagen,
        precio: parseFloat(precio),
        categoria,
        destacado,
        timestamp: serverTimestamp(),
      }

      if (modoEdicion && productoEditandoId) {
        await updateDoc(doc(db, 'productos', productoEditandoId), data)
        toastBambu('✅ Producto actualizado correctamente')
      } else {
        await addDoc(collection(db, 'productos'), data)
        toastBambu('✅ Producto agregado correctamente')
      }

      resetForm()
      await fetchProductos()
    } catch (error) {
      console.error('Error al guardar:', error)
      toastBambu('❌ Ocurrió un error al guardar', 'error')
    }
  }

  const handleEliminar = async (id: string) => {
    const confirm = window.confirm('¿Eliminar este producto?')
    if (!confirm) return

    await deleteDoc(doc(db, 'productos', id))
    toastBambu('🗑️ Producto eliminado correctamente')
    await fetchProductos()
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/login')
  }
  return (
    <section className="min-h-screen bg-white text-bambu p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Panel de Administración</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          Cerrar sesión
        </button>
      </div>

      {/* 🔧 Banner */}
      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border">
        <h3 className="text-xl font-bold text-bambu mb-4">📢 Banner superior</h3>
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Mensaje del banner"
          value={bannerData.mensaje}
          onChange={(e) => setBannerData({ ...bannerData, mensaje: e.target.value })}
        />
        <label className="flex items-center gap-2 text-bambu font-medium mb-4">
          <input
            type="checkbox"
            checked={bannerData.activo}
            onChange={(e) =>
              setBannerData({ ...bannerData, activo: e.target.checked })
            }
            className="w-4 h-4"
          />
          Mostrar banner
        </label>
        <button
          onClick={guardarBanner}
          className="bg-bambu text-white px-4 py-2 rounded hover:bg-bambu/90 font-bold w-full"
        >
          Guardar cambios
        </button>
      </section>

      {/* 📝 Sobre Bambulab */}
      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border">
        <h3 className="text-xl font-bold text-bambu mb-4">📝 Editar sección "Sobre Bambulab"</h3>
        <textarea
          className="w-full border p-2 rounded mb-2"
          placeholder="Texto descriptivo"
          value={sobreData.texto}
          onChange={(e) => setSobreData({ ...sobreData, texto: e.target.value })}
          rows={5}
        />
        <input
          type="text"
          className="w-full border p-2 rounded mb-2"
          placeholder="URL de imagen"
          value={sobreData.imagen}
          onChange={(e) => setSobreData({ ...sobreData, imagen: e.target.value })}
        />
        {sobreData.imagen && (
          <img
            src={sobreData.imagen}
            alt="Vista previa"
            className="w-full h-40 object-cover rounded-md border mb-2"
          />
        )}
        <button
          onClick={guardarSobre}
          className="bg-bambu text-white px-4 py-2 rounded hover:bg-bambu/90 font-bold w-full"
        >
          Guardar sección
        </button>
      </section>

      {/* 📦 Formulario de productos */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-lime-600">
          {modoEdicion ? '✏️ Editar producto' : '➕ Nuevo producto'}
        </h2>

        <input
          type="text"
          placeholder="Nombre del producto"
          className="w-full p-2 border rounded-md"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          className="w-full p-2 border rounded-md"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />

        <input
          type="text"
          placeholder="URL de la imagen"
          className="w-full p-2 border rounded-md"
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
        />

        {formData.imagen && (
          <img
            src={formData.imagen}
            alt="Vista previa"
            className="w-full h-40 object-cover rounded-md border"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/300x200?text=Imagen+no+válida'
            }}
          />
        )}

        <input
          type="number"
          placeholder="Precio"
          className="w-full p-2 border rounded-md"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        />

        <input
          type="text"
          placeholder="Categoría"
          className="w-full p-2 border rounded-md"
          value={formData.categoria}
          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        />

        <label className="flex items-center gap-2 text-lime-700">
          <input
            type="checkbox"
            checked={formData.destacado}
            onChange={(e) =>
              setFormData({ ...formData, destacado: e.target.checked })
            }
            className="w-4 h-4"
          />
          Destacado
        </label>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 font-semibold"
          >
            {modoEdicion ? 'Guardar cambios' : 'Agregar producto'}
          </button>

          {modoEdicion && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 font-semibold"
            >
              Cancelar
            </button>
          )}
        </div>
      </motion.form>

      {/* 📋 Listado de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {productosVisibles.map((producto) => (
          <motion.div
            key={producto.id}
            className="bg-white shadow-md rounded-xl p-4 relative border"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-sm text-gray-600">{producto.descripcion}</p>
            <p className="text-sm text-gray-800 mt-1">💲 {producto.precio}</p>
            <p className="text-sm text-gray-500">📦 {producto.categoria}</p>
            {producto.destacado && (
              <span className="inline-block mt-2 text-xs text-yellow-700 bg-yellow-200 px-2 py-1 rounded-full">
                ⭐ Destacado
              </span>
            )}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEliminar(producto.id)}
                className="text-red-500 hover:text-red-700 text-xl"
                title="Eliminar"
              >
                ❌
              </button>
              <motion.button
                onClick={() => handleEditar(producto)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-500 hover:text-blue-700 text-xl"
                title="Editar"
              >
                ✏️
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📄 Paginación */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
        {paginaActual > 1 && (
          <button
            onClick={() => setPaginaActual(paginaActual - 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Anterior
          </button>
        )}
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
          <button
            key={pagina}
            onClick={() => setPaginaActual(pagina)}
            className={`px-3 py-1 rounded ${
              pagina === paginaActual
                ? 'bg-lime-600 text-white font-bold'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {pagina}
          </button>
        ))}
        {paginaActual < totalPaginas && (
          <button
            onClick={() => setPaginaActual(paginaActual + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Siguiente →
          </button>
        )}
      </div>
    </section>
  )
}

export default AdminPanel
