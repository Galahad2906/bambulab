import { BannerData } from '../../types'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

type BannerManagerProps = {
  bannerData: BannerData & { enlace?: string }
  setBannerData: React.Dispatch<React.SetStateAction<BannerData & { enlace?: string }>>
  guardarBanner: () => Promise<void>
}

const BannerManager = ({ bannerData, setBannerData, guardarBanner }: BannerManagerProps) => {
  const { imagen, enlace, activo } = bannerData

  const handleGuardar = async () => {
    if (!imagen) {
      toast.error('⚠️ Debes proporcionar una URL de imagen')
      return
    }
    await guardarBanner()
  }

  return (
    <section className="bg-gray-50 p-6 rounded-lg shadow mb-8 max-w-xl mx-auto border">
      <h3 className="text-xl font-bold text-bambu mb-4">📢 Banner superior</h3>

      <input
        type="text"
        placeholder="URL de la imagen"
        value={imagen}
        onChange={(e) => setBannerData({ ...bannerData, imagen: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      />

      <input
        type="text"
        placeholder="(Opcional) Enlace al hacer clic"
        value={enlace || ''}
        onChange={(e) => setBannerData({ ...bannerData, enlace: e.target.value })}
        className="w-full border p-2 rounded mb-2"
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={activo}
          onChange={(e) => setBannerData({ ...bannerData, activo: e.target.checked })}
        />
        Mostrar banner
      </label>

      {imagen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <img
            src={imagen}
            alt="Vista previa del banner"
            className="w-full h-auto max-h-64 sm:max-h-80 object-cover rounded-md shadow"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/800x300?text=Imagen+no+disponible'
            }}
          />
        </motion.div>
      )}

      <button
        onClick={handleGuardar}
        className="bg-bambu text-white w-full py-2 rounded font-bold hover:bg-bambu/90 transition"
      >
        Guardar banner
      </button>
    </section>
  )
}

export default BannerManager
