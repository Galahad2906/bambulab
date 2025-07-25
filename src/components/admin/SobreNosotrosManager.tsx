import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const SobreNosotrosManager = () => {
  const [texto, setTexto] = useState('')
  const [imagen, setImagen] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const docRef = doc(db, 'config', 'sobre')
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          const data = snap.data()
          setTexto(data.texto || '')
          setImagen(data.imagen || '')
        }
      } catch (error) {
        console.error('Error al obtener datos de Sobre Nosotros:', error)
        toast.error('Error al cargar la información')
      } finally {
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])
  const guardarDatos = async () => {
    if (!texto || !imagen) {
      toast.error('⚠️ Completá todos los campos')
      return
    }

    try {
      await setDoc(doc(db, 'config', 'sobre'), { texto, imagen })
      toast.success('✅ Información actualizada correctamente')
    } catch (error) {
      console.error('Error al guardar información:', error)
      toast.error('❌ Ocurrió un error al guardar')
    }
  }

  if (cargando) return <p className="text-center py-4">Cargando sección...</p>

  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border">
      <h3 className="text-xl font-bold text-bambu mb-4">📌 Sobre Bambulab</h3>

      <textarea
        placeholder="Texto descriptivo"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="w-full border p-2 rounded mb-2 resize-none"
        rows={4}
      />

      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      {imagen && (
        <img
          src={imagen}
          alt="Vista previa"
          className="w-full h-48 object-cover rounded shadow mb-4"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/800x300?text=Imagen+no+disponible'
          }}
        />
      )}

      <button
        onClick={guardarDatos}
        className="bg-bambu text-white w-full py-2 rounded font-bold hover:bg-bambu/90 transition"
      >
        Guardar cambios
      </button>
    </section>
  )
}

export default SobreNosotrosManager
