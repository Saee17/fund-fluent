// Percent quick drill: fresh market-flavoured sums every run, always with clean numbers and worked steps.
import { inr } from './ui/dom.js';

const pick = a => a[Math.floor(Math.random() * a.length)];
const R = n => '₹' + inr(n);

function steps(p, A) {
  const t = A / 10, o = A / 100;
  switch (p) {
    case 0.5: return [`1% of ${R(A)} = ${R(o)}`, `0.5% = half of 1% = ${R(o / 2)}`];
    case 1: return [`1% = knock off two zeros: ${R(A)} → ${R(o)}`];
    case 2: return [`1% of ${R(A)} = ${R(o)}`, `2% = 1% twice = ${R(o * 2)}`];
    case 5: return [`10% of ${R(A)} = ${R(t)}`, `5% = half of 10% = ${R(t / 2)}`];
    case 10: return [`10% = knock off one zero: ${R(A)} → ${R(t)}`];
    case 12.5: return [`10% of ${R(A)} = ${R(t)}`, `2.5% = a quarter of that = ${R(t / 4)}`, `12.5% = ${R(t)} + ${R(t / 4)} = ${R(t * 1.25)}`];
    case 15: return [`10% of ${R(A)} = ${R(t)}`, `5% = half of that = ${R(t / 2)}`, `15% = ${R(t)} + ${R(t / 2)} = ${R(t * 1.5)}`];
    case 20: return [`10% of ${R(A)} = ${R(t)}`, `20% = 10% twice = ${R(t * 2)}`];
    case 25: return [`50% of ${R(A)} = half = ${R(A / 2)}`, `25% = half of that = ${R(A / 4)}`];
    case 50: return [`50% = half of ${R(A)} = ${R(A / 2)}`];
  }
}

const AMOUNTS = [20000, 40000, 80000, 120000, 200000, 400000, 600000, 1000000];

function genOne(i) {
  const id = `gen-${Date.now()}-${i}`;
  const kind = pick(['of', 'of', 'move', 'change', 'back', 'points']);
  if (kind === 'of') {
    const p = pick([0.5, 1, 2, 5, 10, 12.5, 15, 20, 25, 50]), A = pick(AMOUNTS), ans = (A * p) / 100;
    let q;
    if (p <= 2) q = pick([`A fund's expense ratio is ${p}%. You hold ${R(A)}. Roughly what is the yearly fee?`, `You redeem ${R(A)} and the exit load is ${p}%. What is the fee?`]);
    else if (p === 12.5) q = `Long-term equity tax is 12.5%. Your taxable gain is ${R(A)}. What is the tax?`;
    else if (p === 20) q = pick([`Short-term equity tax is 20%. Your gain is ${R(A)}. What is the tax?`, `Your ${R(A)} portfolio is 20% in debt funds. How much is that?`]);
    else q = pick([`Your ${R(A)} portfolio has ${p}% in small cap funds. How much is that?`, `A holding worth ${R(A)} rises ${p}%. By how many rupees did it rise?`, `The market falls ${p}%. Your equity holding was ${R(A)}. How many rupees did you lose?`]);
    return { id, gen: true, t: 'num', q, a: ans, tol: 0, prefix: '₹', why: `${p}% of ${R(A)} = ${R(ans)}.`, work: steps(p, A) };
  }
  if (kind === 'move') {
    const p = pick([5, 10, 15, 20, 25, 50]), A = pick(AMOUNTS), up = Math.random() < .5, d = (A * p) / 100, ans = up ? A + d : A - d;
    return { id, gen: true, t: 'num', q: up ? `Your ${R(A)} investment rises ${p}%. What is it worth now?` : `Your ${R(A)} investment falls ${p}%. What is it worth now?`,
      a: ans, tol: 0, prefix: '₹', why: `${p}% of ${R(A)} is ${R(d)}, so ${R(ans)}.`,
      work: [...steps(p, A), up ? `It rose, so add: ${R(A)} + ${R(d)} = ${R(ans)}` : `It fell, so take away: ${R(A)} − ${R(d)} = ${R(ans)}`] };
  }
  if (kind === 'change') {
    const p = pick([5, 10, 20, 25, 50]), A = pick([200, 400, 800, 1000, 2000, 40000, 80000, 200000]), up = Math.random() < .6, d = (A * p) / 100, B = up ? A + d : A - d, t = A / 10;
    return { id, gen: true, t: 'num', q: pick([`A fund's NAV moved from ${R(A)} to ${R(B)}. By what % did it ${up ? 'rise' : 'fall'}?`, `Your holding went from ${R(A)} to ${R(B)}. By what % did it ${up ? 'rise' : 'fall'}?`]),
      a: p, tol: 0, suffix: '%', why: `The change of ${R(d)} is ${p}% of ${R(A)}.`,
      work: [`Change = ${up ? R(B) + ' − ' + R(A) : R(A) + ' − ' + R(B)} = ${R(d)}`, `10% of ${R(A)} = ${R(t)}`, `${R(d)} ÷ ${R(t)} = ${d / t}`, `${d / t} × 10% = ${p}%`] };
  }
  if (kind === 'back') {
    const p = pick([10, 20, 25, 50]), A = pick(AMOUNTS), B = A * (1 + p / 100), one = B / (100 + p);
    return { id, gen: true, t: 'num', q: `After rising ${p}%, your fund is worth ${R(B)}. What was it worth before?`,
      a: A, tol: 0, prefix: '₹', why: `${R(B)} is ${100 + p}% of the original, so the original was ${R(A)}.`,
      work: [`${R(B)} is ${100 + p}% of the original`, `1% = ${R(B)} ÷ ${100 + p} = ${R(one)}`, `Original = 100 × ${R(one)} = ${R(A)}`] };
  }
  const from = pick([5.5, 6, 6.25, 6.5, 7]), bps = pick([25, 50, 75, 100]), up = Math.random() < .5, to = +(up ? from + bps / 100 : from - bps / 100).toFixed(2);
  return { id, gen: true, t: 'num', q: `RBI ${up ? 'raises' : 'cuts'} the repo rate by ${bps} basis points from ${from}%. What is the new rate?`,
    a: to, tol: 0.001, suffix: '%', why: `${bps} bps = ${bps / 100} points, so ${to}%.`,
    work: [`100 basis points = 1%, so ${bps} bps = ${bps / 100}%`, `${from} ${up ? '+' : '−'} ${bps / 100} = ${to}%`] };
}

export const drillQuestions = n => Array.from({ length: n }, (_, i) => genOne(i));
