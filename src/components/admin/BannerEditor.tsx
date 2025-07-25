import { FC } from 'react'

interface BannerEditorProps {
  imagen: string
  activo: boolean
  onChange: (data: { imagen: string; activo: boolean }) => void
  onSave: () => void
}

const BannerEditor: FC<BannerEditorProps> = ({ imagen, activo, onChange, onSave }) => {
  return (
    <div className="mb-10 border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold text-lime-600 mb-2">📸 Banner superior</h3>

      <input
        type="text"
        placeholder="URL de la imagen del banner"
        className="w-full p-2 border rounded-md mb-2"
        value={imagen}
        onChange={(e) => onChange({ imagen: e.target.value, activo })}
      />

      {imagen && (
        <img
          src={imagen}
          alt="Vista previa del banner"
          className="w-full max-h-60 object-cover rounded border"
        />
      )}

      <label className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => onChange({ imagen, activo: e.target.checked })}
          className="w-4 h-4"
        />
        Mostrar banner en la web
      </label>

      <button
        onClick={onSave}
        className="mt-3 px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 font-semibold"
      >
        Guardar cambios
      </button>
    </div>
  )
}

export default BannerEditor
