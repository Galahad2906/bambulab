import { Testimonio } from '../../types'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

type Props = {
  testimonios: Testimonio[]
  testimonioForm: Testimonio
  setTestimonioForm: React.Dispatch<React.SetStateAction<Testimonio>>
  modoEdicion: boolean
  setModoEdicion: React.Dispatch<React.SetStateAction<boolean>>
  idEditando: string | null
  setIdEditando: React.Dispatch<React.SetStateAction<string | null>>
  guardarTestimonio: () => Promise<void>
  eliminarTestimonio: (id: string) => Promise<void>
}

const TestimoniosManager = ({
  testimonios,
  testimonioForm,
  setTestimonioForm,
  modoEdicion,
  setModoEdicion,
  idEditando,
  setIdEditando,
  guardarTestimonio,
  eliminarTestimonio
}: Props) => {
  const handleEditar = (t: Testimonio) => {
    setTestimonioForm({ nombre: t.nombre, mensaje: t.mensaje, avatar: t.avatar })
    setIdEditando(t.id || null)
    setModoEdicion(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* 📝 Formulario */}
      <section className="bg-gray-50 p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border">
        <h3 className="text-xl font-bold text-bambu mb-4">💬 Testimonios</h3>

        <input
          type="text"
          placeholder="Nombre"
          value={testimonioForm.nombre}
          onChange={(e) => setTestimonioForm({ ...testimonioForm, nombre: e.target.value })}
          className="w-full border p-2 rounded mb-2"
        />
        <textarea
          placeholder="Mensaje"
          value={testimonioForm.mensaje}
          onChange={(e) => setTestimonioForm({ ...testimonioForm, mensaje: e.target.value })}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="URL del avatar"
          value={testimonioForm.avatar}
          onChange={(e) => setTestimonioForm({ ...testimonioForm, avatar: e.target.value })}
          className="w-full border p-2 rounded mb-2"
        />
        {testimonioForm.avatar && (
          <img
            src={testimonioForm.avatar}
            alt="Avatar preview"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/100x100?text=No+disponible'
            }}
          />
        )}
        <button
          onClick={guardarTestimonio}
          className="bg-bambu text-white w-full py-2 rounded font-bold"
        >
          {modoEdicion ? 'Guardar cambios' : 'Agregar testimonio'}
        </button>
      </section>

      {/* 📋 Listado */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
        {testimonios.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded shadow text-center relative"
          >
            <img
              src={t.avatar}
              alt={t.nombre}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
            />
            <p className="text-sm italic text-gray-700">"{t.mensaje}"</p>
            <h4 className="font-bold text-bambu mt-2">{t.nombre}</h4>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => handleEditar(t)}
                className="text-blue-500 hover:text-blue-700"
              >
                ✏️
              </button>
              <button
                onClick={() => eliminarTestimonio(t.id!)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </>
  )
}

export default TestimoniosManager
