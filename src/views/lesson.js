// Lesson engine. A level is a fixed sequence: idea card → its questions → next idea card.
// Same order every time (works like a manual); leaving mid-way resumes at the same idea.
import { h, rich, icon, inr, fixedShuffle, shuffle, coarsePointer } from '../ui/dom.js';
import { mascot, celebrate, countUp } from '../ui/fx.js';
import { S, save, isDone, nextLevel, learnedQuestions, recordLessonEnd } from '../state.js';
import { QUESTION_BY_ID, PERCENT } from '../content/index.js';
import { track } from '../analytics.js';
import { drillQuestions } from '../drill.js';

let L = null;
let hooks = {};
const host = () => document.getElementById('lesson');

export function initLesson(h0) { hooks = h0; }

export function startLesson(cfg) {
  let steps = [], resumedFrom = 0;
  if (cfg.mode === 'level') {
    const lv = cfg.level;
    if (!cfg.fromStart && S.resume?.lv === lv.id && S.resume.idea > 0 && S.resume.idea < lv.ideas.length) resumedFrom = S.resume.idea;
    lv.ideas.forEach((idea, i) => {
      if (i < resumedFrom) return;
      steps.push({ kind: 'teach', idea, n: i + 1, of: lv.ideas.length });
      idea.qs.forEach(q => steps.push({ kind: 'q', q, retry: false, ideaN: i + 1 }));
    });
  } else {
    let pool;
    if (cfg.mode === 'drill') pool = drillQuestions(10);
    else if (cfg.mode === 'mistakes') pool = shuffle(S.mistakes.map(id => QUESTION_BY_ID[id]).filter(Boolean)).slice(0, 10);
    else if (cfg.mode === 'numbers') pool = shuffle(learnedQuestions().filter(q => q.t === 'num')).slice(0, 10);
    else pool = shuffle(learnedQuestions()).slice(0, 10);
    steps = pool.map(q => ({ kind: 'q', q, retry: false }));
  }
  if (!steps.length) return;
  const line = cfg.level ? cfg.level.section.line : cfg.mode === 'drill' ? 'pct' : 'basics';
  L = { cfg, line, resumedFrom, queue: steps, total: steps.length, cleared: 0, qCount: steps.filter(s => s.kind === 'q').length,
        xp: 0, firstRight: 0, combo: 0, best: 0, retries: {}, start: Date.now(), cur: null, phase: 'teach', stops: cfg.level ? cfg.level.ideas.length : 0 };
  const el = host(); el.hidden = false; el.setAttribute('data-line', line);
  setInert(true); L.opener = document.activeElement;
  document.body.style.overflow = 'hidden';
  S.seenIntro = true; save();
  track('lesson_started', { mode: cfg.mode, level: cfg.level?.id, section: cfg.level?.section.id, resumed: resumedFrom > 0 });
  next();
}

function close(abandoned) {
  if (abandoned && L) track('lesson_left', { mode: L.cfg.mode, level: L.cfg.level?.id, progress: Math.round((L.cleared / L.total) * 100) });
  const opener = L?.opener; L = null; const el = host(); el.hidden = true; el.replaceChildren(); setInert(false);
  document.body.style.overflow = '';
  hooks.onClose?.();
  if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
}
function setInert(on) { for (const id of ['app', 'tabs']) { const n = document.getElementById(id); if (n) n.inert = on; } }

function next() {
  if (!L.queue.length) return finish();
  L.cur = L.queue.shift(); L.answer = null; L.hinted = false;
  if (L.cur.kind === 'teach') {
    L.phase = 'teach';
    if (L.cfg.mode === 'level') { S.resume = { lv: L.cfg.level.id, idea: L.cur.n - 1 }; save(); }
    drawTeach();
  } else { L.phase = 'answer'; drawQuestion(); }
}

