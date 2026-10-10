// Anonymous product analytics via PostHog.
// - Off unless VITE_POSTHOG_KEY is set at build time.
// - No cookies (localStorage only), no autocapture, no session recordings, no surveys.
// - Respects the browser's Do Not Track and the in-app opt-out.
// - Never sends names, emails or review comments. Only event names and lesson ids.
import { S } from './state.js';

const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';
let ph = null;
let queue = [];

function allowed() {
  if (!KEY || S.analyticsOff) return false;
  const dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  return !dnt;
}

export async function initAnalytics() {
  if (!allowed() || ph) return;
  const { default: posthog } = await import('posthog-js');
  posthog.init(KEY, {
    api_host: HOST,
    persistence: 'localStorage',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_feature_flags: true,
    person_profiles: 'identified_only',
    respect_dnt: true,
    mask_all_text: true,
    mask_all_element_attributes: true,
    property_denylist: ['$current_url', '$pathname', '$referrer', '$initial_referrer']
  });
  ph = posthog;
  queue.forEach(([e, p]) => ph.capture(e, p)); queue = [];
}

export function track(event, props = {}) {
  if (!allowed()) return;
  if (ph) ph.capture(event, props); else queue.push([event, props]);
}

export function setAnalyticsOff(off) {
  S.analyticsOff = off;
  if (ph) { off ? ph.opt_out_capturing() : ph.opt_in_capturing(); }
  else if (!off) initAnalytics();
}
