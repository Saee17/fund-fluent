// Progress lives only in this browser (localStorage). No accounts, nothing personal leaves the device.
import { LEVELS, LEVEL_BY_ID, QUESTION_BY_ID } from './content/index.js';

const KEY = 'fundfluent:v1';
const blank = () => ({
  xp: 0, streak: 0, lastDay: null, todayDate: null, todayXp: 0, activeDays: [],
  done: [], resume: null, mistakes: [], answered: 0, correct: 0, lessons: 0, known: [],
  reviewed: false, reviewSnoozedAt: 0, analyticsOff: false, theme: 'system', seenIntro: false
});

function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(blank(), JSON.parse(raw)); } catch { /* storage blocked */ }
  return blank();
}
export let S = load();
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage blocked */ } }
export function resetAll() { const keep = { analyticsOff: S.analyticsOff, theme: S.theme }; S = Object.assign(blank(), keep, { seenIntro: true }); save(); }

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };
export const liveStreak = () => (S.lastDay === dayKey() || S.lastDay === yesterday()) ? S.streak : 0;
export const todayXp = () => S.todayDate === dayKey() ? S.todayXp : 0;
export const DAILY_GOAL = 30;

export const isDone = lv => S.done.includes(lv.id);
export const unlocked = lv => lv.pct || lv.flat === 0 || isDone(lv) || isDone(LEVELS[lv.flat - 1]);
export const nextLevel = () => LEVELS.find(lv => !isDone(lv)) || null;
export const learnedQuestions = () => Object.values(QUESTION_BY_ID).filter(q => !q.level.pct && isDone(q.level));
export const levelById = id => LEVEL_BY_ID[id];

export function recordLessonEnd({ xp, level }) {
  const today = dayKey();
  if (S.lastDay !== today) { S.streak = S.lastDay === yesterday() ? S.streak + 1 : 1; S.lastDay = today; }
  if (S.todayDate !== today) { S.todayDate = today; S.todayXp = 0; }
  S.todayXp += xp; S.xp += xp; S.lessons++;
  if (!S.activeDays.includes(today)) S.activeDays = [...S.activeDays, today].slice(-60);
  if (level) {
    if (!S.done.includes(level.id)) S.done.push(level.id);
    if (S.resume?.lv === level.id) S.resume = null;
  }
  save();
}