/* ---------- head: Transit-style progress strip ---------- */
function head() {
  const pct = Math.round((L.cleared / L.total) * 100);
  const x = h('button', { class: 'iconbtn', 'aria-label': 'Leave lesson', onclick: askLeave }, icon('close'));
  const strip = h('div', { class: 'l-strip', role: 'progressbar', 'aria-label': 'Lesson progress', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 },
    h('div', { class: 'rail' }), h('div', { class: 'fill', style: `width:${pct}%` }));
  if (L.stops > 1) {
    const ideaAt = L.cur?.ideaN || L.cur?.n || 0;
    for (let i = 0; i < L.stops; i++) {
      if (i < L.resumedFrom) continue;
      const span = L.stops - L.resumedFrom;
      const left = span > 1 ? ((i - L.resumedFrom) / (span - 1)) * 100 : 0;
      strip.append(h('i', { class: 'stop' + (i < ideaAt ? ' on' : ''), style: `left:${left}%` }));
    }
  }
  strip.append(h('div', { class: 'token', style: `left:${pct}%` }, mascot('happy', 30)));
  return h('div', { class: 'l-head' }, x, strip, h('div', { class: 'combo', id: 'combo', text: L.combo >= 3 ? `${L.combo} in a row` : '' }));
}

function frame(bodyKids, footKids, footClass = '') {
  const body = h('div', { class: 'l-body', tabindex: '0', 'aria-label': 'Lesson content' }, h('div', { class: 'l-inner' }, bodyKids));
  const foot = h('div', { class: 'l-foot ' + footClass, id: 'foot' }, h('div', { class: 'l-foot-inner' }, footKids));
  host().replaceChildren(head(), body, foot);
  body.scrollTop = 0;
}

/* ---------- idea card ---------- */
function drawTeach() {
  const { idea, n, of } = L.cur, lv = L.cfg.level;
  const ticket = h('div', { class: 'ticket' }, h('div', { class: 't-head' }, h('i'), 'Example'),
    h('div', { class: 't-body' }, idea.ex.map(r => typeof r === 'string' ? h('div', { class: 't-note', text: r }) : h('div', { class: 't-row' }, h('span', { text: r[0] }), h('span', { text: r[1] })))));
  const firstShown = L.resumedFrom > 0 && n === L.resumedFrom + 1 && L.cleared === 0;
  const body = h('div', { class: 'teach' },
    firstShown ? h('div', { class: 'resume' }, h('span', { text: `Picking up where you left off: idea ${n} of ${of}.` }),
      h('button', { class: 'btn quiet sm', onclick: () => { S.resume = null; save(); startLesson({ mode: 'level', level: lv, fromStart: true }); } }, 'Start from the beginning')) : null,
    h('div', { class: 'kicker', text: `${lv.name} · idea ${n} of ${of}` }),
    h('h1', { class: 'l-title', text: idea.title }),
    idea.body.map(t => rich(t)),
    idea.viz ? viz(idea.viz) : null,
    ticket,
    idea.app ? h('div', { class: 'inapp' }, h('b', { text: 'On a fund app: ' }), idea.app) : null);
  const nq = idea.qs.length;
  const go = h('button', { class: 'btn line wide grow', id: 'continue', onclick: () => { L.cleared++; next(); } }, 'Got it');
  const row = h('div', { class: 'foot-row' });
  if (isDone(lv) && n === L.resumedFrom + 1 && L.cleared === 0) row.append(h('button', { class: 'btn quiet', onclick: skipCards }, 'Skip to questions'));
  row.append(go);
  frame(body, [h('div', { class: 'fb-note', text: `Next: ${nq} quick question${nq > 1 ? 's' : ''} on this idea` }), row]);
  track('idea_viewed', { level: lv.id, idea: n });
  setTimeout(() => go.focus({ preventScroll: true }), 40);
}
function skipCards() { const t = L.queue.filter(s => s.kind === 'teach').length + 1; L.queue = L.queue.filter(s => s.kind !== 'teach'); L.total -= t; next(); }

function viz(v) {
  if (v.type === 'grid') {
    const g = h('div', { class: 'grid100', role: 'img', 'aria-label': v.cap });
    for (let i = 0; i < 100; i++) g.append(h('i', { class: i < v.n ? 'on' : null, style: i < v.n ? `animation-delay:${i * 40}ms` : null }));
    return h('div', { class: 'viz' }, g, h('div', { class: 'cap', text: v.cap }));
  }
  if (v.type === 'blocks') {
    const b = h('div', { class: 'blocks' });
    v.items.forEach(([lbl, val]) => b.append(h('div', { class: 'blk' }, h('span', { text: lbl }), h('i', { style: `width:${Math.max(3, (val / v.base) * 100)}%` }), h('em', { text: '₹' + inr(val) }))));
    return h('div', { class: 'viz' }, h('div', { class: 'cap', text: `Slices of ₹${inr(v.base)}` }), b);
  }
  return null;
}

/* ---------- questions ---------- */
const TYPE = { mcq: 'Choose the answer', tf: 'True or false', num: 'Work it out', order: 'Put in order', match: 'Match the pairs' };

function drawQuestion() {
  const { q, retry } = L.cur;
  const input = BUILD[q.t](q);
  const body = [
    h('div', { class: 'kicker' }, `Quick check · ${TYPE[q.t]}`, retry ? h('span', { class: 'again', text: 'Again' }) : null),
    h('h1', { class: 'l-q', text: q.q }), input, h('div', { id: 'workslot' })
  ];
  L.checkBtn = h('button', { class: 'btn good wide grow', disabled: true, onclick: check }, 'Check');
  const row = h('div', { class: 'foot-row' });
  if (q.work) row.append(h('button', { class: 'hint-btn', 'aria-label': 'Show me how to work it out', title: 'Show me how', onclick: e => { L.hinted = true; e.currentTarget.disabled = true; document.getElementById('workslot').replaceChildren(workBox(q)); } }, icon('bulb')));
  row.append(L.checkBtn);
  if (q.t === 'match') { L.checkBtn.hidden = true; row.hidden = true; }
  frame(body, row);
  const num = document.getElementById('num-answer');
  if (num && !coarsePointer()) setTimeout(() => num.focus(), 60);
}
const ready = ok => { L.checkBtn.disabled = !ok; };
const workBox = q => h('div', { class: 'work' }, h('h4', { text: 'How to work it out' }), h('ol', null, q.work.map(w => h('li', { text: w }))));

const BUILD = {
  mcq: q => choice(q.opts, 'opts'),
  tf: () => choice(['True', 'False'], 'opts tf'),
  num(q) {
    const touch = coarsePointer();
    const inp = h('input', { id: 'num-answer', inputmode: touch ? 'none' : 'decimal', autocomplete: 'off', 'aria-label': 'Your answer', placeholder: '0', readonly: touch || null });
    const set = v => { inp.value = v; L.answer = v; ready(v.trim() !== '' && v !== '.'); };
    inp.addEventListener('input', () => set(inp.value.replace(/[^\d.,]/g, '')));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !L.checkBtn.disabled) { e.preventDefault(); check(); } });
    const box = h('div', { class: 'numbox', id: 'numbox' }, q.prefix ? h('span', { text: q.prefix }) : null, inp, q.suffix ? h('span', { text: q.suffix }) : null);
    if (!touch) return box;
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];
    const pad = h('div', { class: 'keypad', role: 'group', 'aria-label': 'Number keypad' }, keys.map(k => h('button', {
      class: k === 'del' ? 'del' : null, 'aria-label': k === 'del' ? 'Delete' : k,
      onclick: () => { if (L.phase !== 'answer') return; const v = inp.value; set(k === 'del' ? v.slice(0, -1) : (k === '.' && v.includes('.')) ? v : (v + k).slice(0, 12)); }
    }, k === 'del' ? '⌫' : k)));
    return h('div', null, box, pad);
  },
  order(q) {
    let mix = fixedShuffle(q.items, q.id); if (mix.join() === q.items.join()) mix = mix.slice().reverse();
    L.answer = [];
    const slot = h('div', { class: 'slot', 'aria-label': 'Your order' }), pool = h('div', { class: 'pool' });
    const redraw = () => {
      slot.replaceChildren(...L.answer.map((it, i) => h('button', { class: 'chipbtn', onclick: () => { if (L.phase !== 'answer') return; L.answer.splice(i, 1); redraw(); } }, h('span', { class: 'n', text: i + 1 }), it)));
      pool.querySelectorAll('.chipbtn').forEach(c => c.classList.toggle('used', L.answer.includes(c.dataset.v)));
      ready(L.answer.length === q.items.length);
    };
    mix.forEach(it => pool.append(h('button', { class: 'chipbtn', 'data-v': it, onclick: () => { if (L.phase !== 'answer' || L.answer.includes(it)) return; L.answer.push(it); redraw(); } }, it)));
    redraw();
    return h('div', null, slot, pool);
  },
  match(q) {
    let sel = null, slips = 0, left = q.pairs.length; const all = [];
    const lc = h('div', { class: 'col' }), rc = h('div', { class: 'col' });
    const pick = (btn, side, key) => {
      if (btn.classList.contains('ok') || L.phase !== 'answer') return;
      if (!sel || sel.side === side) { all.forEach(b => b.setAttribute('aria-pressed', 'false')); sel = { btn, side, key }; btn.setAttribute('aria-pressed', 'true'); return; }
      if (sel.key === key) {
        [sel.btn, btn].forEach(b => { b.classList.add('ok'); b.setAttribute('aria-pressed', 'false'); b.disabled = true; });
        left--; sel = null; if (!left) { L.answer = slips; check(); }
      } else {
        slips++; const a = sel.btn;
        [a, btn].forEach(b => { b.classList.add('miss'); b.setAttribute('aria-pressed', 'false'); });
        setTimeout(() => [a, btn].forEach(b => b.classList.remove('miss')), 420); sel = null;
      }
    };
    q.pairs.forEach(([l]) => { const b = h('button', { class: 'mitem left', 'aria-pressed': 'false' }, l); b.onclick = () => pick(b, 'L', l); all.push(b); lc.append(b); });
    fixedShuffle(q.pairs, q.id).forEach(([l, r]) => { const b = h('button', { class: 'mitem', 'aria-pressed': 'false' }, r); b.onclick = () => pick(b, 'R', l); all.push(b); rc.append(b); });
    return h('div', { class: 'match' }, lc, rc);
  }
};
function choice(opts, cls) {
  const box = h('div', { class: cls, role: 'group' });
  opts.forEach((o, i) => {
    const b = h('button', { class: 'opt', 'aria-pressed': 'false', 'data-i': i }, h('span', { class: 'k', text: i + 1 }), h('span', { text: o }));
    b.onclick = () => { if (L.phase !== 'answer') return; box.querySelectorAll('.opt').forEach(x => x.setAttribute('aria-pressed', String(x === b))); L.answer = i; ready(true); };
    box.append(b);
  });
  return box;
}

function isRight(q, a) {
  switch (q.t) {
    case 'mcq': return a === q.a;
    case 'tf': return (a === 0) === q.a;
    case 'num': { const v = parseFloat(String(a).replace(/[₹,%\s]/g, '')); return !Number.isNaN(v) && Math.abs(v - q.a) <= q.tol + 1e-9; }
    case 'order': return a.join('|') === q.items.join('|');
    case 'match': return a === 0;
  }
}
function answerText(q) {
  if (q.t === 'mcq') return q.opts[q.a];
  if (q.t === 'tf') return q.a ? 'True' : 'False';
  if (q.t === 'num') return (q.prefix || '') + inr(q.a) + (q.suffix ? ' ' + q.suffix : '');
  if (q.t === 'order') return q.items.join(' → ');
  return '';
}
const PRAISE = ['Nice!', 'Spot on!', 'Correct!', 'Exactly!', 'You got it!', 'Sharp!'];

