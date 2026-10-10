// Practice, Cards and Percent tabs.
import { h, icon } from '../ui/dom.js';
import { mascot } from '../ui/fx.js';
import { S, save, isDone, learnedQuestions, dayKey, liveStreak } from '../state.js';
import { CARDS, PERCENT, LEVEL_BY_ID, LEVELS } from '../content/index.js';
import { track } from '../analytics.js';

/* ---------- Practice ---------- */
export function practiceView({ startLesson }) {
  const learned = learnedQuestions(), nums = learned.filter(q => q.t === 'num').length, n = S.mistakes.length;
  const acc = S.answered ? Math.round((S.correct / S.answered) * 100) : 0;
  const locked = 'Opens after your first lesson.';
  // Brilliant-style week row
  const now = new Date(), monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => { const x = new Date(monday); x.setDate(monday.getDate() + i); return { d, on: S.activeDays.includes(dayKey(x)), today: dayKey(x) === dayKey() }; });
  const tile = (title, desc, label, disabled, cfg, chip) => h('div', { class: 'tile' }, h('div', { class: 'chip', 'aria-hidden': 'true' }, chip),
    h('div', { class: 'body' }, h('h3', { text: title }), h('p', { text: desc })),
    h('button', { class: 'btn sm', disabled, onclick: () => startLesson(cfg) }, label));
  return h('div', null,
    h('h1', { class: 'page-h', text: 'Practice' }),
    h('p', { class: 'page-sub', text: 'Revise only what you have already learned.' }),
    h('div', { class: 'week', 'aria-label': `This week: active on ${days.filter(d => d.on).length} days. Streak ${liveStreak()} days.` },
      days.map(x => h('span', null, h('i', { class: x.on ? 'on' : null }, icon('flame')), x.d))),
    tile('Fix your mistakes', n ? `${n} question${n > 1 ? 's' : ''} you missed. Get one right to clear it.` : 'Nothing to fix. Missed questions collect here.', 'Start', !n, { mode: 'mistakes' }, '!'),
    tile('Mixed review', learned.length ? (() => { const k = S.done.filter(id => LEVEL_BY_ID[id] && !LEVEL_BY_ID[id].pct).length; return `10 questions from the ${k} lesson${k === 1 ? '' : 's'} you have finished.`; })() : locked, 'Start', !learned.length, { mode: 'mixed' }, '↻'),
    tile('Numbers drill', nums ? `${nums} calculations from your lessons, each with worked steps.` : locked, 'Start', !nums, { mode: 'numbers' }, '#'),
    h('div', { class: 'stats3' },
      h('div', null, h('b', { text: `${S.done.filter(id => LEVEL_BY_ID[id] && !LEVEL_BY_ID[id].pct).length}/${LEVELS.length}` }), h('span', { text: 'Lessons done' })),
      h('div', null, h('b', { text: acc + '%' }), h('span', { text: 'Accuracy' })),
      h('div', null, h('b', { text: S.answered.toLocaleString('en-IN') }), h('span', { text: 'Answered' }))));
}

