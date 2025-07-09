// src/components/FloatingWhatsapp.tsx
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsapp = () => {
  return (
    <a
      href="https://wa.me/595986271647?text=Hola,%20quiero%20más%20información"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default FloatingWhatsapp;
