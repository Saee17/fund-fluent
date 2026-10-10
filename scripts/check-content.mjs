// Validates every lesson before a build: answers in range, ids unique, worked steps present.
import { SECTIONS, PERCENT, LEVELS, QUESTION_BY_ID, CARDS } from '../src/content/index.js';

const problems = [];
const seen = new Set();
let qCount = 0, ideaCount = 0;

const levels = [...LEVELS, ...PERCENT.levels];
for (const lv of levels) {
  if (!lv.name) problems.push(`${lv.id}: level has no name`);
  if (!lv.ideas?.length) problems.push(`${lv.id}: no ideas`);
  for (const idea of lv.ideas) {
    ideaCount++;
    if (!idea.title || !idea.body?.length || !idea.ex?.length) problems.push(`${lv.id}: idea "${idea.title}" missing title/body/example`);
    if (!idea.qs?.length) problems.push(`${lv.id}: idea "${idea.title}" has no questions`);
    for (const q of idea.qs) {
      qCount++;
      if (seen.has(q.id)) problems.push(`duplicate id ${q.id}`); seen.add(q.id);
      if (!q.q || !q.why) problems.push(`${q.id}: missing question or explanation`);
      if (q.t === 'mcq' && !(Number.isInteger(q.a) && q.a >= 0 && q.a < q.opts.length)) problems.push(`${q.id}: mcq answer out of range`);
      if (q.t === 'mcq' && new Set(q.opts).size !== q.opts.length) problems.push(`${q.id}: duplicate options`);
      if (q.t === 'tf' && typeof q.a !== 'boolean') problems.push(`${q.id}: tf answer must be boolean`);
      if (q.t === 'num' && (typeof q.a !== 'number' || typeof q.tol !== 'number' || !q.work?.length)) problems.push(`${q.id}: num needs a, tol and work steps`);
      if (q.t === 'order' && (q.items?.length < 2 || new Set(q.items).size !== q.items.length)) problems.push(`${q.id}: order items invalid`);
      if (q.t === 'match' && (q.pairs?.length < 2 || new Set(q.pairs.map(p => p[0])).size !== q.pairs.length || new Set(q.pairs.map(p => p[1])).size !== q.pairs.length)) problems.push(`${q.id}: match pairs invalid`);
      if (!['mcq', 'tf', 'num', 'order', 'match'].includes(q.t)) problems.push(`${q.id}: unknown type ${q.t}`);
    }
  }
}
for (const c of CARDS) if (!c.term || !c.simple || !c.like) problems.push(`card ${c.term}: incomplete`);

console.log(`Sections ${SECTIONS.length} · path levels ${LEVELS.length} · percent levels ${PERCENT.levels.length} · ideas ${ideaCount} · questions ${qCount} · cards ${CARDS.length}`);
if (Object.keys(QUESTION_BY_ID).length !== qCount) problems.push('question index size mismatch');
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('Content OK');
