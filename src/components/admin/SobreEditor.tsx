import { SobreData } from 'types'

type SobreEditorProps = {
  sobreData: SobreData
  setSobreData: React.Dispatch<React.SetStateAction<SobreData>>
  guardarSobre: () => Promise<void>
}

const SobreEditor = ({ sobreData, setSobreData, guardarSobre }: SobreEditorProps) => {
  return (
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
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/400x200?text=No+disponible'
          }}
        />
      )}

      <button
        onClick={guardarSobre}
        className="bg-bambu text-white px-4 py-2 rounded hover:bg-bambu/90 font-bold w-full"
      >
        Guardar sección
      </button>
    </section>
  )
}

export default SobreEditor
