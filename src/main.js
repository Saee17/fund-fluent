import '@fontsource-variable/nunito';
import '@fontsource-variable/bricolage-grotesque';
import './styles/app.css';
import { h, icon } from './ui/dom.js';
import { mascot } from './ui/fx.js';
import { S, save, resetAll, liveStreak, todayXp, DAILY_GOAL } from './state.js';
import { homeView } from './views/home.js';
import { practiceView, cardsView, percentView } from './views/tabs.js';
import { initLesson, startLesson } from './views/lesson.js';
import { initAnalytics, track, setAnalyticsOff } from './analytics.js';

const PROTOTYPE = import.meta.env.VITE_PROTOTYPE === '1';

const TABS = [
  { id: 'learn', label: 'Learn', icon: 'map' },
  { id: 'practice', label: 'Practice', icon: 'dumbbell' },
  { id: 'cards', label: 'Cards', icon: 'cards' },
  { id: 'percent', label: 'Percent', icon: 'percent' }
];
let tab = ['learn', 'practice', 'cards', 'percent'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'learn';

applyTheme();
initLesson({ onClose: render, onProgress: renderTop, askReview: openReview });

/* ---------- shell ---------- */
const app = document.getElementById('app');
const top = h('header', { class: 'topbar' },
  h('div', { class: 'wordmark' }, h('span', { class: 'dot-row', 'aria-hidden': 'true' },
    h('i', { style: 'background:var(--basics)' }), h('i', { style: 'background:var(--tax)' }), h('i', { style: 'background:var(--plan)' }), h('i', { style: 'background:var(--stocks)' })), 'Fund Fluent'),
  h('span', { class: 'stat streak', id: 'streak', title: 'Day streak' }),
  h('span', { class: 'stat xp', id: 'xp', title: 'Total XP' }),
  h('span', { class: 'ring', id: 'ring', role: 'img' }),
  h('button', { class: 'iconbtn', 'aria-label': 'Settings', onclick: openSettings }, icon('gear')));
const view = h('main', { id: 'view' });
app.append(top, view);

const nav = h('nav', { class: 'tabs', id: 'tabs', 'aria-label': 'Sections' }, h('div', { class: 'tabs-inner', role: 'tablist' },
  TABS.map(t => h('button', { class: 'tab', role: 'tab', id: `tab-${t.id}`, 'aria-selected': String(t.id === tab), onclick: () => go(t.id) }, icon(t.icon), t.label))));
document.body.append(nav);

function go(id) {
  tab = id; history.replaceState(null, '', id === 'learn' ? location.pathname : '#' + id);
  document.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', String(b.id === `tab-${id}`)));
  render(); window.scrollTo(0, 0);
  track('tab_opened', { tab: id });
}

function renderTop() {
  const streak = document.getElementById('streak'); streak.replaceChildren(icon('flame'), String(liveStreak()));
  streak.setAttribute('aria-label', `${liveStreak()} day streak`);
  const xp = document.getElementById('xp'); xp.replaceChildren(icon('bolt'), S.xp.toLocaleString('en-IN'));
  xp.setAttribute('aria-label', `${S.xp} XP`);
  const ring = document.getElementById('ring'), t = todayXp();
  ring.style.setProperty('--p', Math.min(100, Math.round((t / DAILY_GOAL) * 100)));
  ring.setAttribute('aria-label', `Daily goal: ${t} of ${DAILY_GOAL} XP`); ring.title = `Today: ${t} / ${DAILY_GOAL} XP`;
}

function render() {
  renderTop();
  const ctx = { startLesson, rerender: render, goLearn: () => go('learn') };
  const v = tab === 'practice' ? practiceView(ctx) : tab === 'cards' ? cardsView(ctx) : tab === 'percent' ? percentView(ctx) : homeView(ctx);
  view.replaceChildren(v);
}
document.addEventListener('ff:render', render);

/* ---------- sheets ---------- */
function sheet(children, label) {
  const prev = document.activeElement;
  const s = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': label }, children);
  const scrim = h('div', { class: 'scrim', onclick: e => { if (e.target === scrim) closeSheet(); } }, s);
  const bg = ['app', 'tabs'].map(id => document.getElementById(id)); bg.forEach(n => { if (n) n.inert = true; });
  function closeSheet() { scrim.remove(); bg.forEach(n => { if (n) n.inert = false; }); document.removeEventListener('keydown', esc); prev?.focus?.(); }
  function esc(e) { if (e.key === 'Escape') closeSheet(); }
  document.addEventListener('keydown', esc);
  document.body.append(scrim);
  setTimeout(() => s.querySelector('button, textarea, input')?.focus(), 30);
  return closeSheet;
}

function toast(msg) {
  document.querySelector('.toast')?.remove();
  const t = h('div', { class: 'toast', role: 'status', text: msg }); document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}

function applyTheme() {
  if (S.theme === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', S.theme);
}

function openSettings() {
  let close;
  const themeSeg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Theme' }, ['system', 'light', 'dark'].map(t =>
    h('button', { 'aria-pressed': String(S.theme === t), onclick: e => { S.theme = t; save(); applyTheme(); e.currentTarget.parentElement.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === e.currentTarget))); } }, t[0].toUpperCase() + t.slice(1))));
  const tog = h('button', { class: 'toggle', role: 'switch', 'aria-checked': String(!S.analyticsOff), 'aria-label': 'Share anonymous usage data',
    onclick: e => { const on = e.currentTarget.getAttribute('aria-checked') !== 'true'; e.currentTarget.setAttribute('aria-checked', String(on)); setAnalyticsOff(!on); save(); } });
  const resetBox = h('div');
  const resetBtn = () => h('button', { class: 'btn quiet wide', style: 'margin-top:var(--s4)', onclick: () => resetBox.replaceChildren(h('div', { class: 'confirm' }, h('span', { text: 'Erase all lessons, XP and streaks on this device? This can\'t be undone.' }),
    h('button', { class: 'btn bad sm', onclick: () => { resetAll(); close(); render(); toast('Progress erased'); } }, 'Erase progress'),
    h('button', { class: 'btn quiet sm', onclick: () => resetBox.replaceChildren(resetBtn()) }, 'Keep progress'))) }, 'Erase my progress');
  resetBox.append(resetBtn());
  close = sheet([
    h('h2', { text: 'Settings' }),
    h('p', { text: 'Your progress is saved only in this browser. There is no account.' }),
    h('div', { class: 'setrow' }, h('div', null, 'Theme'), themeSeg),
    h('div', { class: 'setrow' }, h('div', null, 'Share anonymous usage', h('small', { text: 'Which lessons people finish or get stuck on. No names, no emails.' })), tog),
    h('div', { class: 'setrow' }, h('div', null, 'Rate Fund Fluent', h('small', { text: 'Tell us what to fix or add.' })), h('button', { class: 'btn sm', onclick: () => { close(); openReview(true); } }, 'Rate')),
    h('div', { class: 'setrow' }, h('div', null, 'Privacy', h('small', { text: 'What is saved and what is shared.' })), h('button', { class: 'btn quiet sm', onclick: () => { close(); openPrivacy(); } }, 'Read privacy')),
    resetBox
  ], 'Settings');
}

