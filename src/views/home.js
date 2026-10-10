// Learn tab: a metro map. Each section is a coloured line; each lesson is a station.
import { h, icon } from '../ui/dom.js';
import { mascot } from '../ui/fx.js';
import { SECTIONS, LEVELS } from '../content/index.js';
import { S, isDone, unlocked, nextLevel } from '../state.js';

let openStation = null; // id of the station whose popover is open

export function homeView({ startLesson }) {
  const nl = nextLevel();
  const root = h('div');

  /* Next stop card (Transit-style) */
  if (nl) root.append(nextStopCard(nl, startLesson));
  else root.append(h('section', { class: 'nextstop', 'data-line': 'basics' },
    h('div', { class: 'where' }, 'End of the line'),
    h('h1', { text: 'You finished every lesson' }),
    h('p', { class: 'sub', text: 'Keep it fresh with Practice and Cards, or redo any station.' })));

  if (!S.seenIntro && !S.done.length) root.append(h('div', { class: 'intro-card' }, mascot('happy', 56),
    h('div', null, h('h2', { text: 'Learn money like a metro map' }),
      h('p', { text: 'Every lesson is a station. Read a short idea, answer a couple of questions on it, ride on. Four lines: Fund basics, Tax, Portfolio and Stocks.' }))));

  SECTIONS.forEach((sec, si) => {
    const levels = sec.units.flatMap(u => u.levels);
    const doneN = levels.filter(isDone).length;
    const open = levels.some(unlocked);
    const secEl = h('section', { class: 'section' + (open ? '' : ' locked-sec'), 'data-line': sec.line, id: `line-${sec.id}` },
      h('div', { class: 'sec-head' }, h('div', { class: 'badge', 'aria-hidden': 'true', text: sec.badge }),
        h('div', null, h('h2', { text: sec.title }), h('p', { text: `${doneN} of ${levels.length} stations · ${sec.blurb}` }))),
      h('div', { class: 'sec-meter', role: 'progressbar', 'aria-label': `${sec.title} progress`, 'aria-valuenow': doneN, 'aria-valuemin': 0, 'aria-valuemax': levels.length },
        h('i', { style: `width:${(doneN / levels.length) * 100}%` })));
    const route = h('div', { class: 'route' });
    sec.units.forEach(u => {
      route.append(h('div', { class: 'unit-title', text: u.title }));
      u.levels.forEach(lv => route.append(station(lv, lv === nl, startLesson)));
    });
    secEl.append(route);
    root.append(secEl);
    if (si < SECTIONS.length - 1) root.append(h('div', { class: 'interchange' }, h('span', { class: 'xc', 'aria-hidden': 'true' }), `Change here for ${SECTIONS[si + 1].title}`));
  });
  root.append(h('p', { class: 'foot-links' }, 'Fund Fluent is for learning, not investment advice. ', h('a', { href: '/privacy.html', text: 'Privacy' })));
  return root;
}

function nextStopCard(nl, startLesson) {
  const sec = nl.section;
  const secLevels = sec.units.flatMap(u => u.levels);
  const pos = secLevels.indexOf(nl);
  const toNext = secLevels.length - pos;
  const nextSec = SECTIONS[sec.index + 1];
  const resuming = S.resume?.lv === nl.id && S.resume.idea > 0;
  const pct = n => (secLevels.length > 1 ? (n / (secLevels.length - 1)) * 100 : 0);
  const strip = h('div', { class: 'strip', 'aria-hidden': 'true' }, h('div', { class: 'rail' }), h('div', { class: 'fill', style: `width:${pct(pos)}%` }));
  secLevels.forEach((lv, i) => strip.append(h('i', { class: 'stop' + (i <= pos ? ' on' : ''), style: `left:${pct(i)}%` })));
  strip.append(h('div', { class: 'token', style: `left:${pct(pos)}%` }, mascot('happy', 38)));
  return h('section', { class: 'nextstop', 'data-line': sec.line, 'aria-label': 'Next lesson' },
    h('div', { class: 'where' }, `${sec.title} · ${nl.unit.title}`),
    h('h1', { text: nl.name }),
    h('p', { class: 'sub', text: nextSec ? `${toNext} ${toNext === 1 ? 'stop' : 'stops'} to ${nextSec.title}` : `${toNext} ${toNext === 1 ? 'stop' : 'stops'} to the end of the line` }),
    strip,
    h('button', { class: 'btn wide', onclick: () => startLesson({ mode: 'level', level: nl }) }, resuming ? 'Continue lesson' : (S.done.length ? 'Start next lesson' : 'Start your first lesson')));
}

function station(lv, isCurrent, startLesson) {
  const done = isDone(lv), open = unlocked(lv);
  const nIdeas = lv.ideas.length, nQs = lv.ideas.reduce((a, i) => a + i.qs.length, 0);
  const node = h('button', {
    class: 'node' + (done ? ' done' : '') + (isCurrent ? ' current' : ''),
    disabled: !open,
    'aria-expanded': String(openStation === lv.id),
    'aria-label': `${lv.name}${done ? ', completed' : open ? '' : ', locked until you finish the station before it'}`,
    onclick: () => { openStation = openStation === lv.id ? null : lv.id; document.dispatchEvent(new CustomEvent('ff:render')); }
  });
  node.append(done ? icon('check') : open ? document.createTextNode(lv.unit.glyph) : icon('lock'));
  const wrap = h('div', null,
    h('div', { class: 'station' + (open ? '' : ' is-locked') }, h('span', { class: 'node-slot' }, node),
      h('div', { class: 'st-label' }, h('b', { text: lv.name }), h('span', { text: `${nIdeas} ideas · ${nQs} questions` }))));
  if (openStation === lv.id && open) {
    const resuming = S.resume?.lv === lv.id && S.resume.idea > 0;
    wrap.append(h('div', { class: 'pop', role: 'dialog', 'aria-label': lv.name },
      h('h3', { text: lv.name }),
      h('p', { text: done ? 'Done. Ride it again any time.' : resuming ? `You stopped at idea ${S.resume.idea + 1} of ${nIdeas}.` : `${nIdeas} short ideas, each followed by a quick check. About ${Math.max(3, Math.round(nQs * 0.6))} minutes.` }),
      h('button', { class: 'btn wide', onclick: () => { openStation = null; startLesson({ mode: 'level', level: lv }); } }, done ? 'Redo lesson' : resuming ? 'Continue' : 'Start')));
  }
  return wrap;
}

export const countStations = () => LEVELS.length;
