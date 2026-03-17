import React, { useState } from 'react';
import logo from '../imagenes/logobytes.png';
import LogoBackground from './LogoBackground';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CallToAction = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        data = null;
      }

      if (!response.ok) {
        const msg = data?.error || text || 'Error en envío';
        throw new Error(msg);
      }

      setStatus('success');
      setErrorMessage('');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('contact error', error);
      setStatus('error');
      setErrorMessage(error.message || 'Ocurrió un error inesperado');
    }
  };

  return (
    <section className="bg-[#0F0F0F] text-white py-16 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black uppercase mb-4">¿Estás listo para potenciar tu negocio?</h2>
            <p className="text-gray-400 mb-6">Hablemos de tu proyecto y cómo podemos ayudarte a crecer.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Tu Nombre"
                className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]"
                required
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Número"
                className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Mensaje"
                rows="4"
                className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000] resize-none"
                required
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-[#C8F000] text-black px-8 py-3 rounded-full font-black text-xs uppercase hover:scale-105 transition disabled:opacity-50"
              >
                {status === 'sending' ? 'Enviando...' : 'ENVIAR'}
              </button>
            </form>
            {status === 'success' && <p className="text-green-400 mt-3">Tu mensaje fue enviado con éxito.</p>}
            {status === 'error' && (
              <p className="text-red-400 mt-3">Ocurrió un problema. {errorMessage || 'Intentá nuevamente.'}</p>
            )}

          </div>
          <div className="text-center relative h-full flex items-center justify-center">
            <LogoBackground />
            <div className="relative z-10">
              <img src={logo} alt="Bytes Creativos Logo" className="w-40 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">Creatividad, estrategia y talento local.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;