function openPrivacy() {
  sheet([
    h('h2', { text: 'Privacy' }),
    h('p', { text: 'There is no sign-up. Fund Fluent never asks for your name, email or phone number.' }),
    h('div', { class: 'privacy-list' },
      h('h3', { text: 'Your progress' }), h('p', { text: 'Lessons, XP, streaks and mistakes are saved only in this browser. Erase them any time from Settings.' }),
      h('h3', { text: 'Anonymous usage' }), h('p', { text: 'If switched on, we count things like "lesson finished" or "question answered wrong" with the lesson id, using PostHog. No cookies, no screen recording, nothing you type. Turn it off in Settings.' }),
      h('h3', { text: 'Reviews' }), h('p', { text: 'Your star rating and optional comment are stored by our host, Netlify. Please leave personal details out of comments.' }),
      h('h3', { text: 'Not advice' }), h('p', { text: 'Fund Fluent teaches general concepts. It is not investment, tax or legal advice.' })),
    h('div', { class: 'actions' }, h('button', { class: 'btn quiet', onclick: () => document.querySelector('.scrim')?.click() }, 'Close'))
  ], 'Privacy');
}
document.addEventListener('ff:privacy', openPrivacy);

function openReview(fromSettings = false) {
  let rating = 0, close;
  const stars = h('div', { class: 'stars', role: 'group', 'aria-label': 'Your rating, 1 to 5 stars' });
  const send = h('button', { class: 'btn good', disabled: true }, 'Send review');
  const paint = () => stars.querySelectorAll('button').forEach((b, i) => { b.classList.toggle('on', i < rating); b.setAttribute('aria-pressed', String(i + 1 === rating)); });
  for (let i = 1; i <= 5; i++) stars.append(h('button', { 'aria-label': `${i} star${i > 1 ? 's' : ''}`, 'aria-pressed': 'false', onclick: () => { rating = i; paint(); send.disabled = false; } }, icon('star')));
  const ta = h('textarea', { id: 'review-comment', maxlength: '500', placeholder: 'What did you like? What was confusing?' });
  const err = h('p', { class: 'form-error', role: 'alert', hidden: true });
  send.onclick = async () => {
    send.disabled = true; send.textContent = 'Sending…'; err.hidden = true;
    let ok = PROTOTYPE;
    if (!PROTOTYPE) {
      const body = new URLSearchParams({ 'form-name': 'review', rating: String(rating), comment: ta.value.trim().slice(0, 500), 'bot-field': '' });
      try { const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body }); ok = r.ok; } catch { ok = false; }
    }
    if (!ok) { err.textContent = 'Couldn\'t send your review. Check your internet connection and try again.'; err.hidden = false; send.disabled = false; send.textContent = 'Try again'; return; }
    track('review_submitted', { rating, has_comment: !!ta.value.trim() });
    S.reviewed = true; save(); close();
    toast(PROTOTYPE ? 'Thanks! (This preview doesn\'t send reviews anywhere.)' : 'Thanks! Review sent.');
  };
  close = sheet([
    h('div', { style: 'text-align:center' }, mascot('happy', 64)),
    h('h2', { style: 'text-align:center', text: 'How is Fund Fluent so far?' }),
    h('p', { style: 'text-align:center', text: 'Your rating helps decide what to improve next.' }),
    stars,
    h('div', { class: 'field' }, h('label', { for: 'review-comment', text: 'Anything to add? (optional)' }), ta, h('small', { text: 'Please don\'t include your name, phone number or other personal details.' })),
    err,
    h('div', { class: 'actions' }, h('button', { class: 'btn quiet', onclick: () => { if (!fromSettings) { S.reviewSnoozedAt = Date.now(); save(); } close(); } }, fromSettings ? 'Cancel' : 'Not now'), send)
  ], 'Rate Fund Fluent');
}

render();
initAnalytics().then(() => track('app_opened', { returning: S.lessons > 0, lessons_done: S.done.length }));
