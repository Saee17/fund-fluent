// Tiny DOM helper. All text goes through textContent, never innerHTML, so lesson
// text and user input can't inject markup. Styles go through CSSOM (allowed by our CSP).
const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_TAGS = new Set(['svg','path','circle','rect','g','line','polyline','polygon','defs','linearGradient','stop','ellipse','text']);

export function h(tag, attrs, ...kids) {
  const el = SVG_TAGS.has(tag) ? document.createElementNS(SVG_NS, tag) : document.createElement(tag);
  if (attrs) for (const k in attrs) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k === 'class') el.setAttribute('class', v);
    else if (k === 'style') el.style.cssText = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k.startsWith('--')) el.style.setProperty(k, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat(Infinity)) {
    if (c == null || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
}

/** Renders "**bold**" segments inside lesson text as <b>, everything else as text. */
export function rich(text, tag = 'p') {
  const el = h(tag);
  for (const part of String(text).split(/(\*\*[^*]+\*\*)/)) {
    if (!part) continue;
    if (part.startsWith('**') && part.endsWith('**')) el.append(h('b', { text: part.slice(2, -2) }));
    else el.append(part);
  }
  return el;
}

export const inr = n => Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 });
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const coarsePointer = () => window.matchMedia('(pointer: coarse)').matches;

/** Deterministic shuffle so a question always shows its pieces in the same order. */
export function fixedShuffle(arr, seed) {
  let s = 0; for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Static, trusted SVG icons (never built from user data). */
const ICONS = {
  flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c1.2 4.3 6.5 6.4 6.5 12.4A6.5 6.5 0 0 1 5.5 14.4c0-3.2 2-4.5 2.3-7.6 1.9 1.1 3 3 3.2 5.1C12.2 9.6 12.4 5.7 12 2z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 2 4 13.5h6.5L9.5 22 20 9.8h-6.6z"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="2.4" fill="none"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4v16M5 7h6a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h2" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/><circle cx="5" cy="7" r="2.4" fill="currentColor"/><circle cx="19" cy="17" r="2.4" fill="currentColor"/></svg>',
  dumbbell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6M6.5 6.5v11M17.5 6.5v11M21 9v6M6.5 12h11" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>',
  cards: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6" width="12" height="15" rx="2.5" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="M8 3h10a2.5 2.5 0 0 1 2.5 2.5V16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg>',
  percent: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5 6 19" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" stroke-width="2.2" fill="none"/><circle cx="16.5" cy="16.5" r="2.8" stroke="currentColor" stroke-width="2.2" fill="none"/></svg>',
  gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="2.2" fill="none"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 5l-7 7 7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  arrowL: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  arrowR: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'
};
export function icon(name, cls = 'ic') {
  const span = h('span', { class: cls, 'aria-hidden': 'true' });
  span.innerHTML = ICONS[name]; // trusted constant
  return span;
}
