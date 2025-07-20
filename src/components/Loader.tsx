const Loader = () => {
  return (
    <div
      className="fixed inset-0 bg-bambu text-white flex items-center justify-center z-50"
      role="status"
      aria-live="polite"
      aria-label="Cargando el sitio de Bambulab"
    >
      <div className="animate-pulse text-4xl sm:text-5xl font-black tracking-widest drop-shadow-md">
        <span aria-hidden="true">BAMBULAB</span>
      </div>
      <span className="sr-only">Cargando Bambulab...</span>
    </div>
  )
}

export default Loader
