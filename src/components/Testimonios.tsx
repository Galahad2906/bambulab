import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import ana from '../assets/testimonios/ana.jpeg'
import carlos from '../assets/testimonios/carlos.jpeg'
import lucia from '../assets/testimonios/lucia.jpeg'

const testimonios = [
  {
    nombre: 'Ana G.',
    mensaje:
      '¡Quedé encantada con mis productos personalizados! Todo llegó perfecto y súper rápido. 💚',
    avatar: ana,
  },
  {
    nombre: 'Carlos M.',
    mensaje:
      'El diseño de mi marca quedó espectacular. Gracias por la dedicación y creatividad.',
    avatar: carlos,
  },
  {
    nombre: 'Lucía R.',
    mensaje:
      'Bambulab se pasó. La atención fue excelente y los detalles marcaron la diferencia.',
    avatar: lucia,
  },
]

const Testimonios = () => {
  return (
    <section
      className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8 text-center"
      id="testimonios"
      role="region"
      aria-label="Testimonios de clientes sobre Bambulab"
    >
      <h2 className="text-3xl font-bold text-bambu mb-10">
        Lo que dicen nuestros clientes
      </h2>

      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={testimonios.length > 3}
        >
          {testimonios.map((testi, index) => (
            <SwiperSlide
              key={index}
              className="mb-6"
              aria-label={`Testimonio de ${testi.nombre}`}
            >
              <div className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto">
                <img
                  src={testi.avatar}
                  alt={`Foto de ${testi.nombre}`}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-bambu object-cover"
                />
                <p className="italic text-gray-700 mb-3">“{testi.mensaje}”</p>
                <p className="font-bold text-bambu">— {testi.nombre}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonios
