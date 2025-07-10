import { FaTags, FaQrcode, FaLightbulb } from 'react-icons/fa'

const servicios = [
  {
    icono: <FaTags size={36} className="text-bambu" />,
    titulo: "Diseño para productos",
    descripcion: "Stickers, toppers, llaveros, empaques y recuerdos personalizados.",
  },
  {
    icono: <FaQrcode size={36} className="text-bambu" />,
    titulo: "Afiches con QR",
    descripcion: "Conectá tu marca o Instagram con diseños modernos y funcionales.",
  },
  {
    icono: <FaLightbulb size={36} className="text-bambu" />,
    titulo: "Identidad visual",
    descripcion: "Creamos tu logo, flyers y estilo para que tu marca se destaque.",
  },
]

const Servicios = () => {
  return (
    <section id="servicios" className="bg-gray-100 py-16 px-4 sm:px-6 text-center">
      <h2 className="text-3xl font-bold text-bambu mb-12">Servicios</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
        {servicios.map((serv, i) => (
          <div
            key={i}
            className="w-full max-w-xs bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            data-aos="zoom-in"
            data-aos-delay={i * 150}
          >
            <div className="mb-4 flex justify-center">{serv.icono}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{serv.titulo}</h3>
            <p className="text-gray-600">{serv.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Servicios