function check() {
  if (L.phase !== 'answer') return;
  const { q, retry } = L.cur, ok = isRight(q, L.answer);
  L.phase = 'feedback';
  S.answered++; if (ok) S.correct++;
  if (q.t === 'mcq' || q.t === 'tf') document.querySelectorAll('.opt').forEach(b => {
    b.disabled = true; const i = +b.dataset.i, c = q.t === 'mcq' ? i === q.a : (i === 0) === q.a;
    if (c) b.classList.add('right'); else if (i === L.answer) b.classList.add('wrong');
  });
  document.querySelectorAll('.chipbtn, .keypad button').forEach(c => { c.disabled = true; });
  const nb = document.getElementById('numbox'); if (nb) nb.classList.add(ok ? 'right' : 'wrong');
  const inp = document.getElementById('num-answer'); if (inp) inp.disabled = true;

  let requeued = false;
  if (ok) {
    L.cleared++; L.combo++; L.best = Math.max(L.best, L.combo);
    L.xp += (retry || L.hinted) ? 5 : 10; if (!retry && !L.hinted) L.firstRight++;
    if (L.cfg.mode === 'mistakes' || retry) S.mistakes = S.mistakes.filter(x => x !== q.id);
  } else {
    L.combo = 0;
    if (!q.gen && !S.mistakes.includes(q.id)) S.mistakes.push(q.id);
    const n = L.retries[q.id] = (L.retries[q.id] || 0) + 1;
    if (n <= 2) { L.queue.push({ ...L.cur, retry: true }); requeued = true; } else L.cleared++;
  }
  save();
  track('question_answered', { q: q.gen ? 'drill' : q.id, type: q.t, correct: ok, retry, hinted: L.hinted, level: q.level?.id });

  const title = ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : (q.t === 'match' ? `Matched, with ${L.answer} wrong tap${L.answer > 1 ? 's' : ''}` : 'Not quite');
  const cont = h('button', { class: 'btn wide ' + (ok ? 'good' : 'bad'), id: 'continue', onclick: next }, 'Continue');
  const foot = document.getElementById('foot');
  foot.className = 'l-foot ' + (ok ? 'good' : 'bad');
  foot.firstChild.replaceChildren(...[
    h('div', { class: 'fb-top', role: 'status' }, mascot(ok ? (L.combo >= 3 ? 'wow' : 'happy') : 'oops', 48), h('div', { class: 'fb-title', text: title })),
    (!ok && q.t !== 'match') ? h('div', { class: 'fb-answer', text: 'Answer: ' + answerText(q) }) : null,
    (!ok && q.work && !L.hinted) ? workBox(q) : h('div', { class: 'fb-why', text: q.why }),
    requeued ? h('div', { class: 'fb-note', text: 'This one comes back at the end of the lesson.' }) : null,
    cont].filter(Boolean));
  const pct = Math.round((L.cleared / L.total) * 100);
  const fill = document.querySelector('.l-strip .fill'); if (fill) fill.style.width = pct + '%';
  const tok = document.querySelector('.l-strip .token'); if (tok) tok.style.left = pct + '%';
  const combo = document.getElementById('combo');
  combo.textContent = L.combo >= 3 ? `${L.combo} in a row` : '';
  if (L.combo >= 3) { combo.classList.remove('bump'); void combo.offsetWidth; combo.classList.add('bump'); }
  setTimeout(() => cont.focus({ preventScroll: true }), 40);
}

