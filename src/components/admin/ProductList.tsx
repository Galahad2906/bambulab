import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'
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

const ProductList = () => {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Producto[]
        setProductos(items)
      } catch (error) {
        console.error('Error al obtener productos:', error)
      }
    }

    fetchProductos()
  }, [])

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-bambu">📋 Productos cargados</h2>

      {productos.length === 0 ? (
        <p className="text-gray-600">No hay productos registrados aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <motion.div
              key={producto.id}
              className="bg-white rounded-xl shadow-md p-4 relative border hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {producto.destacado && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  ⭐ Destacado
                </span>
              )}

              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-40 object-cover rounded mb-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
                }}
              />

              <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>

              <p className="text-gray-600 text-sm">
                {producto.descripcion || 'Sin descripción disponible.'}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                Categoría: <span className="font-medium">{producto.categoria || 'Sin categoría'}</span>
              </p>

              <p className="font-bold text-bambu mt-2 text-right">
                Gs. {producto.precio.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
