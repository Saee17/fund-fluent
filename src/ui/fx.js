// Mascot ("Paisa", a one-rupee coin) and the celebration burst.
import { h, reducedMotion } from './dom.js';

const FACES = {
  happy: '<path d="M27 40c3 4 11 4 14 0" stroke="#5A3D00" stroke-width="3.2" stroke-linecap="round" fill="none"/>',
  wow: '<ellipse cx="34" cy="42" rx="4.5" ry="5.5" fill="#5A3D00"/>',
  oops: '<path d="M27 44c3-3.5 11-3.5 14 0" stroke="#5A3D00" stroke-width="3.2" stroke-linecap="round" fill="none"/>',
  calm: '<path d="M28 41h12" stroke="#5A3D00" stroke-width="3.2" stroke-linecap="round"/>'
};

/** A small coin character. mood: happy | wow | oops | calm */
export function mascot(mood = 'happy', size = 64) {
  const wrap = h('span', { class: `mascot mood-${mood}`, 'aria-hidden': 'true' });
  wrap.style.width = wrap.style.height = size + 'px';
  // trusted constant markup
  wrap.innerHTML = `<svg viewBox="0 0 68 68" width="${size}" height="${size}">
    <circle cx="34" cy="36" r="29" fill="#D99A00"/>
    <circle cx="34" cy="32" r="29" fill="#FFC531"/>
    <circle cx="34" cy="32" r="22.5" fill="none" stroke="#FFE08A" stroke-width="3"/>
    <circle cx="25.5" cy="28" r="3.6" fill="#5A3D00"/><circle cx="42.5" cy="28" r="3.6" fill="#5A3D00"/>
    <circle cx="26.6" cy="26.8" r="1.1" fill="#fff"/><circle cx="43.6" cy="26.8" r="1.1" fill="#fff"/>
    <circle cx="20" cy="36" r="3" fill="#FF9E7A" opacity=".55"/><circle cx="48" cy="36" r="3" fill="#FF9E7A" opacity=".55"/>
    ${FACES[mood] || FACES.happy}
  </svg>`;
  return wrap;
}

const BURST_COLOURS = ['#13B37A', '#FF5B57', '#2E6BFF', '#FF9A1F', '#A24BF2', '#FFC531'];

/** One orchestrated celebration: coloured metro-ticket confetti from the top centre. */
export function celebrate() {
  if (reducedMotion()) return;
  const canvas = h('canvas', { class: 'burst', 'aria-hidden': 'true' });
  document.body.append(canvas);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.width = innerWidth * dpr, H = canvas.height = innerHeight * dpr;
  const ctx = canvas.getContext('2d');
  const bits = Array.from({ length: 120 }, () => ({
    x: W / 2 + (Math.random() - .5) * W * .2, y: H * .28,
    vx: (Math.random() - .5) * 18 * dpr, vy: (-Math.random() * 16 - 6) * dpr,
    w: (6 + Math.random() * 8) * dpr, hgt: (4 + Math.random() * 5) * dpr,
    r: Math.random() * Math.PI, vr: (Math.random() - .5) * .35,
    c: BURST_COLOURS[Math.floor(Math.random() * BURST_COLOURS.length)], round: Math.random() < .35
  }));
  const start = performance.now();
  (function frame(t) {
    const el = t - start;
    ctx.clearRect(0, 0, W, H);
    for (const b of bits) {
      b.vy += .45 * dpr; b.vx *= .985; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c;
      ctx.globalAlpha = Math.max(0, 1 - el / 2200);
      if (b.round) { ctx.beginPath(); ctx.arc(0, 0, b.hgt * .7, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-b.w / 2, -b.hgt / 2, b.w, b.hgt);
      ctx.restore();
    }
    if (el < 2200) requestAnimationFrame(frame); else canvas.remove();
  })(start);
}

/** Counts a number up inside an element. */
export function countUp(el, to, ms = 900) {
  if (reducedMotion()) { el.textContent = to; return; }
  const t0 = performance.now();
  (function step(t) {
    const p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * e);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
