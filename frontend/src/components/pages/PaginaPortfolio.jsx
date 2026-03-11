import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ─── IMÁGENES EXISTENTES ───────────────────────────────────────────────────
// Carpeta: src/imagenes/portfolio/
import imgEspaciocyd  from "../../imagenes/portfolio/espaciocyd.webp";
import imgJoyasAida   from "../../imagenes/portfolio/joyas-aida.webp";
import imgUtopiaHogar from "../../imagenes/portfolio/utopiahogarok.webp";
import imgMolucass    from "../../imagenes/portfolio/molucass.webp";
import imgInspirarPaz from "../../imagenes/portfolio/inspirarpazhomee.webp";
import imgFloraGuero  from "../../imagenes/portfolio/lic-floraguero.webp";
import imgOratoria    from "../../imagenes/portfolio/oratoria.webp";
import imgHotelMarino from "../../imagenes/portfolio/hotel-marino.webp";
import imgMinisterio  from "../../imagenes/portfolio/ministerio-fuego.webp";
import imgBytesWeb    from "../../imagenes/portfolio/bytes-creativos-web.webp";
import imgAndreaMora  from "../../imagenes/portfolio/andrea-mora-tienda.webp";
import imgMunicipio1  from "../../imagenes/portfolio/municipio-1.webp";
import imgMunicipio2  from "../../imagenes/portfolio/municipio-2.webp";
import imgSeminario1  from "../../imagenes/portfolio/seminario-1.webp";
import imgSeminario2  from "../../imagenes/portfolio/seminario-2.webp";

/* ─── SEO helper ─────────────────────────────────────────────────────────── */
function useSEO() {
  useEffect(() => {
    document.title = "Portfolio · Bytes Creativos | Casos que Convierten — José C. Paz";
    const setMeta = (name, content, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        prop ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", "Portfolio oficial de Bytes Creativos. Casos reales de gestión de redes, campañas META, contenido, páginas web y Bytes Academy en José C. Paz, Buenos Aires.");
    setMeta("keywords", "portfolio marketing digital, bytes creativos, casos de éxito, campañas meta ads, gestión redes sociales, tienda online, José C. Paz");
    setMeta("og:title", "Portfolio · Bytes Creativos", true);
    setMeta("og:description", "Clientes reales, resultados medibles. Gestión de redes, ADS, contenido y páginas web.", true);
    setMeta("og:type", "website", true);
    setMeta("robots", "index, follow");
    return () => { document.title = "Bytes Creativos"; };
  }, []);
}

/* ─── Intersection Observer hook (scroll reveal) ─────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Counter hook ───────────────────────────────────────────────────────── */
function useCounter(target, duration = 1200) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(target * ease));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [ref, val];
}

/* ─── Chip ───────────────────────────────────────────────────────────────── */
const Chip = ({ label, color = "default" }) => {
  const colors = {
    lime:    "border-[#C8F000] text-[#C8F000] bg-[#C8F000]/10",
    purple:  "border-[#8B7EC8] text-[#8B7EC8] bg-[#8B7EC8]/10",
    pink:    "border-[#F0A0D0] text-[#F0A0D0] bg-[#F0A0D0]/10",
    default: "border-white/10 text-gray-500 bg-white/[0.02]",
  };
  return (
    <span className={`inline-block text-[9px] font-bold tracking-[0.12em] uppercase px-[11px] py-1 rounded-full border ${colors[color]}`}>
      {label}
    </span>
  );
};

/* ─── Section wrapper ────────────────────────────────────────────────────── */
const Section = ({ children, id, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`px-[5vw] py-24 border-b border-white/[0.07] transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </section>
  );
};

/* ─── PortfolioImg — imagen local con altura configurable ────────────────── */
const PortfolioImg = ({ src, alt, tall = false, short = false }) => {
  const h = tall ? "h-[280px]" : short ? "h-[150px]" : "h-[220px]";
  return (
    <div className={`relative w-full ${h} bg-[#191919] rounded-xl overflow-hidden border border-dashed border-[#8B7EC8]/40`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-30">
          <span className="text-2xl">🖼️</span>
          <span className="text-[9px] font-bold tracking-widest uppercase text-[#8B7EC8] text-center px-4">{alt}</span>
          <span className="text-[9px] text-gray-600">Imagen pendiente</span>
        </div>
      )}
    </div>
  );
};

