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
import imgMinisterio  from "../../imagenes/portfolio/ministerio-fuego.webp";
import imgBytesWeb    from "../../imagenes/portfolio/bytes-creativos-web.webp";
import imgAndreaMora  from "../../imagenes/portfolio/andrea-mora-tienda.webp";
import imgMunicipio1  from "../../imagenes/portfolio/municipio-1.webp";
import imgMunicipio2  from "../../imagenes/portfolio/municipio-2.webp";
import imgSeminario1  from "../../imagenes/portfolio/seminario-1.webp";
import imgSeminario2  from "../../imagenes/portfolio/seminario-2.webp";
import imgTuce1       from "../../imagenes/portfolio/tuce-chatbot-1.webp";
import imgTuce2       from "../../imagenes/portfolio/tuce-chatbot-2.webp";
import imgAcademy1    from "../../imagenes/portfolio/academy-1.webp";
import imgAcademy2    from "../../imagenes/portfolio/academy-2.webp";
import imgRenatta     from "../../imagenes/portfolio/renatta.webp";
import imgCrizanStats  from "../../imagenes/portfolio/crizan-stats.webp";
import imgCrizanPerfil from "../../imagenes/portfolio/crizan-perfil.webp";
import imgLogoBC      from "../../imagenes/logobytes-ico.ico";

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
      className={`px-[4vw] py-12 md:py-24 border-b border-white/[0.07] transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </section>
  );
};

/* ─── PortfolioImg — imagen local con altura configurable ────────────────── */
const PortfolioImg = ({ src, alt, tall = false, short = false }) => {
  const desktopH = tall ? "md:h-[280px]" : short ? "md:h-[150px]" : "md:h-[220px]";
  return (
    <div className={`relative w-full ${desktopH} bg-[#191919] rounded-xl overflow-hidden border border-dashed border-[#8B7EC8]/40`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-auto md:h-full md:object-cover block" />
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

/* ─── DonutChart — gráfico de torta SVG animado ──────────────────────────── */
const DonutChart = ({ pct, label, color = "#C8F000", size = 80 }) => {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#2a2a2a" strokeWidth="10" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="44" textAnchor="middle" fill="white" fontSize="13" fontWeight="900">{pct}%</text>
      </svg>
      <span className="text-[9px] uppercase tracking-[0.12em] text-gray-500 text-center leading-tight max-w-[70px]">{label}</span>
    </div>
  );
};

/* ─── BarRow — barra horizontal de estadística ───────────────────────────── */
const BarRow = ({ label, pct, value, color = "#C8F000" }) => (
  <div className="flex flex-col gap-1 mb-3 last:mb-0">
    <div className="flex justify-between items-baseline">
      <span className="text-[10px] text-gray-400 font-semibold">{label}</span>
      <span className="text-[10px] font-black text-white">{value}</span>
    </div>
    <div className="w-full h-[5px] bg-[#2a2a2a] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  </div>
);

/* ─── TuceBot — robot animado TUCE ──────────────────────────────────────── */
const TuceBot = ({ size = 64, className = "" }) => (
  <svg
    width={size}
    height={Math.round(size * 1.3)}
    viewBox="0 0 100 130"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", overflow: "visible" }}
  >
    <style>{`
      .tb-wave { transform-origin: 78px 63px; animation: tb-wave 1s ease-in-out infinite; }
      @keyframes tb-wave {
        0%,100% { transform: rotate(-130deg); }
        50%     { transform: rotate(-150deg); }
      }
    `}</style>
    <g>
      <line x1="50" y1="17" x2="50" y2="7" stroke="#E8920A" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="50" cy="5" r="4" fill="#F5C842"/>
      <rect x="27" y="17" width="46" height="35" rx="11" fill="#F5A623"/>
      <rect x="29" y="19" width="42" height="18" rx="8" fill="#FFCC66" opacity="0.35"/>
      <path d="M35 34 Q39 29 43 34" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M57 34 Q61 29 65 34" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="34" cy="40" rx="5" ry="3" fill="#FF9040" opacity="0.45"/>
      <ellipse cx="66" cy="40" rx="5" ry="3" fill="#FF9040" opacity="0.45"/>
      <path d="M40 43 Q50 50 60 43" stroke="#C07010" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <rect x="43" y="52" width="14" height="8" rx="4" fill="#E8920A"/>
      <rect x="22" y="59" width="56" height="40" rx="11" fill="#F5A623"/>
      <rect x="24" y="61" width="52" height="18" rx="8" fill="#FFCC66" opacity="0.25"/>
      <rect x="34" y="65" width="32" height="20" rx="6" fill="#E08010"/>
      <circle cx="43" cy="75" r="5" fill="#F5C842"/>
      <circle cx="57" cy="75" r="5" fill="#C8F000"/>
      <rect x="38" y="81" width="24" height="3" rx="1.5" fill="#C07010"/>
      <rect x="8"  y="61" width="14" height="30" rx="7" fill="#F5A623"/>
      <ellipse cx="15" cy="93" rx="7" ry="6" fill="#E8920A"/>
      <g className="tb-wave">
        <rect x="71" y="63" width="14" height="30" rx="7" fill="#F5A623"/>
        <ellipse cx="78" cy="95" rx="7" ry="6" fill="#E8920A"/>
        <ellipse cx="75" cy="87" rx="4" ry="5.5" fill="#F8B84E"/>
        <ellipse cx="81" cy="86" rx="3.5" ry="5" fill="#F8B84E"/>
      </g>
      <rect x="30" y="97" width="15" height="24" rx="7" fill="#E8920A"/>
      <rect x="55" y="97" width="15" height="24" rx="7" fill="#E8920A"/>
      <ellipse cx="37" cy="122" rx="10" ry="5.5" fill="#C87010"/>
      <ellipse cx="63" cy="122" rx="10" ry="5.5" fill="#C87010"/>
    </g>
  </svg>
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
      <header className="relative min-h-[88vh] flex flex-col justify-end px-[4vw] pb-14 md:pb-20 pt-24 md:pt-32 border-b border-white/[0.07] overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[clamp(90px,19vw,280px)] text-[#8B7EC8]/[0.04] pointer-events-none select-none whitespace-nowrap leading-none uppercase">
          PORTFOLIO
        </span>
        <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-[#F0A0D0] via-[#8B7EC8] to-transparent" />
        <p className="text-[10px] font-bold tracking-[0.38em] uppercase text-[#F0A0D0] mb-6 animate-[fadeUp_0.7s_0.2s_both]">
          Bytes Creativos — 2025/2026
        </p>
        <div className="flex items-center gap-8 flex-wrap">
          <h1 className="font-black text-[clamp(36px,9.5vw,120px)] leading-[0.9] uppercase animate-[fadeUp_0.8s_0.35s_both]">
            CASOS QUE<br />
            <em className="not-italic text-[#C8F000] drop-shadow-[0_0_50px_rgba(200,240,0,0.32)]">CONVIERTEN.</em>
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
          <h2 className="font-black text-[clamp(26px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            CLIENTES QUE<br /><span className="text-[#C8F000]">CONFIARON EN NOSOTROS</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[540px] leading-relaxed mt-2 mb-14">
            Gestión de redes sociales, creación de contenido y publicidad en META.
          </p>

          {/* ── @espaciocyd ── */}
          <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-xl md:text-3xl uppercase mb-4 leading-tight break-words">@espaciocyd</h3>
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
          <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-xl md:text-3xl uppercase mb-4 leading-tight break-words">@joyas.aida</h3>
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
          <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-xl md:text-3xl uppercase mb-4 leading-tight break-words">@utopiahogarok</h3>
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
          <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all mb-[1.5px]">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido · ADS Meta</p>
              <h3 className="font-black text-xl md:text-3xl uppercase mb-4 leading-tight break-words">@molucass_</h3>
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
              <article key={i} className="bg-[#121212] border border-white/[0.07] p-5 md:p-10 hover:border-[#8B7EC8] transition-all">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Gestión · Contenido</p>
                <h3 className="font-black text-lg md:text-2xl uppercase mb-4 leading-tight break-words">{c.handle}</h3>
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
          <h2 className="font-black text-[clamp(26px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            RESULTADOS<br /><span className="text-[#8B7EC8]">REALES DE ADS</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[460px] leading-relaxed mt-2 mb-14">
            Cada peso invertido tiene que retornar. Definimos objetivos, segmentamos y optimizamos campañas orientadas a conversión, no a impresiones.
          </p>

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
          <h2 className="font-black text-[clamp(26px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
            CONTENIDO &<br /><span className="text-[#F0A0D0]">EXPERIENCIA</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[460px] leading-relaxed mt-2 mb-14">
            UGC para ads, oratoria y presencia digital.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5px]">
            <article className="bg-[#121212] border border-white/[0.07] p-5 md:p-10 hover:border-[#F0A0D0] transition-all">
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Creación de Contenido</p>
              <h3 className="font-black text-lg md:text-2xl uppercase mb-1 leading-tight break-words">@oratoriaelartedeconectar</h3>
              <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-4">Creación de contenido</p>
              <div className="mb-5">
                <PortfolioImg src={imgOratoria} alt="Evento El Arte de Conectar" />
              </div>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-5">Producción de contenido para este espacio de oratoria y comunicación.</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip label="Oratoria" color="pink" /><Chip label="Contenido" color="white"/>
              </div>
            </article>

            {/* ── @hotelmarinovillagesell — marco celular con video inline ── */}
               <article
                className="bg-[#121212] border border-white/[0.07] p-5 md:p-10 hover:border-[#F0A0D0] transition-all"
                ref={(el) => {
                if (!el) return;
                const obs = new IntersectionObserver(
                ([entry]) => {
                const v = document.getElementById("ig-video-hotel");
                if (v && !entry.isIntersecting) { v.pause(); }
                 },
                 { threshold: 0.1 }
                              );
                              obs.observe(el);
                          }}
                        >             
         <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Contenido para ADS · META</p>
              <h3 className="font-black text-lg md:text-2xl uppercase mb-1 leading-tight break-words">@hotelmarinovillagesell</h3>
              <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-4">Creación de contenido para ads en Meta</p>

              {/* Marco celular simulando Instagram */}
              <div className="mb-5 flex justify-center">
                <div style={{ position: "relative", width: "220px" }}>
                  <div style={{
                    background: "#1a1a1a",
                    borderRadius: "38px",
                    padding: "12px 8px 18px",
                    boxShadow: "0 0 0 2px #444, inset 0 0 0 1px #333",
                    position: "relative",
                  }}>
                    {/* Botones laterales */}
                    <div style={{ position: "absolute", right: "-4px", top: "70px", width: "4px", height: "40px", background: "#333", borderRadius: "0 3px 3px 0" }} />
                    <div style={{ position: "absolute", left: "-4px", top: "60px", width: "4px", height: "26px", background: "#333", borderRadius: "3px 0 0 3px" }} />
                    <div style={{ position: "absolute", left: "-4px", top: "94px", width: "4px", height: "26px", background: "#333", borderRadius: "3px 0 0 3px" }} />

                    {/* Pantalla */}
                    <div style={{ background: "#000", borderRadius: "26px", overflow: "hidden" }}>

                      {/* Status bar */}
                      <div style={{ background: "#000", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px 5px", fontSize: "10px", color: "white", fontWeight: 600 }}>
                        <span>9:41</span>
                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                          <svg width="14" height="10" viewBox="0 0 16 11" fill="white"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4.5" y="4.5" width="3" height="6.5" rx="0.5"/><rect x="9" y="2" width="3" height="9" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="11" rx="0.5"/></svg>
                          <svg width="20" height="10" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="white" strokeOpacity="0.4"/><rect x="2" y="2" width="14" height="7" rx="1.5" fill="white"/></svg>
                        </div>
                      </div>

                      {/* Header Instagram */}
                      <div style={{ background: "#000", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "3px 12px 7px", borderBottom: "0.5px solid #222" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          {/* Avatar con logo real de Bytes */}
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", padding: "2px", flexShrink: 0 }}>
                            <img
                              src={imgLogoBC}
                              alt="Bytes Creativos"
                              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", display: "block" }}
                            />
                          </div>
                          <div>
                            <div style={{ fontSize: "10px", fontWeight: 700, color: "white", lineHeight: 1.2 }}>bytescreativoss</div>
                            <div style={{ fontSize: "8px", color: "#aaa" }}>Bytes Creativos</div>
                          </div>
                        </div>
                        <div style={{ fontSize: "8px", fontWeight: 700, color: "white", border: "1px solid #444", borderRadius: "6px", padding: "2px 7px" }}>Siguiendo</div>
                      </div>

                      {/* Área de video */}
                      <div style={{ position: "relative", width: "100%", aspectRatio: "9/14", background: "#000", overflow: "hidden" }}>
                   <video
                      id="ig-video-hotel"
                      src="/videos/hotel-marino-reel.mp4"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "pointer" }}
                      playsInline
                      loop
                      preload="none"
                      onClick={(e) => {
                      const v = e.currentTarget;
                      if (v.paused) { v.play(); } else { v.pause(); }
                       }}
                      />
                        {/* Overlay play */}
                        <div
                          id="play-overlay-hotel"
                          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)", cursor: "pointer" }}
                          onClick={() => {
                            document.getElementById("ig-video-hotel").play();
                            document.getElementById("play-overlay-hotel").style.display = "none";
                          }}
                        >
                          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="18" viewBox="0 0 18 20" fill="white"><path d="M1 1 L17 10 L1 19 Z"/></svg>
                          </div>
                        </div>

                        {/* Sidebar acciones */}
                        <div style={{ position: "absolute", right: "8px", bottom: "50px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                            <span style={{ color: "white", fontSize: "8px" }}>1.2K</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            <span style={{ color: "white", fontSize: "8px" }}>48</span>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            <span style={{ color: "white", fontSize: "8px" }}>Enviar</span>
                          </div>
                        </div>

                        {/* Caption */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: "32px", padding: "6px 8px", background: "linear-gradient(transparent,rgba(0,0,0,0.7))" }}>
                          <div style={{ fontSize: "8px", fontWeight: 700, color: "white" }}>bytescreativoss</div>
                          <div style={{ fontSize: "7.5px", color: "#eee", lineHeight: 1.3, marginTop: "1px" }}>UGC filmado en locación 🎬 Hotel Marino Village</div>
                        </div>
                      </div>

                      {/* Nav bar Instagram */}
                      <div style={{ background: "#000", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "8px 0 12px", borderTop: "0.5px solid #222" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#333", border: "1.5px solid white" }} />
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-500 text-[13px] leading-relaxed mb-5">Producción de contenido UGC filmado en locación, orientado a campañas en Meta. Muestra la experiencia real del hotel.</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip label="UGC" color="pink" /><Chip label="Video Locación" /><Chip label="Ads Meta" color="purple" />
              </div>
            </article>
          </div>

          {/* asesoría 1:1 */}
          <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 mt-[1.5px] flex items-center justify-between flex-wrap gap-8">
            <div>
              <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Servicio · Estrategia Personalizada</p>
              <h3 className="font-black text-xl md:text-3xl uppercase leading-tight">ASESORÍA 1:1</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed max-w-[400px] mt-3">
                Análisis de tu perfil y situación actual. Estrategia clara para tu objetivo. Un mes de contenido con foco en storytelling. Calendario listo para ejecutar. Videollamada de 40 min de presentación y seguimiento.
              </p>
            </div>
            <a href="https://wa.me/+5491144789797" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#C8F000] text-[#0B0B0B] text-[10px] font-black tracking-[0.25em] uppercase px-7 py-4 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(200,240,0,0.32)] whitespace-nowrap">
              Consultar asesoría →
            </a>
          </div>

          {/* ══ @crizan.ok — Coach de Calistenia ══ */}
          <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 mt-[1.5px] hover:border-[#C8F000]/40 transition-all">
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">
              Caso de Éxito · Creación de Contenido Orgánico
            </p>
            <h3 className="font-black text-lg md:text-3xl uppercase leading-tight mb-1 break-words">
              @crizan.ok
            </h3>
            <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-6">
              Cristian Ozán · Coach de Calistenia &amp; Street Workout
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8">
              <div>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-5">
                  Entrenador personal especializado en Calistenia y Street Workout. Creación de contenido
                  orientado a posicionamiento orgánico, captación de alumnos y asesorías personalizadas.
                  Un reel orgánico alcanzó{" "}
                  <span className="text-white font-bold">30.599 visualizaciones</span> con el 91,9%
                  llegando a personas que no lo seguían — sin inversión en publicidad. El perfil acumuló{" "}
                  <span className="text-white font-bold">90.8K visualizaciones en los últimos 30 días</span>.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  <Chip label="Calistenia" color="lime" />
                  <Chip label="Creación de Contenido" color="purple" />
                  <Chip label="Reels Orgánicos" color="pink" />
                </div>
                <div className="bg-[#0B0B0B] border border-[#C8F000]/20 rounded-xl p-5 mb-5">
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C8F000] mb-3">
                    Reel orgánico destacado · &quot;Un round más&quot;
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { val: "30.6K", label: "Visualizaciones", highlight: true },
                      { val: "2.5K",  label: "Likes",           highlight: false },
                      { val: "488",   label: "Compartidos",     highlight: false },
                      { val: "410",   label: "Guardados",       highlight: false },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className={`font-black text-2xl leading-none ${s.highlight ? "text-[#C8F000]" : "text-white"}`}>{s.val}</div>
                        <div className="text-[8px] uppercase tracking-[0.12em] text-gray-500 mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/[0.07]">
                    <p className="text-[10px] text-gray-500 italic">
                      Tiempo de reproducción total: <span className="text-white">2 d 10 h 22 min</span> · Interacciones: <span className="text-[#C8F000]">3.536</span>
                    </p>
                  </div>
                </div>
                <div className="bg-[#0B0B0B] border border-white/[0.07] rounded-xl p-5">
                  <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#8B7EC8] mb-4">
                    Distribución de views · 28 jun – 19 jul
                  </p>
                  <BarRow label="Historias"     pct={70} value="70.3%" color="#F0A0D0" />
                  <BarRow label="Publicaciones" pct={16} value="16.1%" color="#8B7EC8" />
                  <BarRow label="Reels"         pct={14} value="13.6%" color="#C8F000" />
                  <div className="mt-4 pt-4 border-t border-white/[0.07] grid grid-cols-3 gap-3">
                    {[
                      { val: "7.441",  label: "Views totales",      color: "text-white" },
                      { val: "1.117",  label: "Cuentas alcanzadas", color: "text-[#C8F000]" },
                      { val: "+270%",  label: "Visitas al perfil",   color: "text-[#F0A0D0]" },
                    ].map((m, i) => (
                      <div key={i} className="text-center">
                        <div className={`font-black text-lg leading-none ${m.color}`}>{m.val}</div>
                        <div className="text-[8px] uppercase text-gray-500 tracking-wider mt-0.5 leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#C8F000] mb-1.5">
                    Estadísticas reel · visualizaciones orgánicas
                  </p>
                  <PortfolioImg src={imgCrizanStats} alt="Stats reel @crizan.ok - 30.599 visualizaciones" tall />
                </div>
                <div>
                  <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#8B7EC8] mb-1.5">
                    Panel profesional · últimos 30 días
                  </p>
                  <PortfolioImg src={imgCrizanPerfil} alt="Perfil @crizan.ok - Panel profesional 90.8K" tall />
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#F0A0D0] mb-5">
                Origen de views · Reel &quot;Un round más&quot; — 30.599 visualizaciones orgánicas
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <DonutChart pct={91.9} label="No seguidores" color="#C8F000" size={90} />
                <DonutChart pct={8.1}  label="Seguidores"    color="#8B7EC8" size={90} />
                <div className="flex-1 min-w-[180px]">
                  <p className="text-[12px] text-gray-500 leading-relaxed">
                    El <span className="text-[#C8F000] font-bold">91,9%</span> de las visualizaciones
                    llegó a personas que <em>no</em> seguían la cuenta — señal clara de alcance
                    orgánico real y potencial de captación de nuevos alumnos sin invertir en publicidad.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Chip label="100% orgánico · $0 en ads" color="lime" />
                    <Chip label="91.9% nuevas cuentas" color="purple" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Section>

      <div className="h-[1px] mx-[5vw] opacity-30 bg-gradient-to-r from-[#8B7EC8] to-transparent" />

      {/* ══ SECCIÓN 04 — PÁGINAS WEB ══ */}
      <Section id="web">
        <div className="relative">
          <span className="absolute right-0 top-0 font-black text-[clamp(80px,13vw,160px)] leading-[0.85] text-[#8B7EC8]/[0.05] pointer-events-none select-none">04</span>
          <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-3">Sección 04 · Desarrollo Web</p>
          <h2 className="font-black text-[clamp(26px,5.5vw,72px)] uppercase leading-none mb-1 text-white">
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
                tag:   "E-commerce · Tienda Online",
                title: "RENATTA BSAS LENCERÍA",
                sub:   "Tienda online para cliente",
                src:   imgRenatta,
                body:  "Tienda online desarrollada para una marca de lencería femenina. Incluye catálogo de productos con imágenes y variantes, organización por categorías y un proceso de compra simple. El sitio está optimizado para una navegación clara desde celular y computadora, facilitando la visualización de productos y el contacto directo con el negocio.",
                chips: [["lime","E-commerce"],["lime","Empretienda"],["default","Mobile-first"],["default","Catálogo"]],
              },
              {
                tag:   "Página Web · Agencia",
                title: "BYTES CREATIVOS",
                sub:   "HTML & CSS · Chat inteligente de ventas",
                src:   imgBytesWeb,
                body:  "Diseño y desarrollo de la web oficial de Bytes Creativos. Presenta los servicios de la agencia y cuenta con un chat inteligente de ventas, pensado para responder consultas, captar clientes y generar contactos de forma automática.",
                chips: [["lime","HTML"],["pink","Tailwindcss"],["purple","Chat IA"],["black","Nodejs"],["blue","REACT"]],
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
              <div key={i} className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all">
                <div>
                  <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">{w.tag}</p>
                  <h3 className="font-black text-lg md:text-3xl uppercase mb-1 leading-tight break-words">{w.title}</h3>
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
            <div className="font-black text-[clamp(32px,7vw,88px)] text-[#0B0B0B] leading-[0.9] uppercase">TRABAJOS<br />PARA LA<br />COMUNIDAD</div>
          </div>
          <p className="max-w-[380px] text-[14px] leading-relaxed text-black/55 font-medium">
            Tecnología, formación y eventos para estudiantes, emprendedores y municipios de José C. Paz y la región.
          </p>
        </div>

        {/* Mapeo Municipal */}
        <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all">
          <div>
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Tecnología · Municipio José C. Paz</p>
            <h3 className="font-black text-lg md:text-3xl uppercase leading-tight mb-1 break-words">PROYECTO DE MAPEO Y CENSO DIGITAL</h3>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-[1.5px]">
            <PortfolioImg src={imgMunicipio1} alt="Presentación Proyecto Municipio JCP - Foto 1" tall />
            <PortfolioImg src={imgMunicipio2} alt="Presentación Proyecto Municipio JCP - Foto 2" tall />
          </div>
        </div>

        {/* Seminario de Oratoria */}
        <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 hover:border-[#8B7EC8] transition-all mt-[1.5px]">
          <div>
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Evento Comunitario · José C. Paz</p>
            <h3 className="font-black text-lg md:text-3xl uppercase leading-tight mb-1 break-words">SEMINARIO DE ORATORIA</h3>
            <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-5">Centro Cultural Soldados de Perón · José C. Paz</p>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-6">
              Evento organizado por Bytes Creativos, dictado por un profesional capacitado en oratoria y comunicación, destinado a estudiantes y vecinos de la comunidad.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Chip label="Evento Bytes" color="lime" /><Chip label="Oratoria" color="purple" /><Chip label="JCP" /><Chip label="Comunidad" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-[1.5px]">
            <PortfolioImg src={imgSeminario1} alt="Seminario de Oratoria - Foto grupo" tall />
            <PortfolioImg src={imgSeminario2} alt="Seminario de Oratoria - Team Bytes" tall />
          </div>
        </div>

        {/* Chatbot TUCE */}
        <div className="bg-[#121212] border border-white/[0.07] p-5 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 hover:border-[#8B7EC8] transition-all mt-[1.5px]">
          <div>
            <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#F0A0D0] mb-2">Tecnología · Phyton · Comunidad Estudiantil</p>
            <h3 className="font-black text-lg md:text-3xl uppercase leading-tight mb-1 break-words">CHATBOT TUCE</h3>
            <p className="text-[11px] font-bold italic text-[#8B7EC8] mb-5">Tecnicatura en Comercio Electrónico · UNPAZ</p>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-5">
              Chatbot informativo desarrollado para la comunidad de la Tecnicatura en Comercio Electrónico (UNPAZ). Permite a los estudiantes consultar de forma rápida horarios de materias, aulas, sedes, calendario académico y accesos a gestión de alumnos a través de un menú interactivo en Telegram, facilitando el acceso a información académica desde el celular.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Chip label="Telegram Bot" color="lime" />
              <Chip label="Automatización" color="purple" />
              <Chip label="Phyton" color="pink" />
              <Chip label="UNPAZ" color="white" />
              <Chip label="Comunidad estudiantil" />
            </div>
          </div>

          <div className="flex justify-center items-end gap-2 md:gap-4">
            <div className="flex-shrink-0 self-end">
              <TuceBot size={76} className="block md:hidden" />
            </div>
            <div className="relative flex-1 max-w-[130px] md:max-w-[160px]">
              <div className="relative w-full" style={{ paddingBottom: "210%" }}>
                <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-[#2a2a2a] bg-[#111] shadow-[0_0_0_2px_#444,0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
                  <div className="absolute right-[-8px] top-[20%] w-[4px] h-[40px] bg-[#2a2a2a] rounded-r-sm" />
                  <div className="absolute left-[-8px] top-[18%] w-[4px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute left-[-8px] top-[28%] w-[4px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center">
                    {imgTuce1 ? (
                      <img src={imgTuce1} alt="Chatbot TUCE - Menú principal" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-40 px-3">
                        <span className="text-2xl">📱</span>
                        <span className="text-[8px] text-[#8B7EC8] font-bold tracking-widest uppercase text-center">Menú principal</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex-1 max-w-[130px] md:max-w-[160px]">
              <div className="relative w-full" style={{ paddingBottom: "210%" }}>
                <div className="absolute inset-0 rounded-[2.2rem] border-[6px] border-[#2a2a2a] bg-[#111] shadow-[0_0_0_2px_#444,0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
                  <div className="absolute right-[-8px] top-[20%] w-[4px] h-[40px] bg-[#2a2a2a] rounded-r-sm" />
                  <div className="absolute left-[-8px] top-[18%] w-[4px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute left-[-8px] top-[28%] w-[4px] h-[28px] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute inset-0 bg-[#0f172a] flex items-center justify-center">
                    {imgTuce2 ? (
                      <img src={imgTuce2} alt="Chatbot TUCE - Consulta horarios" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 opacity-40 px-3">
                        <span className="text-2xl">📱</span>
                        <span className="text-[8px] text-[#8B7EC8] font-bold tracking-widest uppercase text-center">Consulta horarios</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bytes Academy */}
        <div className="mt-[1.5px]">
          <div className="bg-white px-5 py-10 md:px-12 md:py-14">
            <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#8B7EC8] mb-3">Sección · Formación Digital</p>
            <h3 className="font-black text-[clamp(28px,5vw,64px)] uppercase leading-none mb-4 text-[#0F0F0F]">
              BYTES<br /><span className="text-[#8B7EC8]">ACADEMY</span>
            </h3>
            <p className="text-[#0F0F0F]/60 text-sm max-w-[520px] leading-relaxed">
              Capacitaciones y talleres de marketing digital, redes sociales y herramientas de automatización para equipos de empresas, municipios y emprendedores.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px]">
            {[
              { icon: "", title: "Redes Sociales para Negocios",   desc: "Taller práctico para emprendedores y equipos. Creación de contenido, estrategia de publicación, uso de Instagram y Facebook para vender más.",              chip: ["lime",    "Taller presencial / online"] },
              { icon: "", title: "Automatización con Make y N8N",  desc: "Aprendé a automatizar tareas repetitivas: respuestas automáticas, captación de leads y flujos de trabajo sin código.",                                          chip: ["purple",  "Herramientas sin código"] },
              { icon: "", title: "Publicidad en META desde cero",  desc: "Curso intensivo de Meta Ads: objetivos de campaña, segmentación, creación de anuncios y lectura de métricas reales.",                                            chip: ["lime",    "Meta Ads"] },
              { icon: "", title: "Chatbots e IA para Negocios",    desc: "Creación de chatbots en Telegram, Instagram y WhatsApp para atención automática, consultas frecuentes y captación de clientes.",                               chip: ["purple",  "Telegram · WhatsApp · IG"] },
              { icon: "", title: "Presencia Digital Integral",     desc: "Capacitación completa: identidad de marca, web, redes y publicidad. Pensado para municipios, organizaciones y pequeñas empresas.",                             chip: ["pink",    "Para instituciones"] },
              { icon: "", title: "Capacitaciones a Medida",        desc: "Diseñamos el programa según las necesidades de tu equipo o institución. Formato presencial, virtual o híbrido, con materiales incluidos.",                     chip: ["white", "Personalizado"] },
            ].map((s, i) => (
              <div key={i} className="bg-[#121212] border border-white/[0.07] p-6 md:p-8 flex flex-col gap-3 hover:border-[#C8F000]/40 transition-all">
                <span className="text-2xl">{s.icon}</span>
                <h4 className="font-black text-sm md:text-base uppercase text-white leading-tight">{s.title}</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed flex-1">{s.desc}</p>
                <Chip label={s.chip[1]} color={s.chip[0]} />
              </div>
            ))}
          </div>

                {/* ── label y alt para lectores añadir luego  ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5px] mt-[1.5px]">
            {[
              { label: "", alt: "", img: imgAcademy1 }, 
              { label: "", alt: "", img: imgAcademy2 },
            ].map((card, i) => (
              <div key={i} className="bg-[#121212] border border-white/[0.07] p-5 md:p-8 hover:border-[#C8F000]/40 transition-all">
                <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#C8F000] mb-3">{card.label}</p>
                <div className="w-full bg-[#191919] rounded-xl overflow-hidden border border-dashed border-[#C8F000]/30 aspect-square">
                  {card.img ? (
                    <img src={card.img} alt={card.alt} className="w-full h-full object-cover block" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-40 py-12">
                      <span className="text-3xl">🖼️</span>
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[#C8F000] text-center px-4">{card.alt}</span>
                      <span className="text-[9px] text-gray-600">Imagen pendiente</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#C8F000] px-5 py-8 md:px-12 md:py-10 mt-[1.5px] flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-black/50 mb-2">¿Tu equipo necesita formación?</p>
              <div className="font-black text-[clamp(18px,3vw,36px)] text-[#0B0B0B] uppercase leading-tight">
                SOLICITAR UNA<br />CAPACITACIÓN →
              </div>
            </div>
            <a href="https://wa.me/+5491144789797" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0B0B0B] text-[#C8F000] text-[10px] font-black tracking-[0.25em] uppercase px-7 py-4 rounded-full transition-all hover:scale-105 whitespace-nowrap">
              Hablar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="px-[4vw] py-16 md:py-24 text-center border-t border-white/[0.07]">
        <p className="text-[9px] font-bold tracking-[0.42em] uppercase text-[#C8F000] mb-4">¿Querés ser el próximo caso?</p>
        <h2 className="font-black text-[clamp(24px,6vw,80px)] uppercase leading-none mb-6">
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