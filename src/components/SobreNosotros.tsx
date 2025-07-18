import sobreImg from '../assets/sobre-nosotros.png'

const SobreNosotros = () => {
  return (
    <section id="sobre" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src={sobreImg}
          alt="Sobre Bambulab"
          className="w-full max-w-md mx-auto md:mx-0 rounded-lg shadow-lg"
          data-aos="fade-right"
        />
        <div className="text-center md:text-left md:order-last" data-aos="fade-left">
          <h2 className="text-3xl font-bold text-bambu mb-4">Sobre Bambulab</h2>
          <p className="text-gray-700 leading-relaxed">
            En Bambulab nos apasiona crear artículos únicos y personalizados para que tus momentos sean inolvidables. 🎁✨
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Desde Encarnación, trabajamos con dedicación en cada detalle y enviamos a todo Paraguay. ¡Gracias por confiar en nosotros!
          </p>
        </div>
      </div>
    </section>
  )
}

export default SobreNosotros
