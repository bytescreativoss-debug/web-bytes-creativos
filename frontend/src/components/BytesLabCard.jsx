import React, { useRef, useEffect } from 'react';
import './BytesLabCard.css';

export default function BytesLabCard() {
  const heroRef   = useRef(null);
  const canvasRef = useRef(null);
  const headRef   = useRef(null);
  const eyeLRef   = useRef(null);
  const eyeRRef   = useRef(null);
  const pupilLRef = useRef(null);
  const pupilRRef = useRef(null);
  const bgGlowRef = useRef(null);
  const dotRef    = useRef(null);
  useEffect(() => {
    const hero   = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, nodes = [];
    let netAnimId, robotAnimId;

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    }

    function mkNodes() {
      nodes = [];
      for (let i = 0; i < 62; i++) {
        const g = Math.random() < 0.42;
        const p = !g && Math.random() < 0.5;
        nodes.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
          r: g ? Math.random() * 5 + 3 : Math.random() * 2.5 + 1.5,
          color: g ? 'g' : p ? 'p' : 'v',
          alpha: Math.random() * 0.55 + 0.28,
        });
      }
    }

    function drawNet() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) {
            ctx.strokeStyle = `rgba(120,200,60,${(1 - d / 115) * 0.32})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle =
          n.color === 'g' ? `rgba(160,235,60,${n.alpha})`
          : n.color === 'p' ? `rgba(220,110,210,${n.alpha})`
          : `rgba(150,120,255,${n.alpha})`;
        ctx.fill();
        if (n.color === 'g' && n.r > 5) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(160,235,60,.14)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    function tickNet() {
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
      drawNet();
      netAnimId = requestAnimationFrame(tickNet);
    }

    // Robot mouse tracking (normalized -1..1)
    let tx = 0, ty = 0, smX = 0, smY = 0;
    let tpx = 0, tpy = 0, spX = 0, spY = 0;

    function tickRobot() {
      smX += (tx  - smX) * 0.1;
      smY += (ty  - smY) * 0.1;
      spX += (tpx - spX) * 0.13;
      spY += (tpy - spY) * 0.13;

      if (headRef.current) {
        headRef.current.style.transform =
          `rotateX(${smY * -16}deg) rotateY(${smX * 18}deg)`;
      }
      const pt = `translate(calc(-50% + ${spX * 5}px), calc(-50% + ${spY * 5}px))`;
      if (pupilLRef.current) pupilLRef.current.style.transform = pt;
      if (pupilRRef.current) pupilRRef.current.style.transform = pt;

      robotAnimId = requestAnimationFrame(tickRobot);
    }

    function onMouseMove(e) {
      const hr = hero.getBoundingClientRect();
      const mx = (e.clientX - hr.left) / hr.width;
      const my = (e.clientY - hr.top)  / hr.height;
      tx  = (mx - 0.5) * 2;
      ty  = (my - 0.5) * 2;
      tpx = tx * 0.8;
      tpy = ty * 0.8;

      if (dotRef.current) {
        dotRef.current.style.left = (e.clientX - hr.left) + 'px';
        dotRef.current.style.top  = (e.clientY - hr.top)  + 'px';
      }
    }

    function onMouseLeave() {
      tx = 0; ty = 0; tpx = 0; tpy = 0;
      if (dotRef.current) dotRef.current.style.opacity = '0';
    }

    function onMouseEnter() {
      if (dotRef.current) dotRef.current.style.opacity = '1';
    }

    function onResize() { resize(); mkNodes(); }

    hero.addEventListener('mousemove',  onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
    hero.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('resize', onResize);

    resize(); mkNodes(); tickNet(); tickRobot();

    return () => {
      hero.removeEventListener('mousemove',  onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
      hero.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(netAnimId);
      cancelAnimationFrame(robotAnimId);
    };
  }, []);

  return (
    <section className="bl-section">
      <div className="bl-wrap">
        <div className="blh-hero" ref={heroRef}>

          <div className="blh-corner blh-tl" />
          <div className="blh-corner blh-tr" />
          <div className="blh-corner blh-bl" />
          <div className="blh-corner blh-br" />

          <canvas className="blh-net" ref={canvasRef} />
          <div className="blh-bg-glow" ref={bgGlowRef} />

          {/* Left panel */}
          <div className="blh-left">
            <div className="blh-badge">Experiencias creadas con IA</div>
            <div className="blh-title">BYTES<br />LAB</div>
            <div className="blh-cta-row">
              <span className="blh-cta-label">Explorar laboratorio</span>
              <span className="blh-cta-line" />
            </div>
          </div>

          {/* Right panel — robot */}
          <div className="blh-right">
            <div className="blh-robot-float">
              <div className="blh-robot">
                <div className="blh-antenna">
                  <div className="blh-antenna-ball" />
                  <div className="blh-antenna-stem" />
                </div>
                <div className="blh-head" ref={headRef}>
                  <div className="blh-ear blh-ear-l" />
                  <div className="blh-ear blh-ear-r" />
                  <div className="blh-visor">
                    <div className="blh-eye-wrap">
                      <div className="blh-eye-outer" ref={eyeLRef}>
                        <div className="blh-eye-pupil" ref={pupilLRef} />
                      </div>
                    </div>
                    <div className="blh-eye-wrap">
                      <div className="blh-eye-outer" ref={eyeRRef}>
                        <div className="blh-eye-pupil" ref={pupilRRef} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blh-neck">
                  <div className="blh-neck-ring" />
                  <div className="blh-neck-ring" />
                  <div className="blh-neck-ring" />
                </div>
                <div className="blh-body">
                  <div className="blh-arms">
                    <div className="blh-arm blh-arm-l"><div className="blh-arm-hand" /></div>
                    <div className="blh-arm blh-arm-r"><div className="blh-arm-hand" /></div>
                  </div>
                  <div className="blh-chest">
                    <div className="blh-chest-led" />
                    <div className="blh-chest-led" />
                    <div className="blh-chest-led" />
                    <div className="blh-chest-bar" />
                  </div>
                  <div className="blh-vent blh-vent-l">
                    <div className="blh-vent-line" /><div className="blh-vent-line" /><div className="blh-vent-line" />
                  </div>
                  <div className="blh-vent blh-vent-r">
                    <div className="blh-vent-line" /><div className="blh-vent-line" /><div className="blh-vent-line" />
                  </div>
                </div>
                <div className="blh-legs">
                  <div className="blh-leg" />
                  <div className="blh-leg" />
                </div>
              </div>
            </div>
            <div className="blh-floor-shadow" />
          </div>

          <div className="blh-click-label">MUY PRONTO</div>

          <div className="blh-cursor-dot" ref={dotRef} />
        </div>
      </div>
    </section>
  );
}
