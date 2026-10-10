// Course map. Sections are metro lines; units group stations; each level is one station (one lesson).
import { UNITS as LEGACY, PCT, CARDS as LEGACY_CARDS } from './_legacy.js';
import { MORE_TYPES, INDEX_METRICS, PROTECT, BASICS_EXTRA_CARDS } from './basics-extra.js';
import { TAX_REAL, TAX_CARDS } from './tax-extra.js';
import { PLAN_PRO, PLAN_CARDS } from './plan-extra.js';
import { STOCK_UNITS, STOCK_CARDS } from './stocks.js';
import { PCT_EXTRA_LEVELS } from './percent-extra.js';

const L = Object.fromEntries(LEGACY.map(u => [u.id, u]));
const unit = (u, title) => ({ id: u.id, title: title || u.title, glyph: u.glyph, levels: u.levels });

export const SECTIONS = [
  { id: 'basics', line: 'basics', badge: 'F', title: 'Fund basics',
    blurb: 'What a mutual fund is, every fund type, how money goes in and out, and how to read a fund page.',
    units: [unit(L.u1), unit(L.u2), MORE_TYPES, unit(L.u3), unit(L.u4), INDEX_METRICS, PROTECT] },
  { id: 'tax', line: 'tax', badge: 'T', title: 'Tax',
    blurb: 'How gains are taxed, how losses and withdrawals work, and how to file it right.',
    units: [unit(L.u5, 'Tax basics'), TAX_REAL] },
  { id: 'plan', line: 'plan', badge: 'P', title: 'Build your portfolio',
    blurb: 'Goals, buckets, choosing funds, risk, inflation and staying the course.',
    units: [unit(L.u6, 'DIY investing'), PLAN_PRO] },
  { id: 'stocks', line: 'stocks', badge: 'S', title: 'Stock market',
    blurb: 'Demat accounts, placing orders, reading a stock, IPOs and F&O basics.',
    units: STOCK_UNITS }
];

export const PERCENT = { id: 'pct', line: 'pct', badge: '%', title: 'Percent practice',
  levels: [...PCT.levels, ...PCT_EXTRA_LEVELS] };

/* Flat indexes used by the app */
export const LEVELS = [];   // path order, every station on every line
export const LEVEL_BY_ID = {};
export const QUESTION_BY_ID = {};

SECTIONS.forEach((sec, si) => {
  sec.index = si;
  sec.units.forEach((u, ui) => {
    u.section = sec; u.index = ui;
    u.levels.forEach((lv, li) => {
      lv.id = `${u.id}-${li}`; lv.unit = u; lv.section = sec; lv.index = li;
      lv.flat = LEVELS.length; LEVELS.push(lv); LEVEL_BY_ID[lv.id] = lv;
      lv.ideas.forEach((idea, ii) => idea.qs.forEach((q, qi) => {
        q.id = `${lv.id}-${ii}-${qi}`; q.level = lv; QUESTION_BY_ID[q.id] = q;
      }));
    });
  });
});
PERCENT.levels.forEach((lv, li) => {
  lv.id = `pct-${li}`; lv.section = PERCENT; lv.unit = { title: 'Percent practice', section: PERCENT };
  lv.index = li; lv.pct = true; LEVEL_BY_ID[lv.id] = lv;
  lv.ideas.forEach((idea, ii) => idea.qs.forEach((q, qi) => {
    q.id = `${lv.id}-${ii}-${qi}`; q.level = lv; QUESTION_BY_ID[q.id] = q;
  }));
});

/* Legacy cards use old level ids (u1-0 …). The unit ids were kept, so they map directly. */
export const CARDS = [...LEGACY_CARDS, ...BASICS_EXTRA_CARDS, ...TAX_CARDS, ...PLAN_CARDS, ...STOCK_CARDS]
  .filter(c => LEVEL_BY_ID[c.lv])
  .sort((a, b) => LEVEL_BY_ID[a.lv].flat - LEVEL_BY_ID[b.lv].flat);
