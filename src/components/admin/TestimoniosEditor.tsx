import { FC } from 'react'

interface Testimonio {
  nombre: string
  mensaje: string
  avatar: string
}

interface TestimoniosEditorProps {
  form: Testimonio
  onChange: (nuevo: Testimonio) => void
  onSave: () => void
  editando: boolean
}

const TestimoniosEditor: FC<TestimoniosEditorProps> = ({ form, onChange, onSave, editando }) => {
  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border">
      <h3 className="text-xl font-bold text-bambu mb-4">💬 Testimonios</h3>

      <input
        type="text"
        placeholder="Nombre"
        value={form.nombre}
        onChange={(e) => onChange({ ...form, nombre: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      />

      <textarea
        placeholder="Mensaje"
        value={form.mensaje}
        onChange={(e) => onChange({ ...form, mensaje: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      />

      <input
        type="text"
        placeholder="URL del avatar"
        value={form.avatar}
        onChange={(e) => onChange({ ...form, avatar: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      />

      {form.avatar && (
        <img
          src={form.avatar}
          alt="Avatar preview"
          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
        />
      )}

      <button
        onClick={onSave}
        className="bg-bambu text-white w-full py-2 rounded font-bold"
      >
        {editando ? 'Guardar cambios' : 'Agregar testimonio'}
      </button>
    </section>
  )
}

export default TestimoniosEditor