/* ---------- finish ---------- */
function finish() {
  const perfect = L.qCount > 0 && L.firstRight === L.qCount;
  if (perfect) L.xp += 20;
  const lv = L.cfg.level;
  const wasDone = lv ? isDone(lv) : false;
  recordLessonEnd({ xp: L.xp, level: lv });
  const secs = Math.round((Date.now() - L.start) / 1000), acc = L.qCount ? Math.round((L.firstRight / L.qCount) * 100) : 0;
  track('lesson_completed', { mode: L.cfg.mode, level: lv?.id, section: lv?.section.id, xp: L.xp, accuracy: acc, seconds: secs, perfect, redo: wasDone });

  let sub;
  if (lv?.pct) { const np = PERCENT.levels.find(x => !isDone(x)); sub = np ? `Next percent lesson: ${np.name}.` : 'All percent lessons done. Try the quick drill.'; }
  else if (lv) {
    const nl = nextLevel();
    if (!nl) sub = 'You reached the end of every line.';
    else if (nl.section !== lv.section && !wasDone) sub = `Line complete! Change here for ${nl.section.title}.`;
    else sub = `Next stop: ${nl.name}.`;
  } else if (L.cfg.mode === 'mistakes') sub = `${S.mistakes.length} mistake${S.mistakes.length === 1 ? '' : 's'} left to fix.`;
  else if (L.cfg.mode === 'drill') sub = 'Every drill gives you fresh sums.';
  else sub = 'Review done.';

  const xpEl = h('b', { text: '0' });
  const body = h('div', { class: 'done' }, mascot('happy', 96),
    h('h2', { text: perfect ? 'Perfect run!' : 'Lesson complete' }),
    h('p', { text: sub + (perfect ? ' +20 bonus XP for no mistakes.' : '') }),
    h('div', { class: 'stats3' },
      h('div', null, xpEl, h('span', { text: 'XP earned' })),
      h('div', null, h('b', { text: acc + '%' }), h('span', { text: 'Right first time' })),
      h('div', null, h('b', { text: (secs >= 60 ? Math.floor(secs / 60) + 'm ' : '') + (secs % 60) + 's' }), h('span', { text: 'Time' }))),
    lv ? h('div', { class: 'learned' }, h('h4', { text: 'You learned' }), h('ul', null, lv.ideas.map(i => h('li', null, icon('check'), i.title)))) : null);
  const done = h('button', { class: 'btn line wide', onclick: () => { const showReview = S.lessons >= 3 && !S.reviewed && Date.now() - S.reviewSnoozedAt > 3 * 864e5; close(false); if (showReview) hooks.askReview?.(); } }, 'Continue');
  host().replaceChildren(h('div', { class: 'l-body', tabindex: '0', 'aria-label': 'Lesson summary' }, h('div', { class: 'l-inner' }, body)), h('div', { class: 'l-foot' }, h('div', { class: 'l-foot-inner' }, done)));
  L.phase = 'done';
  celebrate();
  countUp(xpEl, L.xp);
  hooks.onProgress?.();
  setTimeout(() => done.focus({ preventScroll: true }), 40);
}

function askLeave() {
  const foot = document.getElementById('foot');
  if (!foot || L.phase === 'done') return close(false);
  const prev = [...foot.firstChild.childNodes], prevClass = foot.className;
  foot.className = 'l-foot';
  const msg = L.cfg.mode === 'level' ? `Your place is saved, so you\'ll pick up at idea ${(S.resume?.idea ?? 0) + 1}. XP from this session won\'t count.` : 'XP from this session won\'t count. Questions you missed stay in Practice.';
  foot.firstChild.replaceChildren(h('div', { class: 'fb-title', text: 'Leave this lesson?' }), h('div', { class: 'fb-why', text: msg }),
    h('div', { class: 'card-actions' },
      h('button', { class: 'btn quiet', onclick: () => { foot.className = prevClass; foot.firstChild.replaceChildren(...prev); } }, 'Keep learning'),
      h('button', { class: 'btn bad', onclick: () => close(true) }, 'Leave lesson')));
}

document.addEventListener('keydown', e => {
  if (!L || host().hidden) return;
  if (e.key === 'Escape') { e.preventDefault(); askLeave(); return; }
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (L.phase === 'answer' && /^[1-9]$/.test(e.key)) { document.querySelector(`.opt[data-i="${+e.key - 1}"]`)?.click(); }
  if (e.key === 'Enter' && document.activeElement?.tagName !== 'BUTTON') {
    if (L.phase === 'answer' && L.checkBtn && !L.checkBtn.disabled && !L.checkBtn.hidden) { e.preventDefault(); check(); }
    else if (L.phase === 'feedback' || L.phase === 'teach') { e.preventDefault(); document.getElementById('continue')?.click(); }
  }
});
