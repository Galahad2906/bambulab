import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'

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
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
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
      <h2 className="text-2xl font-bold mb-4">📋 Productos cargados</h2>
      {productos.length === 0 ? (
        <p className="text-gray-600">No hay productos registrados aún.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productos.map(producto => (
            <div key={producto.id} className="bg-white rounded shadow p-4 relative">
              {producto.destacado && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                  Destacado
                </span>
              )}
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{producto.nombre}</h3>
              <p className="text-gray-600">{producto.descripcion}</p>
              <p className="text-sm text-gray-500 mt-1">Categoría: {producto.categoria}</p>
              <p className="font-bold text-bambu mt-2">
                Gs. {producto.precio.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProductList
