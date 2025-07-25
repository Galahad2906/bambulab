import { FC } from 'react'

interface PanelHeaderProps {
  onLogout: () => void
}

const PanelHeader: FC<PanelHeaderProps> = ({ onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">Panel de Administración</h2>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default PanelHeader
