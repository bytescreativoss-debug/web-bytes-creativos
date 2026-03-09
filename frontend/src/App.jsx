import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './imagenes/logobytes.png';
import Footer from './components/Footer';
import CallToAction from './components/CallToAction';

// --- COMPONENTE DE LA PÁGINA DE SOLUCIONES (SOLO SERVICIOS PAGOS) ---
const PaginaSoluciones = () => {
  const packs = [
    { title: "Auditoría Digital Estratégica", price: 70000, feat: ["Evaluación del negocio online", "Benchmark / análisis rápido de competencia.", "Plan de acción estratégico"] },
    { title: "Asesoria 1:1", price: 70000, feat: ["Videollamada de 40 minutos", "Diagnostico del perfil", "Calendario de contenido"] },
    { title: "UGC (Creación de contenido)", price: 250000, feat: ["4 reels con audio tendencia", "10 fotos formato stories", "10 fotos formato post vertical"] },
    { title: "ADS en Meta (Publicidad)", price: 150000, feat: ["1 campaña activa", "1 objetivo publicitario", "Reporte simple de resultados"] },
    { title: "Sitios Web", price: 170000, feat: ["Diseño personalizado", "Dominio .com o .com.ar por un año", "Integraciones con medio de pagos y metodos de envio", "Vinculación con redes sociales"] },
    { title: "Automatización Inteligente para tu Negocio", price: 300000, feat: ["Responder consultas de clientes", "Procesar pedidos y organizar información", "Conectar tus herramientas y sistemas"] } 
  
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-[#C8F000] font-black tracking-[0.4em] uppercase text-xs mb-4">Catálogo Oficial</h2>
        <h3 className="text-5xl font-black italic text-white uppercase">SOLUCIONES <span className="text-gray-600">BYTES</span></h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packs.map((p, idx) => (
          <div key={idx} className="bg-[#161616] border-2 border-[#C8F000]/20 rounded-[2.5rem] p-10 hover:border-[#C8F000] transition-all group">
            <h4 className="text-2xl font-bold mb-2 uppercase italic text-white">{p.title}</h4>
            <div className="mb-8">
              <div className="text-white text-sm font-mono mb-2">Desde</div>
              <div className="text-[#C8F000] text-4xl font-black font-mono">${p.price.toLocaleString()}</div>
            </div>
            <ul className="space-y-3 mb-10">
              {p.feat.map((f, i) => (
                <li key={i} className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C8F000] rounded-full"></span> {f}
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

// --- COMPONENTE DE RECURSOS (ACCESO DIRECTO + EXPERIENCIAS) ---
const PaginaRecursos = () => {
  const recursos = [
    { title: "Curso Chatbot Instagram", desc: "Aprendé a automatizar tus DMs con este tutorial paso a paso.", link: "https://youtu.be/tUDPby1jyh8" },
    { title: "Diagnóstico Digital", desc: "PDF exclusivo para auditar la presencia online de tu negocio.", link: "#" }
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
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-[#C8F000] font-black tracking-[0.4em] uppercase text-xs mb-4">Librería Bytes</h2>
        <h3 className="text-5xl font-black italic text-white uppercase">RECURSOS <span className="text-gray-600">GRATIS</span></h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {recursos.map((r, i) => (
          <div key={i} className="bg-[#161616] p-10 rounded-[2.5rem] border-2 border-white/5 hover:border-[#C8F000] transition-all text-white">
            <h4 className="text-2xl font-bold mb-4 uppercase italic">{r.title}</h4>
            <p className="text-gray-500 mb-8 text-sm">{r.desc}</p>
            <a href={r.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C8F000] text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition">
              VER RECURSO AHORA
            </a>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-white">
        <h3 className="text-3xl font-black italic mb-8 uppercase">Tu <span className="text-gray-600">Experiencia</span></h3>
        <form onSubmit={agregarExperiencia} className="bg-[#161616] p-8 rounded-3xl border border-white/5 mb-12 space-y-4">
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

// --- COMPONENTE DE CONTACTO (FORMULARIO LEADS) ---
const PaginaContacto = () => {
  const [datos, setDatos] = useState({ nombre: "", apellido: "", email: "", telefono: "" });
  const enviar = (e) => {
    e.preventDefault();
    alert(`¡Gracias ${datos.nombre}! Nos contactaremos a ${datos.email} para coordinar tu entrevista técnica.`);
    setDatos({ nombre: "", apellido: "", email: "", telefono: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 min-h-screen text-center">
      <h2 className="text-[#C8F000] font-black tracking-[0.4em] uppercase text-xs mb-4 text-white">Entrevista Estratégica</h2>
      <h3 className="text-5xl font-black italic mb-12 uppercase text-white">Tus <span className="text-gray-600">Datos</span></h3>
      <form onSubmit={enviar} className="bg-[#161616] p-10 rounded-[2.5rem] border border-white/5 space-y-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Nombre" required className="bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white" value={datos.nombre} onChange={(e) => setDatos({...datos, nombre: e.target.value})} />
          <input type="text" placeholder="Apellido" required className="bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white" value={datos.apellido} onChange={(e) => setDatos({...datos, apellido: e.target.value})} />
        </div>
        <input type="email" placeholder="Correo Electrónico" required className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white" value={datos.email} onChange={(e) => setDatos({...datos, email: e.target.value})} />
        <input type="tel" placeholder="Número de Teléfono" required className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none focus:border-[#C8F000] text-white" value={datos.telefono} onChange={(e) => setDatos({...datos, telefono: e.target.value})} />
        <button type="submit" className="w-full bg-[#C8F000] text-black py-5 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition">Enviar Solicitud</button>
      </form>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", content: "¡Hola! Soy la IA de Bytes Creativos. ¿En qué puedo ayudarte hoy?" }]);

  const servicesDetail = [
    { title: "Chatbots IA", desc: "Automatización de ventas y atención 24/7 con inteligencia artificial." },
    { title: "Gestión de Redes", desc: "Estrategia de contenido y crecimiento orgánico de comunidad." },
    { title: "Diseño Web", desc: "Sitios de alto impacto convertidos en máquinas de ventas." },
    { title: "Publicidad ADS", desc: "Campañas en Meta y Google enfocadas en retorno de inversión." },
    { title: "Consultoría", desc: "Asesoramiento estratégico para escalar tu modelo de negocio." }
  ];

  // Lógica del ChatBot corregida y agregada
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const userMessage = { role: "user", content: userInput };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
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
        
        {/* BARRA DE CONTACTO SUPERIOR */}
        <div className="bg-[#161616] border-b border-white/5 py-2 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            <div className="flex gap-4">
              <span>📍 José C. Paz, Buenos Aires</span>
              <span>✉️ bytescreativoss@gmail.com</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#C8F000]">Instagram</a>
              <a href="#" className="hover:text-[#C8F000]">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* NAVBAR */}
        <nav className="border-b border-white/10 bg-[#0F0F0F]/90 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <Link to="/"><img src={logo} alt="Bytes Creativos" className="h-[170px] w-auto object-contain py-2" /></Link>
            <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest items-center">
              <Link to="/" className="hover:text-[#C8F000]">Inicio</Link>
              <Link to="/soluciones" className="hover:text-[#C8F000]">Soluciones</Link>
              <Link to="/recursos" className="hover:text-[#C8F000]">Recursos</Link>
              <Link to="/contacto" className="bg-[#C8F000] text-black px-6 py-2 rounded-full hover:scale-105 transition">Contacto</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              {/* HERO */}
              <header className="relative h-[500px] flex items-center justify-center overflow-hidden border-b border-[#C8F000]/10">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-30 shadow-inner" alt="Fondo" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0F0F0F]"></div>
                </div>
                <div className="relative z-10 text-center px-6">
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white">E-COMMERCE<br/><span className="text-[#C8F000] drop-shadow-[0_0_20px_rgba(200,240,0,0.4)]">ESTRATÉGICO</span></h1>
                  <p className="mt-6 text-gray-400 max-w-xl mx-auto font-medium tracking-[0.2em] uppercase text-xs">Bits transformados en negocios rentables en José C. Paz.</p>
                </div>
              </header>

              {/* DETALLE SERVICIOS */}
              <section className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h2 className="text-sm font-black tracking-[0.5em] text-[#C8F000] uppercase mb-4">Lo que hacemos</h2>
                <h3 className="text-4xl font-bold mb-16 text-white">Expertos en Crecimiento Digital</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {servicesDetail.map((s, i) => (
                    <div key={i} className="bg-[#161616] p-8 border border-white/5 rounded-2xl hover:border-[#C8F000]/40 transition-all group text-left">
                      <div className="w-8 h-1 bg-[#C8F000] mb-6 group-hover:w-full transition-all"></div>
                      <h4 className="text-lg font-bold mb-4 uppercase leading-tight text-white">{s.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ESENCIA */}
              <section className="relative py-32 overflow-hidden border-y border-white/5 text-white">
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                      <h2 className="text-[#C8F000] font-black tracking-[0.3em] uppercase text-xs mb-4">Nuestra Esencia</h2>
                      <h3 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">Transformamos <br /><span className="text-gray-500">Bits en Negocios</span></h3>
                    </div>
                    <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                      <p>Nacimos con la misión de fusionar la analítica avanzada con el diseño disruptivo.</p>
                      <p>Cada línea de código está pensada para escalar, automatizar y convertir.</p>
                    </div>
                  </div>
                </div>
              </section>
              
              <CallToAction />
            </>
          } />
          <Route path="/soluciones" element={<PaginaSoluciones />} />
          <Route path="/recursos" element={<PaginaRecursos />} />
          <Route path="/contacto" element={<PaginaContacto />} />
        </Routes>

        <Footer />

        {/* BOTÓN CHAT IA ACTUALIZADO */}
        <div className="fixed bottom-10 right-10 z-[9999] flex flex-col items-end gap-4">
          {isChatOpen && (
            <div className="w-80 h-[450px] bg-[#161616] border border-[#C8F000]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4">
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
                <input value={userInput} onChange={(e) => setUserInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 text-[10px] outline-none text-white" placeholder="Consulta..." />
                <button onClick={handleSendMessage} className="bg-[#C8F000] text-black w-10 h-10 rounded-full font-black flex items-center justify-center hover:scale-105 transition">{">"}</button>
              </div>
            </div>
          )}
          <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-[#C8F000] rounded-full flex items-center justify-center text-black text-2xl shadow-xl hover:scale-110 transition-all">{isChatOpen ? "✕" : "💬"}</button>
        </div>
      </div>
    </Router>
  );
}