/* ---------- Cards ---------- */
let cardIdx = 0, onlyLearning = false, showBack = false;
export function cardsView({ rerender, goLearn }) {
  const open = CARDS.map((c, i) => ({ ...c, i })).filter(c => isDone(LEVEL_BY_ID[c.lv]));
  const list = onlyLearning ? open.filter(c => !S.known.includes(c.i)) : open;
  const wrap = h('div', null, h('h1', { class: 'page-h', text: 'Cards' }),
    h('p', { class: 'page-sub', text: open.length ? `${open.length} of ${CARDS.length} cards unlocked, in the order you learned them. Explain each one in your own words, then flip to check.` : 'Cards unlock as you finish lessons, so they always build on what you have learned.' }));
  if (!open.length) {
    wrap.append(h('div', { class: 'empty' }, mascot('calm', 72), h('h3', { text: 'No cards yet' }), h('p', { text: 'Finish your first station on the map to unlock your first cards.' }), h('button', { class: 'btn', onclick: goLearn }, 'Go to the map')));
    return wrap;
  }
  if (!list.length) {
    wrap.append(h('div', { class: 'empty' }, mascot('wow', 72), h('h3', { text: 'Every unlocked card is marked as known' }), h('p', { text: 'Turn off the filter to go through them again.' })), meta(list, rerender));
    return wrap;
  }
  if (cardIdx >= list.length) cardIdx = 0;
  const c = list[cardIdx], lv = LEVEL_BY_ID[c.lv];
  const flip = () => { showBack = !showBack; rerender(); document.querySelector('.fcard')?.focus(); };
  const card = showBack
    ? h('div', { class: 'fcard back', role: 'button', tabindex: '0', 'data-line': lv.section.line, 'aria-label': `${c.term}, explained. Press to flip back.` },
        h('div', { class: 'where' }, h('i'), c.term),
        h('div', { class: 'fsec' }, h('h4', { text: 'In simple words' }), h('p', { text: c.simple })),
        h('div', { class: 'fsec' }, h('h4', { text: 'Think of it like' }), h('p', { text: c.like })),
        c.ex ? h('div', { class: 'fsec' }, h('h4', { text: 'Example' }), h('p', { text: c.ex })) : null)
    : h('div', { class: 'fcard', role: 'button', tabindex: '0', 'data-line': lv.section.line, 'aria-label': `${c.term}. Press to see the explanation.` },
        h('div', { class: 'where' }, h('i'), `${lv.section.title} · ${lv.name}`),
        h('div', { class: 'term', text: c.term }),
        h('div', { class: 'tap', text: 'Say what it means out loud, then tap to check.' }));
  card.addEventListener('click', flip);
  card.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
  const mark = known => {
    S.known = S.known.filter(x => x !== c.i); if (known) S.known.push(c.i); save();
    track('card_marked', { known, card: c.term });
    showBack = false; if (!(onlyLearning && known)) cardIdx++; rerender();
  };
  wrap.append(card,
    h('div', { class: 'card-actions' }, h('button', { class: 'btn quiet', onclick: () => mark(false) }, 'Still learning'), h('button', { class: 'btn good', onclick: () => mark(true) }, 'Got it')),
    meta(list, rerender));
  return wrap;
}
function meta(list, rerender) {
  const cb = h('input', { type: 'checkbox', id: 'only-learning' }); cb.checked = onlyLearning;
  cb.addEventListener('change', () => { onlyLearning = cb.checked; cardIdx = 0; showBack = false; rerender(); });
  const go = d => { cardIdx = (cardIdx + d + list.length) % list.length; showBack = false; rerender(); };
  return h('div', { class: 'card-meta' },
    h('div', { class: 'nav' },
      h('button', { class: 'btn quiet sm', 'aria-label': 'Previous card', disabled: list.length < 2, onclick: () => go(-1) }, icon('arrowL')),
      h('button', { class: 'btn quiet sm', 'aria-label': 'Next card', disabled: list.length < 2, onclick: () => go(1) }, icon('arrowR'))),
    h('span', { class: 'num', text: list.length ? `${Math.min(cardIdx + 1, list.length)} / ${list.length}` : '0 / 0' }),
    h('label', { class: 'chk', for: 'only-learning' }, cb, 'Only still learning'));
}

/* ---------- Percent ---------- */
export function percentView({ startLesson }) {
  const doneN = PERCENT.levels.filter(isDone).length;
  const sheet = [['10%', 'Knock off one zero'], ['1%', 'Knock off two zeros'], ['50%', 'Half'], ['5%', 'Half of 10%'], ['20%', '10% twice'], ['12.5%', '10% + a quarter of 10%'], ['0.5%', 'Half of 1%'], ['100 bps', '1 percentage point'], ['% change', 'Change ÷ start'], ['Going back', 'Value ÷ (100 + rise) × 100']];
  return h('div', { 'data-line': 'pct' },
    h('h1', { class: 'page-h', text: 'Percent practice' }),
    h('p', { class: 'page-sub', text: 'Sharpen the percentages behind fees, returns, NAV moves and tax. This doesn\'t affect your map progress.' }),
    h('div', { class: 'cheat', 'aria-label': 'Percent cheat sheet' }, sheet.map(([a, b]) => h('div', { class: 'cheat-row' }, h('b', { text: a }), h('span', { text: b })))),
    h('div', { class: 'tile' }, h('div', { class: 'chip', 'aria-hidden': 'true' }, '%'),
      h('div', { class: 'body' }, h('h3', { text: 'Quick drill' }), h('p', { text: '10 fresh sums every time, each with "show me how".' })),
      h('button', { class: 'btn line sm', onclick: () => startLesson({ mode: 'drill' }) }, 'Start')),
    h('h2', { class: 'page-sub', style: 'margin-top:var(--s6);font-weight:900;color:var(--ink)', text: `Mini lessons · ${doneN} of ${PERCENT.levels.length} done` }),
    PERCENT.levels.map((lv, i) => {
      const d = isDone(lv), res = S.resume?.lv === lv.id && S.resume.idea > 0;
      return h('div', { class: 'tile' }, h('div', { class: 'chip', 'aria-hidden': 'true' }, d ? icon('check') : String(i + 1)),
        h('div', { class: 'body' }, h('h3', { text: lv.name }), h('p', { text: d ? 'Done. Redo it any time.' : res ? 'In progress.' : `${lv.ideas.length} idea${lv.ideas.length > 1 ? 's' : ''}, then quick checks.` })),
        h('button', { class: d ? 'btn quiet sm' : 'btn line sm', onclick: () => startLesson({ mode: 'level', level: lv }) }, d ? 'Redo' : res ? 'Continue' : 'Start'));
    }));
}
