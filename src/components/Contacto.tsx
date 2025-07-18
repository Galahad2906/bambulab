import { useState } from 'react';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [producto, setProducto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Hola, soy ${nombre} de ${ciudad}. Estoy interesado/a en: ${producto}. Quiero consultar lo siguiente: ${mensaje}`;
    const url = `https://wa.me/595986271647?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="contacto"
      className="bg-white text-bambu py-20 px-4 sm:px-6"
      data-aos="fade-up"
    >
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">¿Querés contactarnos?</h2>
        <p className="mt-2 text-gray-700">
          Completá el formulario y te respondemos por WhatsApp.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-6 text-left"
      >
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu/60"
        />
        <input
          type="text"
          placeholder="Tu ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu/60"
        />
        <input
          type="text"
          placeholder="Producto de interés"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          required
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu/60"
        />
        <textarea
          placeholder="Tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu/60"
        />
        <div className="text-center">
          <button
            type="submit"
            className="bg-bambu text-white font-bold py-3 px-6 rounded-full shadow hover:scale-105 transition-transform"
          >
            Enviar por WhatsApp
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contacto;
