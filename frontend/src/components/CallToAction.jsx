import React from 'react';
import logo from '../imagenes/logobytes.png';
import LogoBackground from './LogoBackground';

const CallToAction = () => {
  return (
    <section className="bg-[#0F0F0F] text-white py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black uppercase mb-4">¿Estás listo para potenciar tu negocio?</h2>
            <p className="text-gray-400 mb-6">Hablemos de tu proyecto y cómo podemos ayudarte a crecer.</p>
            <form className="space-y-4">
              <input type="text" placeholder="Tu Nombre" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]" />
              <input type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]" />
              <input type="tel" placeholder="Número" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]" />
              <textarea placeholder="Mensaje" rows="4" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000] resize-none" />
              <button type="submit" className="bg-[#C8F000] text-black px-8 py-3 rounded-full font-black text-xs uppercase hover:scale-105 transition">ENVIAR</button>
            </form>
          </div>
          <div className="text-center relative h-full flex items-center justify-center">
            <LogoBackground />
            <div className="relative z-10">
              <img src={logo} alt="Bytes Creativos Logo" className="w-40 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Transformamos bytes en negocios rentables.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;