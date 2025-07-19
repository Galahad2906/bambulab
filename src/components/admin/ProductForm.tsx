import { useState } from 'react'
import { db } from '../../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const ProductForm = () => {
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [imagenUrl, setImagenUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre || !precio || !imagenUrl) return

    try {
      await addDoc(collection(db, 'productos'), {
        nombre,
        precio: parseFloat(precio),
        imagen: imagenUrl,
        creado: Timestamp.now()
      })

      // Limpiar campos
      setNombre('')
      setPrecio('')
      setImagenUrl('')
      alert('✅ Producto agregado correctamente')
    } catch (error) {
      console.error('Error al agregar producto:', error)
      alert('❌ Error al guardar el producto')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4"
    >
      <h2 className="text-xl font-bold mb-2 text-bambu">Agregar producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        placeholder="URL de imagen"
        value={imagenUrl}
        onChange={(e) => setImagenUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-bambu text-white font-bold px-4 py-2 rounded hover:bg-bambu/90"
      >
        Guardar producto
      </button>
    </form>
  )
}

export default ProductForm
