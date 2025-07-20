import { useState } from 'react'
import { db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const ProductForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { nombre, precio, imagen, descripcion } = formData

    if (!nombre || !precio || !imagen || !descripcion) {
      toast.error('⚠️ Completá todos los campos.')
      return
    }

    try {
      await addDoc(collection(db, 'productos'), {
        nombre,
        precio: parseFloat(precio),
        imagen,
        descripcion,
        creado: serverTimestamp()
      })

      toast.success('✅ Producto agregado correctamente')
      setFormData({ nombre: '', precio: '', imagen: '', descripcion: '' })
    } catch (error) {
      console.error('Error al guardar producto:', error)
      toast.error('❌ Ocurrió un error al guardar')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md p-6 rounded-lg mb-8 space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-2 text-bambu">Agregar producto</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del producto"
        value={formData.nombre}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="imagen"
        placeholder="URL de imagen"
        value={formData.imagen}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="descripcion"
        placeholder="Descripción del producto"
        value={formData.descripcion}
        onChange={handleChange}
        className="w-full border p-2 rounded resize-none"
      />

      {formData.imagen && (
        <img
          src={formData.imagen}
          alt="Vista previa"
          className="w-full h-40 object-cover rounded-md border"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/300x200?text=Imagen+inválida'
          }}
        />
      )}

      <button
        type="submit"
        className="bg-bambu text-white font-bold px-4 py-2 rounded hover:bg-bambu/90 w-full"
      >
        Guardar producto
      </button>
    </form>
  )
}

export default ProductForm
