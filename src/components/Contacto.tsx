import { useState } from 'react';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = `Hola, soy ${nombre}. Mi correo es ${email}. Quiero consultar lo siguiente: ${mensaje}`;
    const url = `https://wa.me/595986271647?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="bg-white text-bambu py-16 px-4 sm:px-6 text-center" data-aos="fade-up">
      <h2 className="text-3xl font-bold mb-8">¿Querés contactarnos?</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 text-left">
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu"
        />
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu"
        />
        <textarea
          placeholder="Tu mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={5}
          className="w-full px-4 py-3 border border-bambu rounded-md focus:outline-none focus:ring-2 focus:ring-bambu"
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-bambu text-white font-bold py-3 px-6 rounded-full shadow hover:scale-105 transition-transform"
        >
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
};

export default Contacto;
