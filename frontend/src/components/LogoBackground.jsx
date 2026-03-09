import React, { useEffect, useRef, useState } from 'react';

const LogoBackground = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => { if (canvasRef.current) observer.unobserve(canvasRef.current); };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    const rect = canvas.getBoundingClientRect();
    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const W    = rect.width  || 700;
    const H    = rect.height || 700;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    // Clip permanente: nada se dibuja fuera del canvas
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.clip();

    const CX = W * 0.50;
    const CY = H * 0.48;
    const N  = 300;

    function makeEllipse(cx, cy, rx, ry, angleDeg) {
      const a    = angleDeg * Math.PI / 180;
      const pts  = new Float32Array(N * 2);
      const seed = Math.abs((cx * 3 + cy * 7 + angleDeg * 11)) | 0;
      const amp  = Math.min(rx, ry) * 0.10;
      const freq = 2 + (seed % 2);
      const ph   = (seed % 60) / 60 * Math.PI * 2;
      for (let i = 0; i < N; i++) {
        const t     = (i / N) * Math.PI * 2;
        const ex    = rx * Math.cos(t);
        const ey    = ry * Math.sin(t);
        const off   = amp * Math.sin(freq * t + ph);
        const mag   = Math.sqrt(ex*ex + ey*ey) + 0.001;
        const scale = 1 + off / mag;
        pts[i*2]   = cx + (ex*scale)*Math.cos(a) - (ey*scale)*Math.sin(a);
        pts[i*2+1] = cy + (ex*scale)*Math.sin(a) + (ey*scale)*Math.cos(a);
      }
      return pts;
    }

    const scaleX = W / 900;
    const scaleY = H / 900;

    // ── LÍNEAS ────────────────────────────────────────────────
    const CURVES = [
      { pts: makeEllipse(CX-5,  CY-3,  200*scaleX, 60*scaleY, -20), speed: 0.00090, frac: 0.00, w: 1.6 },
      { pts: makeEllipse(CX+8,  CY+6,  188*scaleX, 55*scaleY,  28), speed: 0.00075, frac: 0.25, w: 1.5 },
      { pts: makeEllipse(CX-9,  CY+4,  175*scaleX, 50*scaleY, -38), speed: 0.00105, frac: 0.50, w: 1.4 },
      { pts: makeEllipse(CX+4,  CY-8,  182*scaleX, 53*scaleY,  62), speed: 0.00080, frac: 0.75, w: 1.4 },
    ];

    // ── LARGO DE LAS LÍNEAS ───────────────────────────────────
    const TARGET_ARC = 600 * scaleX * 1.1;

    CURVES.forEach(c => {
      if (c.tailN) return;
      let arc = 0;
      for (let i = 1; i < N; i++) {
        const dx = c.pts[i*2] - c.pts[(i-1)*2];
        const dy = c.pts[i*2+1] - c.pts[(i-1)*2+1];
        arc += Math.sqrt(dx*dx + dy*dy);
      }
      c.tailN = Math.floor(N * Math.min(0.92, TARGET_ARC / arc));
    });

    // ── Ghost canvases (sin DPR duplicado — OPTIMIZACIÓN) ────
    // Se crean en tamaño lógico y se dibuja con drawImage escalado,
    // evitando la multiplicación por dpr que causaba texturas enormes.
    const ghosts = CURVES.map(c => {
      const off = document.createElement('canvas');
      off.width  = W;
      off.height = H;
      const g = off.getContext('2d', { alpha: true });
      g.strokeStyle = 'rgba(210,255,20,0.055)';
      g.lineWidth   = c.w * 1.5;
      g.lineJoin    = 'round';
      g.beginPath();
      g.moveTo(c.pts[0], c.pts[1]);
      for (let i = 1; i < N; i++) g.lineTo(c.pts[i*2], c.pts[i*2+1]);
      g.closePath();
      g.stroke();
      return off;
    });

    // ── OPTIMIZACIÓN: path reutilizable para no hacer save/restore extra
    function drawSnake(c, hi) {
      const p  = c.pts;
      const ti = (hi - c.tailN + N) % N;

      function buildPath() {
        ctx.moveTo(p[ti*2], p[ti*2+1]);
        if (ti <= hi) {
          for (let i = ti+1; i <= hi; i++) ctx.lineTo(p[i*2], p[i*2+1]);
        } else {
          for (let i = ti+1; i < N;  i++) ctx.lineTo(p[i*2], p[i*2+1]);
          for (let i = 0;    i <= hi; i++) ctx.lineTo(p[i*2], p[i*2+1]);
        }
      }

      // ── EFECTO BRILLO (halo exterior) ─────────────────────
      ctx.strokeStyle = 'rgba(190,255,10,0.14)';
      ctx.lineWidth   = c.w * 13;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'butt';
      ctx.beginPath(); buildPath(); ctx.stroke();

      // ── COLOR Y GROSOR de la línea principal ──────────────
      ctx.strokeStyle = 'rgba(215,255,25,0.95)';
      ctx.lineWidth   = c.w * 2.3;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'butt';
      ctx.beginPath(); buildPath(); ctx.stroke();

      // puntito en la cabeza
      ctx.fillStyle = 'rgba(245,255,140,0.92)';
      ctx.beginPath();
      ctx.arc(p[hi*2], p[hi*2+1], c.w * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    let animationId;
    let last     = null;
    let smoothDt = 1 / 60;

    // ── OPTIMIZACIÓN: pausa si el tab se oculta ──────────────
    const handleVisibility = () => { if (document.hidden) last = null; };
    document.addEventListener('visibilitychange', handleVisibility);

    function frame(ts) {
      animationId = requestAnimationFrame(frame);

      // Pausa cuando el tab está en segundo plano
      if (document.hidden) return;

      if (!last) { last = ts; return; }
      const rawDt = (ts - last) / 1000;
      last = ts;
      smoothDt = smoothDt * 0.85 + Math.min(rawDt, 0.05) * 0.15;

      ctx.fillStyle = '#0F0F0F';
      ctx.fillRect(0, 0, W, H);

      for (let ci = 0; ci < CURVES.length; ci++) {
        const c = CURVES[ci];
        c.frac = (c.frac + c.speed * smoothDt * 60) % 1;
        const hi = Math.floor(c.frac * N) % N;
        // OPTIMIZACIÓN: drawImage en tamaño lógico (más rápido que DPR*DPR)
        ctx.drawImage(ghosts[ci], 0, 0, W, H);
        drawSnake(c, hi);
      }
    }

    animationId = requestAnimationFrame(frame);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isVisible]);

  return (
    <div className="absolute inset-0 opacity-10" style={{ willChange: 'transform', overflow: 'hidden' }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
    </div>
  );
};

export default LogoBackground;