/* ─── AdsCard ────────────────────────────────────────────────────────────── */
const AdsCard = ({ titulo, reprod, alcance, conv, tipo = "Mensajes" }) => (
  <div className="bg-[#191919] border border-white/[0.07] rounded-lg p-4">
    <p className="text-[10px] text-gray-500 mb-3 italic">{tipo} · &quot;{titulo}&quot;</p>
    <div className="flex gap-6 flex-wrap">
      <div>
        <div className="font-black text-xl text-white">{reprod}</div>
        <div className="text-[8px] uppercase text-gray-500 tracking-wider">Reproducciones</div>
      </div>
      <div>
        <div className="font-black text-xl text-white">{alcance}</div>
        <div className="text-[8px] uppercase text-gray-500 tracking-wider">Alcance</div>
      </div>
      <div>
        <div className={`font-black text-xl text-[#C8F000]`}>{conv}</div>
        <div className="text-[8px] uppercase text-gray-500 tracking-wider">
          {tipo === "Alcance local" ? "Alcance total" : "Conv. mensajes"}
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════ */
export default function PaginaPortfolio() {
  useSEO();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeId, setActiveId] = useState("clientes");
  useEffect(() => {
    const ids = ["clientes", "ads", "contenido", "web", "comunidad"];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }); },
      { threshold: 0.2 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const navItems = [
    { id: "clientes",  label: "Clientes" },
    { id: "ads",       label: "Publicidad META" },
    { id: "contenido", label: "Contenido" },
    { id: "web",       label: "Páginas Web" },
    { id: "comunidad", label: "Comunidad" },
  ];

  const [rAds, cAds] = useCounter(484);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <header className="relative min-h-[88vh] flex flex-col justify-end px-[5vw] pb-20 pt-32 border-b border-white/[0.07] overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[clamp(90px,19vw,280px)] text-[#8B7EC8]/[0.04] pointer-events-none select-none whitespace-nowrap leading-none uppercase">
          PORTFOLIO
        </span>
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-[#F0A0D0] via-[#8B7EC8] to-transparent" />
        <p className="text-[10px] font-bold tracking-[0.38em] uppercase text-[#F0A0D0] mb-6 animate-[fadeUp_0.7s_0.2s_both]">
          Bytes Creativos — 2025/2026
        </p>
        <div className="flex items-center gap-8 flex-wrap">
          <h1 className="font-black text-[clamp(52px,9.5vw,120px)] leading-[0.9] uppercase animate-[fadeUp_0.8s_0.35s_both]">
            CLIENTES QUE<br />
            <em className="not-italic text-[#C8F000] drop-shadow-[0_0_50px_rgba(200,240,0,0.32)]">CONFIARON.</em>
          </h1>
        </div>
        <p className="mt-8 max-w-[540px] text-gray-500 text-sm leading-relaxed animate-[fadeUp_0.8s_0.5s_both]">
          No mostramos trabajo bonito. Mostramos resultados medibles. Gestión de redes, publicidad en META, creación de contenido, páginas web y formación digital.
        </p>
        <div className="absolute bottom-10 right-[5vw] flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-gray-600 animate-[fadeUp_0.8s_0.8s_both]">
          <div className="w-[50px] h-[1px] bg-gradient-to-r from-[#F0A0D0] to-transparent" />
          Scroll para explorar
        </div>
      </header>

      {/* ── STICKY NAV ── */}
      <nav className="sticky top-[64px] sm:top-[80px] z-40 bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-white/[0.07] flex items-center h-14 px-[5vw] overflow-x-auto gap-0">
        {navItems.map(({ id, label }) => (
          <a key={id} href={`#${id}`}
            onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
            className={`text-[10px] font-bold tracking-[0.18em] uppercase px-5 h-full flex items-center border-r border-white/[0.07] whitespace-nowrap transition-colors ${activeId === id ? "text-[#C8F000]" : "text-gray-500 hover:text-[#8B7EC8]"}`}
          >{label}</a>
        ))}
      </nav>

      {/* ══ SECCIÓN 01 — CLIENTES ══ */}
      <Section id="clientes">
        <div className="relative">
          <span className="absolute right-0 top-0 font-black text-[clamp(80px,13vw,160px)] leading-[0.85] text-[#8B7EC8]/[0.05] pointer-events-none select-none">01</span>
          <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-3">Sección 01 · Gestión & Crecimiento</p>
          <h2 className="font-black text-[clamp(36px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            CLIENTES QUE<br /><span className="text-[#C8F000]">CONFIARON EN NOSOTROS</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[540px] leading-relaxed mt-2 mb-14">
            Gestión de redes sociales, creación de contenido y publicidad en META.
          </p>

          {/* ── @espaciocyd ── */}
          <div className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-3xl uppercase mb-4 leading-tight">@espaciocyd</h3>
              <PortfolioImg src={imgEspaciocyd} alt="Feed Instagram @espaciocyd" tall />
              <div className="flex flex-wrap gap-1.5 mt-5">
                <Chip label="Gestión RRSS" color="lime" /><Chip label="Contenido" /><Chip label="ADS Meta" color="purple" />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#C8F000] mb-4">Resultados de ADS:</p>
              <div className="flex flex-col gap-3">
                <AdsCard titulo="¡Llegamos a todo el país! 🧡🍂…" reprod="8.387" alcance="5.756" conv="201" />
                <AdsCard titulo="Si estás interesada/o en revender nue…" reprod="4.842" alcance="3.308" conv="85" />
                <AdsCard titulo="¡Impulsa tu negocio con nuestros…" reprod="4.976" alcance="3.648" conv="41" />
              </div>
            </div>
          </div>

          {/* ── @joyas.aida ── */}
          <div className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-3xl uppercase mb-4 leading-tight">@joyas.aida</h3>
              <PortfolioImg src={imgJoyasAida} alt="Feed Instagram @joyas.aida" tall />
              <div className="flex flex-wrap gap-1.5 mt-5">
                <Chip label="Joyas" color="pink" /><Chip label="Gestión RRSS" color="lime" /><Chip label="ADS Meta" color="purple" />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#C8F000] mb-4">Resultados de ADS:</p>
              <div className="flex flex-col gap-3">
                <AdsCard titulo="💙 Más que joyas, creamos recuerdos…" reprod="6.967" alcance="3.074" conv="12" />
                <AdsCard titulo="En Aida Joyas tenemos el regalo perfe…" reprod="5.399" alcance="3.109" conv="42" />
              </div>
            </div>
          </div>

          {/* ── @utopiahogarok ── */}
          <div className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-3xl uppercase mb-4 leading-tight">@utopiahogarok</h3>
              <PortfolioImg src={imgUtopiaHogar} alt="Feed Instagram @utopiahogarok" tall />
              <div className="flex flex-wrap gap-1.5 mt-5">
                <Chip label="43.8K reproducciones" color="lime" /><Chip label="ADS Meta" color="purple" /><Chip label="Gestión RRSS" />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#C8F000] mb-4">Resultados de ADS:</p>
              <div className="flex flex-col gap-3">
                <AdsCard titulo="Cuando querés todo fácil y al…" reprod="43.887" alcance="30.188" conv="30.188" tipo="Alcance local" />
                <AdsCard titulo="⚡ ¡Lanzamos la venta mayorista en e…" reprod="7.305" alcance="5.122" conv="149" />
                <AdsCard titulo="¿Querés vender perfumes árabes pero…" reprod="7.830" alcance="5.879" conv="192" />
                <AdsCard titulo="Porque cuando encontrás máquinas d…" reprod="10.576" alcance="6.530" conv="95" />
              </div>
            </div>
          </div>

          {/* ── @molucass_ ── */}
          <div className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-3xl uppercase mb-4 leading-tight">@molucass_</h3>
              <PortfolioImg src={imgMolucass} alt="Feed Instagram @molucass_" tall />
              <div className="flex flex-wrap gap-1.5 mt-5">
                <Chip label="Moda" color="pink" /><Chip label="Gestión RRSS" color="lime" /><Chip label="ADS Meta" color="purple" />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#C8F000] mb-4">Resultados de ADS:</p>
              <div className="flex flex-col gap-3">
                <AdsCard titulo="✨ Encontrá tu estilo y tu talle en un s…" reprod="6.574" alcance="3.355" conv="42" />
                <AdsCard titulo="Prenda infaltable esta temporada🌺 L…" reprod="10.570" alcance="6.658" conv="49" />
                <AdsCard titulo="✨ La moda no tiene límites, y tu estil…" reprod="8.391" alcance="4.712" conv="21" />
              </div>
            </div>
          </div>

          {/* ── @inspirarpazhomee + @lic_floraguero ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5px]">
            {[
              {
                handle: "@inspirarpazhomee",
                src: imgInspirarPaz,
                body: "Gestión de redes sociales y creación de contenido. Productos holísticos artesanales.",
                chips: [["lime","Gestión RRSS"],["default","Contenido"]],
              },
              {
                handle: "@lic_floraguero",
                src: imgFloraGuero,
                body: "Gestión de redes sociales y creación de contenido. Posicionamiento como referente en estética y salud.",
                chips: [["lime","Gestión RRSS"],["default","Contenido"]],
              },
            ].map((c, i) => (
              <article key={i} className="bg-[#121212] border border-white/[0.07] p-10 hover:border-[#8B7EC8] transition-all">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido</p>
                <h3 className="font-black text-2xl uppercase mb-4 leading-tight">{c.handle}</h3>
                <div className="mb-5">
                  <PortfolioImg src={c.src} alt={`Feed ${c.handle}`} />
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-5">{c.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.chips.map(([col, label]) => <Chip key={label} label={label} color={col} />)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <div className="h-[1px] mx-[5vw] opacity-30 bg-gradient-to-r from-[#8B7EC8] to-transparent" />

      {/* ══ SECCIÓN 02 — PUBLICIDAD META ══ */}
      <Section id="ads">
        <div className="relative">
          <span className="absolute right-0 top-0 font-black text-[clamp(80px,13vw,160px)] leading-[0.85] text-[#8B7EC8]/[0.05] pointer-events-none select-none">02</span>
          <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-3">Sección 02 · Publicidad en META</p>
          <h2 className="font-black text-[clamp(36px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            RESULTADOS<br /><span className="text-[#8B7EC8]">REALES DE ADS</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[460px] leading-relaxed mt-2 mb-14">
            Cada peso invertido tiene que retornar. Definimos objetivos, segmentamos y optimizamos campañas orientadas a conversión, no a impresiones.
          </p>

          {/* métricas resumen */}
          <div ref={rAds} className="grid grid-cols-2 sm:grid-cols-4 bg-[#121212] border border-white/[0.07] mb-[1.5px]">
            {[
              { val: "4",       label: "Clientes con ADS",         sub: "Activos · gestión mensual" },
              { val: "43.8K",   label: "Reproducciones top",       sub: "@utopiahogarok · 1 campaña" },
              { val: `+${cAds}`,label: "Conversaciones totales",   sub: "Suma de campañas reales" },
              { val: "ROI",     label: "Foco principal",           sub: "Resultados, no impresiones" },
            ].map((m, i) => (
              <div key={i} className="p-8 border-r border-white/[0.07] last:border-r-0">
                <div className="font-black text-[50px] text-[#C8F000] leading-none drop-shadow-[0_0_34px_rgba(200,240,0,0.32)]">{m.val}</div>
                <div className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-500 mt-1">{m.label}</div>
                <div className="text-[9px] text-[#8B7EC8] italic mt-0.5">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* tabla por cliente */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1.5px] mb-[1.5px]">
            {[
              { name: "@utopiahogarok", reprod: "43.8K", alcance: "30.2K", conv: "192" },
              { name: "@espaciocyd",    reprod: "8.4K",  alcance: "5.8K",  conv: "201" },
              { name: "@joyas.aida",    reprod: "6.9K",  alcance: "3.1K",  conv: "42"  },
              { name: "@molucass_",     reprod: "10.5K", alcance: "6.7K",  conv: "49"  },
            ].map((a, i) => (
              <div key={i} className="bg-[#121212] border border-white/[0.07] p-5 hover:border-[#C8F000] transition-all">
                <div className="text-[9px] font-bold tracking-[0.12em] uppercase text-[#C8F000] mb-3 truncate">{a.name}</div>
                <div className="flex flex-wrap gap-3">
                  {[[a.reprod,"Reprod."],[a.alcance,"Alcance"],[a.conv,"Conv. msg"]].map(([v,l], j) => (
                    <div key={j}>
                      <div className={`font-black text-2xl leading-none ${j===2?"text-[#C8F000]":"text-white"}`}>{v}</div>
                      <div className="text-[8px] tracking-[0.12em] uppercase text-gray-500 mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* cómo acompañamos el crecimiento */}
          <div className="bg-[#121212] border border-white/[0.07] p-12">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#F0A0D0] mb-4">Cómo acompañamos el crecimiento de un negocio digital</p>
            <h3 className="font-black text-3xl uppercase mb-8">EL SISTEMA<br /><span className="text-[#C8F000]">QUE FUNCIONA</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { title: "Alineamiento IG/FB",          desc: "Diagnóstico de perfil (contenido, bio, estética, CTA). Optimización de biografía. Portadas de destacadas. Vincular Facebook con Instagram. Botón WhatsApp Business.",                                                                                warn: "Sin esto, Ads = plata perdida." },
                { title: "Identidad Visual de Marca",   desc: "Manual de marca: logo, paleta de colores, tipografías y elementos. Ejemplos de prototipo de placas para Instagram. Logos en PNG. Videollamada de máx. 30min.",                                                                                    warn: "Sin identidad, el contenido no construye marca y la publicidad pierde impacto." },
                { title: "Creación de Contenido",       desc: "Producción de fotos y videos (reels y piezas para campañas). Contenido alineado a la estrategia y la identidad visual. Material optimizado para redes y publicidad. Entregado en Drive.",                                                        warn: "Sin contenido profesional, no hay atención ni resultados sostenidos." },
                { title: "Gestión de Redes",            desc: "Planificamos y organizamos el contenido mensual. Publicamos y monitoreamos las redes. Aseguramos coherencia entre estrategia, identidad y mensajes. Seguimos métricas básicas.",                                                                 warn: "Sin gestión, las redes se vuelven irregulares y pierden impacto." },
                { title: "Publicidad en META (Ads)",    desc: "Definimos el objetivo publicitario correcto. Creamos la estructura de campañas. Segmentamos al público adecuado. Medimos y optimizamos resultados.",                                                                                             warn: "Sin estrategia, la publicidad solo gasta presupuesto." },
                { title: "Automatización de Mensajes", desc: "Automatizamos respuestas en Instagram y WhatsApp. Creamos flujos básicos de captación y atención. Diseñamos la experiencia del usuario desde el primer mensaje.",                                                                                  warn: "Sin automatización, se pierden consultas y oportunidades de venta." },
              ].map((s, i) => (
                <div key={i} className="bg-[#191919] border border-white/[0.07] rounded-xl p-6 flex flex-col gap-3">
                  <h4 className="font-black text-sm uppercase text-white">{s.title}</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                  <p className="text-[11px] italic text-[#C8F000]">👉 {s.warn}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#C8F000]/5 border border-[#C8F000]/20 rounded-xl p-6">
              <p className="font-black text-lg text-white uppercase">No trabajamos acciones aisladas ni soluciones sueltas.</p>
              <p className="text-gray-400 text-sm mt-1">El objetivo no es <em>"estar en redes"</em>, sino tener un sistema digital que funcione, se mida y crezca con el negocio.</p>
            </div>
          </div>
        </div>
      </Section>

      <div className="h-[1px] mx-[5vw] opacity-30 bg-gradient-to-r from-[#8B7EC8] to-transparent" />

      {/* ══ SECCIÓN 03 — CONTENIDO ══ */}
      <Section id="contenido">
        <div className="relative">
          <span className="absolute right-0 top-0 font-black text-[clamp(80px,13vw,160px)] leading-[0.85] text-[#8B7EC8]/[0.05] pointer-events-none select-none">03</span>
          <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-3">Sección 03 · Creación de Contenido</p>
          <h2 className="font-black text-[clamp(36px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            CONTENIDO &<br /><span className="text-[#F0A0D0]">EXPERIENCIA</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[460px] leading-relaxed mt-2 mb-14">
            UGC para ads, oratoria y presencia digital.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5px]">
            <article className="bg-[#121212] border border-white/[0.07] p-10 hover:border-[#F0A0D0] transition-all">
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Creación de Contenido</p>
              <h3 className="font-black text-2xl uppercase mb-1 leading-tight">@oratoriaelartedeconectar</h3>
              <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-4">Creación de contenido</p>
              <div className="mb-5">
                <PortfolioImg src={imgOratoria} alt="Evento El Arte de Conectar" />
              </div>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-5">Producción de contenido para este espacio de oratoria y comunicación.</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip label="Oratoria" color="pink" /><Chip label="Contenido" />
              </div>
            </article>

            <article className="bg-[#121212] border border-white/[0.07] p-10 hover:border-[#F0A0D0] transition-all">
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Contenido para ADS · META</p>
              <h3 className="font-black text-2xl uppercase mb-1 leading-tight">@hotelmarinovillagesell</h3>
              <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-4">Creación de contenido para ads en Meta</p>
              <div className="mb-5">
                <PortfolioImg src={imgHotelMarino} alt="Hotel Marino Village UGC" />
              </div>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-5">Producción de contenido UGC filmado en locación, orientado a campañas en Meta. Muestra la experiencia real del hotel.</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip label="UGC" color="pink" /><Chip label="Video Locación" /><Chip label="Ads Meta" color="purple" />
              </div>
            </article>
          </div>

          {/* asesoría 1:1 */}
          <div className="bg-[#121212] border border-white/[0.07] p-12 mt-[1.5px] flex items-center justify-between flex-wrap gap-8">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Servicio · Estrategia Personalizada</p>
              <h3 className="font-black text-3xl uppercase leading-tight">ASESORÍA 1:1</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-[400px] mt-3">
                Análisis de tu perfil y situación actual. Estrategia clara para tu objetivo. Un mes de contenido con foco en storytelling. Calendario listo para ejecutar. Videollamada de 40 min de presentación y seguimiento.
              </p>
            </div>
            <a href="https://wa.me/+5491144789797" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C8F000] text-[#0B0B0B] text-[10px] font-black tracking-[0.25em] uppercase px-7 py-4 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(200,240,0,0.32)] whitespace-nowrap">
              Consultar asesoría →
            </a>
          </div>
        </div>
      </Section>

      <div className="h-[1px] mx-[5vw] opacity-30 bg-gradient-to-r from-[#8B7EC8] to-transparent" />

      {/* ══ SECCIÓN 04 — PÁGINAS WEB ══ */}
      <Section id="web">
        <div className="relative">
          <span className="absolute right-0 top-0 font-black text-[clamp(80px,13vw,160px)] leading-[0.85] text-[#8B7EC8]/[0.05] pointer-events-none select-none">04</span>
          <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-3">Sección 04 · Desarrollo Web</p>
          <h2 className="font-black text-[clamp(36px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            PÁGINAS<br /><span className="text-[#C8F000]">WEB</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[460px] leading-relaxed mt-2 mb-14">
            Diseño y desarrollo desde cero. Landing pages, sitios institucionales y tiendas online.
          </p>

          <div className="flex flex-col gap-[1.5px]">
            {[
              {
                tag:   "Landing Page · Institucional",
                title: "MINISTERIO FUEGO SOBRE FUEGO",
                sub:   "HTML & CSS desde cero",
                src:   imgMinisterio,
                body:  "Landing page institucional creada desde cero con HTML y CSS. Presenta la información del ministerio y centraliza el acceso a sus redes y contenidos, con un diseño moderno y adaptable a dispositivos móviles.",
                chips: [["lime","HTML"],["lime","CSS"],["default","Mobile-first"],["default","Institucional"]],
              },
              {
                tag:   "Página Web · Agencia",
                title: "BYTES CREATIVOS",
                sub:   "HTML & CSS · Chat inteligente de ventas",
                src:   imgBytesWeb,
                body:  "Diseño y desarrollo de la web oficial de Bytes Creativos. Presenta los servicios de la agencia y cuenta con un chat inteligente de ventas, pensado para responder consultas, captar clientes y generar contactos de forma automática.",
                chips: [["lime","HTML"],["lime","CSS"],["purple","Chat IA"],["default","E-commerce estratégico"]],
              },
              {
                tag:   "Tienda Online · Indumentaria",
                title: "ANDREA MORA",
                sub:   "Tienda online · Catálogo + Carrito + WhatsApp",
                src:   imgAndreaMora,
                body:  "Diseño y desarrollo de tienda online para marca de indumentaria. Incluye catálogo de productos, categorías, carrito de compras y contacto directo por WhatsApp, optimizada para una experiencia de compra simple desde celular y computadora.",
                chips: [["lime","Tienda Online"],["default","Catálogo"],["default","Carrito"],["default","WhatsApp"],["default","Mobile"]],
              },
            ].map((w, i) => (
              <div key={i} className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">{w.tag}</p>
                  <h3 className="font-black text-3xl uppercase mb-1 leading-tight">{w.title}</h3>
                  <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-5">{w.sub}</p>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-5">{w.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {w.chips.map(([col, label]) => <Chip key={label} label={label} color={col} />)}
                  </div>
                </div>
                <PortfolioImg src={w.src} alt={`Captura ${w.title}`} tall />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="h-[1px] mx-[5vw] opacity-30 bg-gradient-to-r from-[#8B7EC8] to-transparent" />

      {/* ══ SECCIÓN 05 — COMUNIDAD ══ */}
      <section id="comunidad">
        <div className="bg-[#C8F000] px-[5vw] py-20 flex items-center justify-between flex-wrap gap-8">
          <div>
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-black/45 mb-3">Sección 05 · Comunidad & Academy</p>
            <div className="font-black text-[clamp(48px,7vw,88px)] text-[#0B0B0B] leading-[0.9] uppercase">TRABAJOS<br />PARA LA<br />COMUNIDAD</div>
          </div>
          <p className="max-w-[380px] text-[14px] leading-relaxed text-black/55 font-medium">
            Tecnología, formación y eventos para estudiantes, emprendedores y municipios de José C. Paz y la región.
          </p>
        </div>

        {/* Mapeo Municipal */}
        <div className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all">
          <div>
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Tecnología · Municipio José C. Paz</p>
            <h3 className="font-black text-3xl uppercase leading-tight mb-1">PROYECTO DE MAPEO Y CENSO DIGITAL</h3>
            <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-5">Municipio de José C. Paz · Oficina de Cultos</p>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-4">Desarrollo de una solución tecnológica para la Oficina de Cultos:</p>
            <div className="flex flex-col gap-4 mb-5">
              {[
                ["Organización de información",      "Digitalización del registro de cultos del municipio."],
                ["Mejora de procesos",               "Automatización de flujos con Make y N8N."],
                ["Accesibilidad para la comunidad",  "Dashboard en Looker Studio para consulta pública y gestión interna."],
              ].map(([strong, text], i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-white/[0.07] last:border-b-0 last:pb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8B7EC8] flex-shrink-0 mt-1.5" />
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    <strong className="text-white font-semibold">{strong}</strong> — {text}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-gray-400 mb-4">Soluciones integrales utilizando: <span className="text-[#C8F000] font-bold">Make · N8N · Looker Studio</span></p>
            <div className="flex flex-wrap gap-1.5">
              <Chip label="Make" color="lime" /><Chip label="N8N" color="lime" /><Chip label="Looker Studio" color="purple" /><Chip label="Sector Público" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[1.5px]">
            <PortfolioImg src={imgMunicipio1} alt="Presentación Proyecto Municipio JCP - Foto 1" tall />
            <PortfolioImg src={imgMunicipio2} alt="Presentación Proyecto Municipio JCP - Foto 2" tall />
          </div>
        </div>

        {/* Seminario de Oratoria */}
        <div className="bg-[#121212] border border-white/[0.07] p-10 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 hover:border-[#8B7EC8] transition-all mt-[1.5px]">
          <div>
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Evento Comunitario · José C. Paz</p>
            <h3 className="font-black text-3xl uppercase leading-tight mb-1">SEMINARIO DE ORATORIA</h3>
            <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-5">Centro Cultural Soldados de Perón · José C. Paz</p>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
              Evento organizado por Bytes Creativos, dictado por un profesional capacitado en oratoria y comunicación, destinado a estudiantes y vecinos de la comunidad.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Chip label="Evento Bytes" color="lime" /><Chip label="Oratoria" color="purple" /><Chip label="JCP" /><Chip label="Comunidad" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[1.5px]">
            <PortfolioImg src={imgSeminario1} alt="Seminario de Oratoria - Foto grupo" tall />
            <PortfolioImg src={imgSeminario2} alt="Seminario de Oratoria - Team Bytes" tall />
          </div>
        </div>

        {/* CTA Academy */}
        <div className="bg-[#121212] border border-white/[0.07] px-12 py-12 mt-[1.5px] flex items-center justify-between flex-wrap gap-8">
          <div className="font-black text-[clamp(22px,3.2vw,40px)] uppercase leading-tight max-w-[540px]">
            BYTES ACADEMY — <span className="text-[#C8F000]">CAPACITACIÓN</span><br />PARA EMPRESAS Y MUNICIPIOS.
          </div>
          <a href="https://wa.me/+5491144789797" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#C8F000] text-[#0B0B0B] text-[10px] font-black tracking-[0.25em] uppercase px-7 py-4 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(200,240,0,0.32)] whitespace-nowrap">
            Solicitar capacitación →
          </a>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-[5vw] py-24 text-center border-t border-white/[0.07]">
        <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-4">¿Querés ser el próximo caso?</p>
        <h2 className="font-black text-[clamp(32px,6vw,80px)] uppercase leading-none mb-6">
          HABLEMOS DE<br /><span className="text-[#C8F000]">TU NEGOCIO.</span>
        </h2>
        <p className="text-gray-500 text-sm mb-10">Cualquier consulta podés contactarnos. Instagram: <span className="text-[#C8F000] font-bold">@bytescreativoss</span></p>
        <Link to="/contacto"
          className="inline-flex items-center gap-3 bg-[#C8F000] text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.25em] hover:scale-105 hover:shadow-[0_0_40px_rgba(200,240,0,0.3)] transition-all">
          SOLICITAR ENTREVISTA →
        </Link>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}