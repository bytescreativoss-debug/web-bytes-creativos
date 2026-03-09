import React, { useEffect } from 'react';

const AnimatedBanner = () => {
  useEffect(() => {
    const canvas = document.getElementById('c');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.offsetWidth || 1200;
    const H = canvas.offsetHeight || 488;
    canvas.width = W;
    canvas.height = H;

    // ── Palette ─────────────────────────────────────────────
    const NEON      = { r: 200, g: 255, b:  20 };
    const BG_COLOR  = '#030a02';

    // ── Noise texture (once) ─────────────────────────────────
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width  = W;
    noiseCanvas.height = H;
    const nCtx = noiseCanvas.getContext('2d');
    const imgData = nCtx.createImageData(W, H);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 18 | 0;
      imgData.data[i]   = 0;
      imgData.data[i+1] = v;
      imgData.data[i+2] = 0;
      imgData.data[i+3] = Math.random() * 60 | 0;
    }
    nCtx.putImageData(imgData, 0, 0);

    // ── Dark green mosaic texture (tile) ─────────────────────
    const tileSize = 18;
    const tileCanvas = document.createElement('canvas');
    tileCanvas.width  = tileSize;
    tileCanvas.height = tileSize;
    const tCtx = tileCanvas.getContext('2d');
    for (let ty = 0; ty < tileSize; ty++) {
      for (let tx = 0; tx < tileSize; tx++) {
        const bright = 4 + Math.random() * 10 | 0;
        tCtx.fillStyle = `rgb(0,${bright},0)`;
        tCtx.fillRect(tx, ty, 1, 1);
      }
    }
    tCtx.strokeStyle = 'rgba(0,30,0,0.4)';
    tCtx.lineWidth = 0.5;
    tCtx.strokeRect(0, 0, tileSize, tileSize);
    const tilePattern = ctx.createPattern(tileCanvas, 'repeat');

    // ── Curve definition ─────────────────────────────────────
    // Each curve: array of bezier control points {x,y}
    // expressed as fractions of W,H so it's resolution-independent
    function p(fx, fy) { return { x: fx * W, y: fy * H }; }

    const CURVES = [
      // Onda suave que cruza todo el ancho
      { pts: [p(-.02,.55), p(.15,.35), p(.30,.60), p(.50,.40), p(.70,.62), p(.85,.38), p(1.02,.52)], w: 1.0 },
      // Garabato en S amplio
      { pts: [p(.0,.25), p(.20,.55), p(.40,.20), p(.60,.65), p(.80,.30), p(1.0,.55)], w: 0.9 },
      // Vuelta suave izquierda
      { pts: [p(.05,.80), p(.15,.50), p(.10,.20), p(.25,.40), p(.20,.70), p(.35,.50), p(.45,.25)], w: 0.85 },
      // Curva diagonal con pequeño bucle
      { pts: [p(.90,.10), p(.70,.30), p(.55,.50), p(.65,.70), p(.50,.85), p(.30,.72), p(.15,.90)], w: 0.8 },
      // Onda larga por el centro
      { pts: [p(-.02,.48), p(.12,.65), p(.28,.42), p(.45,.68), p(.62,.44), p(.78,.66), p(.95,.45), p(1.02,.58)], w: 0.75 },
    ];

    // ── Catmull-Rom to bezier helper ─────────────────────────
    function catmullPoints(pts, steps = 300) {
      const out = [];
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i-1)];
        const p1 = pts[i];
        const p2 = pts[i+1];
        const p3 = pts[Math.min(pts.length-1, i+2)];
        for (let t = 0; t < steps; t++) {
          const s = t / steps;
          const s2 = s*s, s3 = s2*s;
          const x = 0.5*((2*p1.x)+(-p0.x+p2.x)*s+(2*p0.x-5*p1.x+4*p2.x-p3.x)*s2+(-p0.x+3*p1.x-3*p2.x+p3.x)*s3);
          const y = 0.5*((2*p1.y)+(-p0.y+p2.y)*s+(2*p0.y-5*p1.y+4*p2.y-p3.y)*s2+(-p0.y+3*p1.y-3*p2.y+p3.y)*s3);
          out.push({x, y});
        }
      }
      out.push(pts[pts.length-1]);
      return out;
    }

    // ── Loop timing ───────────────────────────────────────────
    // Each curve loops independently: draw-in → hold briefly → fade-out → restart
    // phase: 0=drawing, 1=hold, 2=fading out, 3=delay before restart
    const LOOP_HOLD    = 0.3;   // seconds to hold at full
    const LOOP_FADEOUT = 0.3;   // seconds to fade out
    const LOOP_GAP_MIN = 1.0;
    const LOOP_GAP_MAX = 2.0;

    const SAMPLED = CURVES.map((c, i) => ({
      pts:          catmullPoints(c.pts, 100),
      w:            c.w,
      speed:        0.0018 + Math.random() * 0.0014,
      tailFraction: 0.28 + Math.random() * 0.30,
      // loop state
      phase:        'delay',          // delay | drawing | hold | fadeout
      progress:     0,
      alpha:        0,
      phaseTimer:   (i / CURVES.length) * 2.2,  // stagger initial start
    }));

    // ── Draw one neon stroke ──────────────────────────────────
    function drawNeonStroke(pts, startIdx, endIdx, lineWidth, alpha) {
      if (endIdx <= startIdx) return;
      const seg = pts.slice(startIdx, endIdx + 1);
      if (seg.length < 2) return;
      const a = Math.min(1, alpha);

      // Mid glow
      ctx.save();
      ctx.globalAlpha = a * 0.5;
      ctx.strokeStyle = `rgba(${NEON.r},${NEON.g},${NEON.b},1)`;
      ctx.lineWidth   = lineWidth * 5 ;
      ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
      ctx.shadowColor = `rgba(${NEON.r},${NEON.g},${NEON.b},1)`;
      ctx.shadowBlur  = 8;
      ctx.beginPath(); ctx.moveTo(seg[0].x, seg[0].y);
      for (let i = 1; i < seg.length; i++) ctx.lineTo(seg[i].x, seg[i].y);
      ctx.stroke(); ctx.restore();

      // Core bright line
      ctx.save();
      ctx.globalAlpha = a * 0.95;
      ctx.strokeStyle = `rgba(240,255,180,1)`;
      ctx.lineWidth   = lineWidth * 0.7;
      ctx.lineCap = 'butt'; ctx.lineJoin = 'miter';
      ctx.shadowColor = `rgba(255,255,200,1)`;
      ctx.shadowBlur  = 2;
      ctx.beginPath(); ctx.moveTo(seg[0].x, seg[0].y);
      for (let i = 1; i < seg.length; i++) ctx.lineTo(seg[i].x, seg[i].y);
      ctx.stroke(); ctx.restore();
    }

    // ── Background ────────────────────────────────────────────
    function drawBackground() {
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = tilePattern;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 0.35;
      ctx.drawImage(noiseCanvas, 0, 0);
      ctx.globalAlpha = 1;
    }

    // ── Animation loop ────────────────────────────────────────
    let lastTime = null;

    function frame(ts) {
      if (!lastTime) lastTime = ts;
      const dt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;

      drawBackground();

      for (const curve of SAMPLED) {
        const total = curve.pts.length - 1;

        // ── Phase state machine ───────────────────────────────
        if (curve.phase === 'delay') {
          curve.phaseTimer -= dt;
          if (curve.phaseTimer <= 0) {
            curve.phase    = 'drawing';
            curve.progress = 0;
            curve.alpha    = 0;
          }
          continue; // don't draw yet

        } else if (curve.phase === 'drawing') {
          curve.progress += curve.speed * (dt * 60);
          curve.alpha = Math.min(1, curve.alpha + 0.06 * (dt * 60));
          if (curve.progress >= 1) {
            curve.progress  = 1;
            curve.phase     = 'hold';
            curve.phaseTimer = LOOP_HOLD;
          }

        } else if (curve.phase === 'hold') {
          curve.phaseTimer -= dt;
          if (curve.phaseTimer <= 0) {
            curve.phase     = 'fadeout';
            curve.phaseTimer = LOOP_FADEOUT;
          }

        } else if (curve.phase === 'fadeout') {
          curve.alpha      = Math.max(0, curve.alpha - (dt / LOOP_FADEOUT));
          curve.phaseTimer -= dt;
          if (curve.phaseTimer <= 0) {
            curve.phase     = 'delay';
            curve.phaseTimer = LOOP_GAP_MIN + Math.random() * (LOOP_GAP_MAX - LOOP_GAP_MIN);
            curve.alpha     = 0;
            curve.progress  = 0;
            continue;
          }
        }

        // ── Render ────────────────────────────────────────────
        const endIdx  = Math.floor(curve.progress * total);
        const tailLen = Math.floor(curve.tailFraction * total);
        const startIdx = Math.max(0, endIdx - tailLen);

        // Dim ghost of full drawn path
        if (curve.progress > 0) {
          drawNeonStroke(curve.pts, 0, endIdx, curve.w, curve.alpha * 0.45);
        }
        // Bright active segment
        drawNeonStroke(curve.pts, startIdx, endIdx, curve.w, curve.alpha);
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }, []);

  return (
    <div className="banner-wrapper w-full h-full object-cover opacity-30 shadow-inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas id="c" style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default AnimatedBanner;