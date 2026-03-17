import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './imagenes/logobytes.png';
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';
import AnimatedBanner from './components/AnimatedBanner';
import PaginaPortfolio from './components/pages/PaginaPortfolio';
import bannerEsencia from './imagenes/banner-esencia.jpg';

// --- SCROLL TO TOP AL CAMBIAR DE RUTA ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
const PaginaSoluciones = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const packs = [
    { title: "Auditoría Digital Estratégica", price: 70000, feat: ["Evaluación del negocio online", "Benchmark / análisis rápido de competencia.", "Plan de acción estratégico"] },
    { title: "Asesoría 1:1", price: 70000, feat: ["Videollamada de 40 minutos", "Diagnóstico del perfil", "Calendario de contenido"] },
    { title: "UGC (Creación de contenido)", price: 250000, feat: ["4 reels con audio tendencia", "10 fotos formato stories", "10 fotos formato post vertical"] },
    { title: "ADS en Meta (Publicidad)", price: 150000, feat: ["1 campaña activa", "1 objetivo publicitario", "Reporte simple de resultados"] },
    { title: "Sitios Web", price: 170000, feat: ["Diseño personalizado", "Dominio .com o .com.ar por un año", "Integraciones con medio de pagos y métodos de envío", "Vinculación con redes sociales"] },
    { title: "Automatización Inteligente para tu Negocio", price: 300000, feat: ["Responder consultas de clientes", "Procesar pedidos y organizar información", "Conectar tus herramientas y sistemas"] }
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 min-h-screen">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-[#C8F000] font-black tracking-[0.4em] uppercase text-xs mb-4">Catálogo Oficial</h2>
        <h3 className="text-3xl sm:text-5xl font-black italic text-white uppercase">SOLUCIONES <span className="text-gray-600">BYTES</span></h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {packs.map((p, idx) => (
          <div key={idx} className="bg-[#161616] border-2 border-[#C8F000]/20 rounded-[2rem] p-8 sm:p-10 hover:border-[#C8F000] transition-all group">
            <h4 className="text-xl sm:text-2xl font-bold mb-2 uppercase italic text-white">{p.title}</h4>
            <div className="mb-6 sm:mb-8">
              <div className="text-white text-xs font-mono mb-1 tracking-widest uppercase">Desde</div>
              <div className="text-[#C8F000] text-3xl sm:text-4xl font-black font-mono">${p.price.toLocaleString()}</div>
            </div>
            <ul className="space-y-3 mb-8 sm:mb-10">
              {p.feat.map((f, i) => (
                <li key={i} className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8F000] rounded-full flex-shrink-0"></span> {f}
                </li>
              ))}
            </ul>
            <Link to="/contacto" className="w-full inline-block text-center bg-transparent border-2 border-[#C8F000] py-4 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#C8F000] hover:text-black transition-all text-white">
              SOLICITAR ENTREVISTA
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE DE RECURSOS ---
const PaginaRecursos = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const recursos = [
    { title: "Curso Chatbot Instagram", desc: "Aprendé a automatizar tus DMs con este tutorial paso a paso.", link: "https://youtu.be/tUDPby1jyh8" },
    { title: "GUÍA RÁPIDA PARA CREAR TU FAN PAGE EN FACEBOOK", desc: "PDF descargable con pasos clave para lanzar tu fan page y generar comunidad.", link: "https://drive.google.com/file/d/1ICIiYsS99ke2gAbgqE0SjwtVSNd9var6/view?usp=sharing" },
    { title: "Charla para Feriantes y Emprendedores: Tu Instagram, Tu Local", desc: "Video de capacitación para potenciar tu presencia local en Instagram.", link: "https://youtu.be/MKMjMeIgrAI?si=2Qc5SWh34ktSqlnD" },
    { title: "Introducción a Mercado Pago para emprendedores", desc: "Herramientas para facilitar tus ventas. PDF descargable.", link: "https://drive.google.com/file/d/1i35xtsk8qusGHN-ZP65ApGmqgKKV_pyN/view?usp=sharing" }
  ];
  const [experiencias, setExperiencias] = useState([
    { nombre: "Cris", comentario: "Excelente herramienta para automatizar Instagram.", fecha: "27/02/2026" }
  ]);
  const [nuevaEx, setNuevaEx] = useState({ nombre: "", comentario: "" });
  const agregarExperiencia = (e) => {
    e.preventDefault();
    const hoy = new Date().toLocaleDateString();
    setExperiencias([{ ...nuevaEx, fecha: hoy }, ...experiencias]);
    setNuevaEx({ nombre: "", comentario: "" });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 min-h-screen">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-[#C8F000] font-black tracking-[0.4em] uppercase text-xs mb-4">Librería Bytes</h2>
        <h3 className="text-3xl sm:text-5xl font-black italic text-white uppercase">RECURSOS <span className="text-gray-600">GRATIS</span></h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-24">
        {recursos.map((r, i) => (
          <div key={i} className="bg-[#161616] p-8 sm:p-10 rounded-[2rem] border-2 border-white/5 hover:border-[#C8F000] transition-all text-white">
            <h4 className="text-xl sm:text-2xl font-bold mb-4 uppercase italic">{r.title}</h4>
            <p className="text-gray-500 mb-8 text-sm">{r.desc}</p>
            <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C8F000] text-black px-8 sm:px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition">
              VER RECURSO AHORA
            </a>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto text-white">
        <h3 className="text-2xl sm:text-3xl font-black italic mb-8 uppercase">Tu <span className="text-gray-600">Experiencia</span></h3>
        <form onSubmit={agregarExperiencia} className="bg-[#161616] p-6 sm:p-8 rounded-3xl border border-white/5 mb-12 space-y-4">
          <input type="text" placeholder="Tu Nombre" required className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000]" value={nuevaEx.nombre} onChange={(e) => setNuevaEx({...nuevaEx, nombre: e.target.value})} />
          <textarea placeholder="Contanos tu experiencia..." required className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#C8F000] h-32" value={nuevaEx.comentario} onChange={(e) => setNuevaEx({...nuevaEx, comentario: e.target.value})} />
          <button type="submit" className="bg-[#C8F000] text-black px-8 py-3 rounded-full font-black text-xs uppercase">Publicar Comentario</button>
        </form>
        <div className="space-y-6">
          {experiencias.map((ex, i) => (
            <div key={i} className="border-b border-white/5 pb-6">
              <div className="flex justify-between items-center mb-2 font-mono text-xs uppercase">
                <span className="text-[#C8F000] tracking-widest font-black">{ex.nombre}</span>
                <span className="text-gray-600">{ex.fecha}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic">"{ex.comentario}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE DE CONTACTO ---
const PaginaContacto = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [datos, setDatos] = useState({ nombre: "", apellido: "", email: "", telefono: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [message, setMessage] = useState('');

  const enviar = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${datos.nombre} ${datos.apellido}`,
          email: datos.email,
          phone: datos.telefono,
          message: `Solicitud de entrevista técnica:\nNombre: ${datos.nombre} ${datos.apellido}\nEmail: ${datos.email}\nTeléfono: ${datos.telefono}`
        }),
      });

      const body = await response.text();
      let data = null;
      try { data = body ? JSON.parse(body) : null; } catch (error) { data = null; }

      if (!response.ok) {
        const errMessage = data?.error || body || 'Error en envío';
        throw new Error(errMessage);
      }

      setStatus('success');
      setMessage('Gracias. Tus datos fueron enviados correctamente. Revisá tu correo.');
      setDatos({ nombre: "", apellido: "", email: "", telefono: "" });
    } catch (error) {
      console.error('contacto error', error);
      setStatus('error');
      setMessage(error.message || 'No se pudo enviar. Intentá de nuevo.');
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 min-h-screen text-center">
      <div className="flex justify-center gap-4 sm:gap-8 mb-12 flex-wrap">
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-[#C8F000] transition-all text-center flex-1 min-w-[140px] max-w-[200px]">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-[#C8F000]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
          <h4 className="text-white font-bold mb-2 text-sm">WhatsApp</h4>
          <a href="https://wa.me/+5491144789797" className="text-[#C8F000] hover:underline text-xs">Contactanos</a>
        </div>
        <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-[#C8F000] transition-all text-center flex-1 min-w-[140px] max-w-[200px]">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-[#C8F000]" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          <h4 className="text-white font-bold mb-2 text-sm">Correo</h4>
          <a href="mailto:bytescreativos@gmail.com" className="text-[#C8F000] hover:underline text-xs">Enviar Email</a>
        </div>
      </div>
      <h2 className="text-[#C8F000] font-black tracking-[0.4em] uppercase text-xs mb-4 text-white">Entrevista Estratégica</h2>
      <h3 className="text-3xl sm:text-5xl font-black italic mb-10 sm:mb-12 uppercase text-white">Tus <span className="text-gray-600">Datos</span></h3>
      <form onSubmit={enviar} className="bg-[#161616] p-6 sm:p-10 rounded-[2rem] border border-white/5 space-y-6 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <input type="text" placeholder="Nombre" required className="bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white w-full" value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} />
          <input type="text" placeholder="Apellido" required className="bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white w-full" value={datos.apellido} onChange={(e) => setDatos({...datos, apellido: e.target.value})} />
        </div>
        <input type="email" placeholder="Correo Electrónico" required className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white" value={datos.email} onChange={(e) => setDatos({...datos, email: e.target.value})} />
        <input type="tel" placeholder="Número de Teléfono" required className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white" value={datos.telefono} onChange={(e) => setDatos({...datos, telefono: e.target.value})} />
        <button type="submit" className="w-full bg-[#C8F000] text-black py-5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition">Enviar Solicitud</button>
      </form>

      {status === 'success' && <p className="mt-4 text-green-400 font-bold">{message}</p>}
      {status === 'error' && <p className="mt-4 text-red-400 font-bold">{message}</p>}

    </div>
  );
};

// --- NAVBAR CON HAMBURGUESA ---
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú al navegar
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className="border-b border-white/10 bg-[#0F0F0F]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Bytes Creativos" className="h-[100px] sm:h-[140px] w-auto object-contain py-2" />
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
          <Link to="/" className="hover:text-[#C8F000] transition-colors">Inicio</Link>
          <Link to="/soluciones" className="hover:text-[#C8F000] transition-colors">Soluciones</Link>
          <Link to="/recursos" className="hover:text-[#C8F000] transition-colors">Recursos</Link>
          <Link to="/portfolio" className="hover:text-[#C8F000] transition-colors">Portfolio</Link>
          <Link to="/contacto" className="bg-[#C8F000] text-black px-6 py-2 rounded-full hover:scale-105 transition">Contacto</Link>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-[2px] bg-[#C8F000] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-[#C8F000] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[2px] bg-[#C8F000] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-72 border-t border-white/10' : 'max-h-0'}`}>
        <div className="flex flex-col px-6 py-4 gap-1 bg-[#0F0F0F]">
          <Link to="/" className="py-3 text-sm font-bold uppercase tracking-widest border-b border-white/5 hover:text-[#C8F000] transition-colors">Inicio</Link>
          <Link to="/soluciones" className="py-3 text-sm font-bold uppercase tracking-widest border-b border-white/5 hover:text-[#C8F000] transition-colors">Soluciones</Link>
          <Link to="/recursos" className="py-3 text-sm font-bold uppercase tracking-widest border-b border-white/5 hover:text-[#C8F000] transition-colors">Recursos</Link>
          <Link to="/portfolio" className="py-3 text-sm font-bold uppercase tracking-widest border-b border-white/5 hover:text-[#C8F000] transition-colors">Portfolio</Link>
          <Link to="/contacto" className="mt-3 mb-1 bg-[#C8F000] text-black px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest text-center hover:scale-[1.02] transition">Contacto</Link>
        </div>
      </div>
    </nav>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", content: "¡Hola! Soy la IA de Bytes Creativos. ¿En qué puedo ayudarte hoy?" }]);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.contact-button') && !event.target.closest('.contact-bubbles')) {
        setIsContactOpen(false);
      }
    };
    if (isContactOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isContactOpen]);

  const servicesDetail = [
    { title: "Chatbots IA", desc: "Automatización de ventas y atención 24/7 con inteligencia artificial." },
    { title: "Gestión de Redes", desc: "Estrategia de contenido y crecimiento orgánico de comunidad." },
    { title: "Diseño Web", desc: "Sitios de alto impacto convertidos en máquinas de ventas." },
    { title: "Publicidad ADS", desc: "Campañas en Meta y Google enfocadas en retorno de inversión." },
    { title: "Consultoría", desc: "Asesoramiento estratégico para escalar tu modelo de negocio." }
  ];

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const userMessage = { role: "user", content: userInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages([...newMessages, data]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Error de conexión con el servidor de Bytes." }]);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#C8F000] selection:text-black font-sans">

        {/* SCROLL TO TOP GLOBAL */}
        <ScrollToTop />

        {/* BARRA SUPERIOR */}
        <div className="bg-[#161616] border-b border-white/5 py-2 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            <div className="flex gap-4"></div>
            <div className="flex gap-4"></div>
          </div>
        </div>

        {/* NAVBAR CON HAMBURGUESA */}
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              {/* HERO */}
              <header className="relative h-[380px] sm:h-[500px] flex items-center justify-center overflow-hidden border-b border-[#C8F000]/10">
                <div className="absolute inset-0 z-0">
                  <AnimatedBanner />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F0F0F]"></div>
                </div>
                <div className="relative z-10 text-center px-4 sm:px-6">
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">
                    E-COMMERCE<br/>
                    <span className="text-[#C8F000] drop-shadow-[0_0_20px_rgba(200,240,0,0.4)]">ESTRATÉGICO</span>
                  </h1>
                  <p className="mt-4 sm:mt-6 text-gray-400 max-w-xl mx-auto font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                    Transformamos ideas digitales en negocios reales
                  </p>
                </div>
              </header>

              {/* DETALLE SERVICIOS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
                <h2 className="text-sm font-black tracking-[0.5em] text-[#C8F000] uppercase mb-4">Lo que hacemos</h2>
                <h3 className="text-3xl sm:text-5xl font-black italic uppercase mb-10 sm:mb-16 text-white">EXPERTOS EN <span className="text-gray-600">CRECIMIENTO DIGITAL</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {servicesDetail.map((s, i) => (
                    <div key={i} className="bg-[#161616] p-6 sm:p-8 border border-white/5 rounded-2xl hover:border-[#C8F000]/40 transition-all group text-left">
                      <div className="w-8 h-1 bg-[#C8F000] mb-5 sm:mb-6 group-hover:w-full transition-all"></div>
                      <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 uppercase leading-tight text-white">{s.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ESENCIA */}
              <section className="border-y border-white/5 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 md:h-[340px]">

                  {/* columna izquierda */}
                  <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-8 sm:px-12 py-10 sm:py-0">
                    <h2 className="text-[#C8F000] font-black tracking-[0.35em] uppercase text-[10px] mb-3">
                      Nuestra Esencia
                    </h2>
                    <h3 className="text-2xl sm:text-3xl md:text-3xl font-black uppercase leading-tight mb-4 text-white">
                      Creatividad, estrategia y talento local<br />
                    </h3>
                    <div className="w-8 h-[2px] bg-[#C8F000] mb-4" />
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
                    Somos un equipo de profesionales apasionados por el mundo digital. Cada perfil aporta una mirada estratégica, una especialidad y un talento único, formando un equipo multidisciplinario capaz de desarrollar ideas, estrategias y soluciones digitales que impulsan el crecimiento de las marcas.
                    </p>
                  </div>

                  {/* columna derecha — imagen */}
                  <div className="w-full overflow-hidden h-[200px] md:h-full">
                    <img
                      src={bannerEsencia}
                      alt="Equipo Bytes Creativos"
className="w-full h-full object-contain"
style={{ objectPosition: 'center center' }}
                      loading="lazy"
                    />
                  </div>

                  

                </div>
              </section>

              <CallToAction />
            </>
          } />
          <Route path="/soluciones" element={<PaginaSoluciones />} />
          <Route path="/recursos" element={<PaginaRecursos />} />
          <Route path="/portfolio" element={<PaginaPortfolio />} />
          <Route path="/contacto" element={<PaginaContacto />} />
        </Routes>

        <Footer />

        {/* BOTÓN CHAT IA — ajustado para móvil */}
        <div className="fixed bottom-6 right-4 sm:bottom-10 sm:right-10 z-[9999] flex flex-col items-end gap-4">
          {isChatOpen && (
            <div className="fixed inset-x-3 bottom-24 sm:inset-auto sm:top-1/2 sm:right-10 sm:-translate-y-1/2 sm:w-80 h-[420px] sm:h-[450px] bg-[#161616] border border-[#C8F000]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50">
              <div className="bg-[#C8F000] p-4 text-black font-black flex justify-between items-center text-[10px] uppercase">
                <span>Bytes AI Asistente</span>
                <button onClick={() => setIsChatOpen(false)}>✕</button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[11px] bg-[#0F0F0F]">
                {messages.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                    <span className={`inline-block p-3 rounded-2xl ${m.role === 'user' ? 'bg-[#C8F000] text-black font-bold' : 'bg-white/10 text-gray-300'}`}>
                      {m.content}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-white/10 flex gap-2">
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 text-[10px] outline-none text-white"
                  placeholder="Consulta..."
                />
                <button onClick={handleSendMessage} className="bg-[#C8F000] text-black w-10 h-10 rounded-full font-black flex items-center justify-center hover:scale-105 transition">{">"}</button>
              </div>
            </div>
          )}

          {/* Burbujas de contacto */}
          <div className="contact-bubbles flex flex-col gap-2 mb-4" style={{ perspective: '1000px', opacity: isContactOpen ? 1 : 0, pointerEvents: isContactOpen ? 'auto' : 'none', transition: 'opacity 0.3s ease' }}>
            <div className="relative group" style={isContactOpen ? { transform: 'rotateX(0deg) scale(1)', transition: 'transform 0.5s ease 0s' } : { transform: 'rotateX(90deg) scale(0)', transition: 'transform 0.5s ease 0s' }}>
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full mr-2 bg-[#161616] text-[#C8F000] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">Chatbot</span>
              <button onClick={() => { setIsChatOpen(true); setIsContactOpen(false); }} className="w-11 h-11 sm:w-12 sm:h-12 bg-[#C8F000] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="M 30 15 Q 8 15 8 37 L 8 130 Q 8 152 30 152 L 75 152 L 75 182 Q 75 192 86 185 L 122 152 L 170 152 Q 192 152 192 130 L 192 37 Q 192 15 170 15 Z" fill="none" stroke="black" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
                  <line x1="100" y1="35" x2="100" y2="52" stroke="black" strokeWidth="6" strokeLinecap="round"/>
                  <circle cx="100" cy="30" r="5" fill="black" stroke="black" strokeWidth="6"/>
                  <rect x="52" y="55" width="96" height="80" rx="14" ry="14" fill="none" stroke="black" strokeWidth="6"/>
                  <circle cx="76" cy="85" r="9" fill="none" stroke="black" strokeWidth="6"/>
                  <circle cx="124" cy="85" r="9" fill="none" stroke="black" strokeWidth="6"/>
                  <polygon points="100,96 95,106 105,106" fill="black"/>
                  <rect x="72" y="112" width="56" height="14" rx="5" ry="5" fill="none" stroke="black" strokeWidth="6"/>
                  <line x1="82" y1="112" x2="82" y2="126" stroke="black" strokeWidth="6"/>
                  <line x1="92" y1="112" x2="92" y2="126" stroke="black" strokeWidth="6"/>
                  <line x1="102" y1="112" x2="102" y2="126" stroke="black" strokeWidth="6"/>
                  <line x1="112" y1="112" x2="112" y2="126" stroke="black" strokeWidth="6"/>
                  <line x1="118" y1="112" x2="118" y2="126" stroke="black" strokeWidth="6"/>
                  <rect x="42" y="72" width="12" height="22" rx="4" ry="4" fill="none" stroke="black" strokeWidth="6"/>
                  <rect x="146" y="72" width="12" height="22" rx="4" ry="4" fill="none" stroke="black" strokeWidth="6"/>
                </svg>
              </button>
            </div>
            <div className="relative group" style={isContactOpen ? { transform: 'rotateX(0deg) scale(1)', transition: 'transform 0.5s ease 0.1s' } : { transform: 'rotateX(90deg) scale(0)', transition: 'transform 0.5s ease 0.1s' }}>
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full mr-2 bg-[#161616] text-[#C8F000] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">WhatsApp</span>
              <button onClick={() => window.open('https://wa.me/+5491144789797', '_blank')} className="w-11 h-11 sm:w-12 sm:h-12 bg-[#C8F000] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-all">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              </button>
            </div>
            <div className="relative group" style={isContactOpen ? { transform: 'rotateX(0deg) scale(1)', transition: 'transform 0.5s ease 0.2s' } : { transform: 'rotateX(90deg) scale(0)', transition: 'transform 0.5s ease 0.2s' }}>
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full mr-2 bg-[#161616] text-[#C8F000] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">Correo</span>
              <button onClick={() => window.open('mailto:bytescreativos@gmail.com')} className="w-11 h-11 sm:w-12 sm:h-12 bg-[#C8F000] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-all">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </button>
            </div>
          </div>

          <button onClick={() => setIsContactOpen(!isContactOpen)} className="contact-button w-14 h-14 sm:w-16 sm:h-16 bg-[#C8F000] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-110 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-7 h-7 sm:w-8 sm:h-8">
              <path d="M 30 20 Q 10 20 10 40 L 10 130 Q 10 150 30 150 L 80 150 L 80 180 Q 80 190 90 183 L 125 150 L 170 150 Q 190 150 190 130 L 190 40 Q 190 20 170 20 Z" fill="#161616" stroke="#C8F000" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
              <circle cx="70" cy="88" r="8" fill="#C8F000"/>
              <circle cx="100" cy="88" r="8" fill="#C8F000"/>
              <circle cx="130" cy="88" r="8" fill="#C8F000"/>
            </svg>
          </button>
        </div>

      </div>
    </Router>
  );
}