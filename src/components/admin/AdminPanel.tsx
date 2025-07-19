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
} from 'firebase/firestore'
import { signOut } from 'firebase/auth'

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: '',
    categoria: '',
    destacado: false,
  })

  const [productos, setProductos] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProductos = async () => {
      const querySnapshot = await getDocs(collection(db, 'productos'))
      const productosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProductos(productosData)
    }

    fetchProductos()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { nombre, descripcion, imagen, precio, categoria } = formData

    if (
      !nombre.trim() ||
      !descripcion.trim() ||
      !imagen.trim() ||
      !precio.trim() ||
      !categoria.trim()
    ) {
      alert('Por favor completá todos los campos obligatorios.')
      return
    }

    try {
      await addDoc(collection(db, 'productos'), {
        ...formData,
        precio: parseFloat(precio),
        timestamp: serverTimestamp(),
      })

      alert('✅ Producto agregado correctamente')
      setFormData({
        nombre: '',
        descripcion: '',
        imagen: '',
        precio: '',
        categoria: '',
        destacado: false,
      })

      const querySnapshot = await getDocs(collection(db, 'productos'))
      const productosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProductos(productosData)
    } catch (error) {
      console.error('Error al agregar producto:', error)
      alert('❌ Ocurrió un error')
    }
  }

  const handleEliminar = async (id: string) => {
    const confirm = window.confirm('¿Estás seguro de que querés eliminar este producto?')
    if (!confirm) return

    await deleteDoc(doc(db, 'productos', id))
    setProductos(productos.filter((producto) => producto.id !== id))
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

      {/* 🧼 Formulario sin DaisyUI */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mb-10">
        <h2 className="text-2xl font-bold text-lime-600">Panel de Administración</h2>

        <input
          type="text"
          placeholder="Nombre del producto"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />

        <textarea
          placeholder="Descripción"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />

        <input
          type="text"
          placeholder="URL de la imagen (desde ImgBB)"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
        />

        <input
          type="number"
          placeholder="Precio"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        />

        <input
          type="text"
          placeholder="Categoría"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
          value={formData.categoria}
          onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
        />

        <label className="flex items-center gap-2 text-lime-700">
          <input
            type="checkbox"
            checked={formData.destacado}
            onChange={(e) => setFormData({ ...formData, destacado: e.target.checked })}
            className="w-4 h-4 border-gray-300 rounded focus:ring-lime-500"
          />
          Destacado
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 font-semibold"
        >
          Agregar producto
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white shadow-md rounded-xl p-4 relative border"
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
              <button
                onClick={() => alert('Función editar pendiente')}
                className="text-blue-500 hover:text-blue-700 text-xl"
                title="Editar"
              >
                ✏️
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdminPanel
