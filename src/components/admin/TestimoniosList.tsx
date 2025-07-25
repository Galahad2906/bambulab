import { FC } from 'react'

interface Testimonio {
  id: string
  nombre: string
  mensaje: string
  avatar: string
}

interface TestimoniosListProps {
  testimonios: Testimonio[]
  onEditar: (testimonio: Testimonio) => void
  onEliminar: (id: string) => void
}

const TestimoniosList: FC<TestimoniosListProps> = ({ testimonios, onEditar, onEliminar }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
      {testimonios.map((t) => (
        <div key={t.id} className="bg-white p-4 rounded shadow text-center relative">
          <img
            src={t.avatar}
            alt={t.nombre}
            className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
          />
          <p className="text-sm italic text-gray-700">"{t.mensaje}"</p>
          <h4 className="font-bold text-bambu mt-2">{t.nombre}</h4>
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => onEditar(t)}
              className="text-blue-500 hover:text-blue-700"
              title="Editar"
            >
              ✏️
            </button>
            <button
              onClick={() => onEliminar(t.id)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              ❌
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default TestimoniosList
